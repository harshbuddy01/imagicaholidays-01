import { NextResponse } from "next/server";

/**
 * Server-side proxy to forward website enquiries to the TravelCRM webhook.
 * This keeps the API key secret (never exposed to the browser).
 *
 * CRM endpoint: POST /api/v1/queries/webhook/website
 * Required fields (by CRM validator): name, phone, leadSource
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Map the website form fields to the CRM's expected shape
    const crmPayload = {
      name: body.fullName,
      phone: body.phone?.replace(/\s+/g, ""), // strip whitespace
      email: body.email || null,
      leadSource: "website",
      destination: body.destination || null,
      duration: body.duration || null,
      travelDate: body.travelDate || null,
      adults: body.adults ?? 2,
      children: body.children ?? 0,
      remarks: body.requirements || null,
    };

    // Basic validation before forwarding
    if (!crmPayload.name || !crmPayload.phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    const CRM_URL =
      process.env.CRM_WEBHOOK_URL ||
      "https://crm-production-3f6d.up.railway.app/api/v1/queries/webhook/website";

    const CRM_API_KEY = process.env.CRM_WEBHOOK_API_KEY || "";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (CRM_API_KEY) {
      headers["x-api-key"] = CRM_API_KEY;
    }

    const crmResponse = await fetch(CRM_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(crmPayload),
    });

    const crmData = await crmResponse.json();

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
