import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Server-side proxy to forward website enquiries to the TravelCRM webhook.
 * This keeps the API key secret (never exposed to the browser).
 *
 * CRM endpoint: POST /api/v1/queries/webhook/website
 * Required fields (by CRM validator): name, phone, leadSource
 */
const CRM_URL = process.env.CRM_WEBHOOK_URL as string;
const CRM_API_KEY = process.env.CRM_WEBHOOK_API_KEY as string;

// Set up Nodemailer transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
  port: parseInt((process.env.BREVO_SMTP_PORT || "587").trim(), 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
  connectionTimeout: 5000, // 5 seconds to connect
  socketTimeout: 10000,    // 10 seconds for socket
});

export async function POST(request: Request) {
  if (!CRM_URL || !CRM_API_KEY) {
    console.error("[Enquiry API Error] Missing required CRM configuration in environment variables.");
    return NextResponse.json(
      { success: false, message: "CRM integration is not configured properly." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    // Build a rich destination string that includes extra booking details.
    // The CRM Query model only has specific Prisma columns — NOT 'remarks'.
    // We pack extra info into 'destination' (free-text String).
    const destinationParts = [
      body.destination,
      body.duration ? `(${body.duration})` : null,
      body.requirements ? `— ${body.requirements}` : null,
    ].filter(Boolean).join(" ");

    // Map the website form fields to the CRM's expected shape.
    // ONLY include fields that exist in the Prisma Query model:
    //   name, phone, email, destination, adults, children, leadSource
    const crmPayload: Record<string, unknown> = {
      name: body.fullName,
      phone: body.phone?.replace(/\s+/g, ""), // strip whitespace
      email: body.email || null,
      leadSource: "website",
      destination: destinationParts || null,
      adults: Number(body.adults) || 2,
      children: Number(body.children) || 0,
    };

    // Only add travelDate if provided (must map to travelDateFrom)
    if (body.travelDate) {
      crmPayload.travelDateFrom = body.travelDate;
    }

    // Basic validation before forwarding
    if (!crmPayload.name || !crmPayload.phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-api-key": CRM_API_KEY,
    };

    const crmResponse = await fetch(CRM_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(crmPayload),
    });

    let crmData;
    const contentType = crmResponse.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      try {
        crmData = await crmResponse.json();
      } catch (err) {
        crmData = { error: true, status: crmResponse.status, bodyText: await crmResponse.text() };
      }
    } else {
      crmData = { error: true, status: crmResponse.status, bodyText: await crmResponse.text() };
    }

    if (!crmResponse.ok) {
      // If duplicate lead (409), still return a friendly message
      if (crmResponse.status === 409) {
        return NextResponse.json(
          { success: true, message: "We already have your enquiry! Our team will contact you soon." },
          { status: 200 }
        );
      }
      console.error("[CRM Webhook Error]", crmData);
      return NextResponse.json(
        { success: false, message: crmData.message || "Failed to submit enquiry" },
        { status: crmResponse.status }
      );
    }

    // --- SEND EMAIL CONFIRMATION ---
    if (body.email) {
      try {
        await transporter.sendMail({
          from: `"Imagica Holidays" <administrative@imagicaholidays.com>`, // Must match a verified sender in Brevo
          to: body.email, // list of receivers
          subject: "Trip Inquiry Received - Imagica Holidays", // Subject line
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaec; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #3d3831; padding: 24px; text-align: center;">
                <h1 style="color: #f4ebd9; margin: 0; font-size: 24px; font-weight: normal; letter-spacing: 1px;">Imagica Holidays</h1>
              </div>
              <div style="padding: 32px; background-color: #ffffff;">
                <h2 style="font-size: 20px; color: #3d3831; margin-top: 0;">Hello ${body.fullName},</h2>
                <p style="font-size: 15px; line-height: 1.5; color: #555;">
                  Thank you for planning your trip with <strong>Imagica Holidays</strong>. We have successfully received your inquiry for <strong>${body.destination || "your desired destination"}</strong>.
                </p>
                <div style="background-color: #f9f9fa; border-left: 4px solid #ae9e85; padding: 16px; margin: 24px 0;">
                  <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #7a705e; letter-spacing: 1px;">Inquiry Details</h3>
                  <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 1.8;">
                    <li><strong>Destination:</strong> ${body.destination || "Not specified"}</li>
                    <li><strong>Duration:</strong> ${body.duration || "Not specified"}</li>
                    <li><strong>Travel Date:</strong> ${body.travelDate || "Not specified"}</li>
                    <li><strong>Travelers:</strong> ${body.adults} Adults, ${body.children} Children</li>
                  </ul>
                </div>
                <p style="font-size: 15px; line-height: 1.5; color: #555;">
                  Our team of travel experts will review your requirements and get back to you within 24 hours with a personalized itinerary.
                </p>
                <p style="font-size: 15px; line-height: 1.5; color: #555; margin-bottom: 0;">
                  Warm regards,<br/>
                  <strong>The Imagica Holidays Team</strong>
                </p>
              </div>
              <div style="background-color: #f4ebd9; padding: 16px; text-align: center; font-size: 12px; color: #7a705e;">
                &copy; ${new Date().getFullYear()} Imagica Holidays. All rights reserved.
              </div>
            </div>
          `,
        });
        console.log("[Email] Confirmation sent to", body.email);
      } catch (emailError) {
        console.error("[Email Error] Failed to send confirmation email:", emailError);
        // We do NOT return an error here, since the lead was successful in the CRM.
      }
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully! Our team will contact you soon.",
      queryId: crmData.queryId,
    });
  } catch (error) {
    console.error("[Enquiry API Error]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
