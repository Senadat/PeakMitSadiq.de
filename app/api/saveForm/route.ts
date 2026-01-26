import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Send data to Google Apps Script
    const res = await fetch(process.env.NEXT_PUBLIC_SHEET_ENDPOINT!, {
      method: "POST",
      headers: { "Content-Type": "text/plain" }, // avoids CORS preflight
      body: JSON.stringify(body),
    });

    const text = await res.text(); // Apps Script returns plain text JSON
    return NextResponse.json(JSON.parse(text));
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
