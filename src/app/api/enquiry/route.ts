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
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                /* Animations will only work in modern clients like Apple Mail */
                @keyframes fadeUp {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .animated-entrance {
                  animation: fadeUp 1s ease-out forwards;
                }
                .cta-button {
                  transition: all 0.3s ease;
                }
                .cta-button:hover {
                  background-color: #2c2822 !important;
                  color: #fcfbf8 !important;
                  border-color: #2c2822 !important;
                }
                .link-hover {
                  text-decoration: none;
                  color: #ae9e85;
                }
                .link-hover:hover {
                  color: #8b1a1a;
                  text-decoration: underline;
                }
                /* Hide web fonts loading just in case, relying on system fonts instead for emails */
              </style>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f4ebd9; -webkit-font-smoothing: antialiased; padding: 20px 0;">
              
              <!-- Main Container -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-w-width: 600px; margin: 0 auto; background-color: #FCFBF8; border: 1px solid #e8dcc4; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-radius: 2px;" class="animated-entrance">
                
                <!-- Inner Border (Handmade Aesthetic) -->
                <tr>
                  <td style="padding: 4px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid rgba(174, 158, 133, 0.4);">
                      
                      <!-- Header -->
                      <tr>
                        <td align="center" style="padding: 40px 20px 20px 20px;">
                          <!-- Decorative Lines -->
                          <div style="margin-bottom: 20px;">
                            <span style="display: inline-block; width: 40px; height: 1px; background-color: #ae9e85; vertical-align: middle;"></span>
                            <span style="display: inline-block; color: #ae9e85; margin: 0 10px; font-size: 16px; font-family: Georgia, 'Times New Roman', serif;">✧</span>
                            <span style="display: inline-block; width: 40px; height: 1px; background-color: #ae9e85; vertical-align: middle;"></span>
                          </div>
                          
                          <h1 style="color: #2c2822; margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; font-weight: normal; letter-spacing: 4px; text-transform: uppercase;">
                            Imagica Holidays
                          </h1>
                          <p style="color: #7a705e; font-family: Arial, Helvetica, sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; margin-top: 10px;">
                            Curated Himalayan Expeditions
                          </p>
                        </td>
                      </tr>

                      <!-- Body Content -->
                      <tr>
                        <td style="padding: 20px 40px 40px 40px; font-family: Arial, Helvetica, sans-serif; color: #3d3831; line-height: 1.8;">
                          
                          <h2 style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: normal; margin-bottom: 20px; color: #2c2822;">
                            Dear ${body.fullName},
                          </h2>
                          
                          <p style="font-size: 14px; margin-bottom: 30px;">
                            Thank you for beginning your journey with us. We have successfully received your letter of inquiry for <strong>${body.destination || "your selected destination"}</strong>. It is an absolute privilege to craft this experience for you.
                          </p>

                          <!-- Inquiry Details Box -->
                          <div style="background-color: #f9f6f0; border-left: 3px solid #ae9e85; padding: 25px; margin-bottom: 30px;">
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td colspan="2" style="padding-bottom: 15px;">
                                  <span style="font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 18px; color: #ae9e85; padding-right: 10px;">I.</span>
                                  <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; color: #3d3831;">The Itinerary Details</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 5px 0; font-size: 13px; color: #7a705e; width: 35%;">Destination:</td>
                                <td style="padding: 5px 0; font-size: 14px; font-weight: bold; color: #2c2822;">${body.destination || "Not specified"}</td>
                              </tr>
                              <tr>
                                <td style="padding: 5px 0; font-size: 13px; color: #7a705e;">Duration:</td>
                                <td style="padding: 5px 0; font-size: 14px; font-weight: bold; color: #2c2822;">${body.duration || "Not specified"}</td>
                              </tr>
                              <tr>
                                <td style="padding: 5px 0; font-size: 13px; color: #7a705e;">Commencing On:</td>
                                <td style="padding: 5px 0; font-size: 14px; font-weight: bold; color: #2c2822;">${body.travelDate || "Not specified"}</td>
                              </tr>
                              <tr>
                                <td style="padding: 5px 0; font-size: 13px; color: #7a705e;">Travellers:</td>
                                <td style="padding: 5px 0; font-size: 14px; font-weight: bold; color: #2c2822;">${body.adults} Adults, ${body.children} Children</td>
                              </tr>
                            </table>

                          </div>

                          <p style="font-size: 14px; margin-bottom: 30px;">
                            One of our Travel Artisans will review your specific requirements and reach out to you within the next 24 hours to begin tailoring your bespoke itinerary.
                          </p>

                          <p style="font-size: 14px; margin-bottom: 40px; font-style: italic; color: #5c544b;">
                            "The mountains are calling, and so shall we."
                          </p>

                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom: 5px;">
                                <img src="https://images.unsplash.com/photo-1544634076-a90160ddf44a?q=80&w=100&auto=format&fit=crop" width="50" height="50" style="border-radius: 50%; opacity: 0.8; object-fit: cover;" alt="Artisan Signature" />
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: #2c2822;">
                                Warmest Regards,
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; color: #ae9e85; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; padding-top: 5px;">
                                The Artisans Guild
                              </td>
                            </tr>
                          </table>

                          <!-- Explore Button -->
                          <div style="text-align: center; margin-top: 50px;">
                            <a href="https://imagicaholidays.com" class="cta-button" style="display: inline-block; padding: 14px 30px; border: 1px solid #d5cab5; color: #2c2822; text-decoration: none; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold;">
                              Explore The Estate
                            </a>
                          </div>

                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #2c2822; padding: 30px 40px; text-align: center;">
                          <p style="margin: 0; color: #ae9e85; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">
                            <a href="https://imagicaholidays.com" style="color: #ae9e85; text-decoration: none;">IMAGICAHOLIDAYS.COM</a>
                          </p>
                          <p style="margin: 15px 0 0 0; color: #7a705e; font-size: 11px; font-family: Arial, Helvetica, sans-serif;">
                            &copy; ${new Date().getFullYear()} Imagica Holidays. All rights preserved.
                          </p>
                          <p style="margin: 10px 0 0 0; color: #5c544b; font-size: 10px; font-family: Arial, Helvetica, sans-serif;">
                            This letter is sent from our Himalayan desk directly to you.
                          </p>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Bottom spacer -->
              <div style="height: 40px;"></div>

            </body>
            </html>
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
