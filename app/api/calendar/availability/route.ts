// app/api/calendar/availability/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Initialize Google Calendar API
const calendar = google.calendar("v3");

// Service account or OAuth2 credentials
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ),
  },
  scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
});

export async function POST(request: NextRequest) {
  try {
    const { date, duration = 60 } = await request.json();

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Date is required" },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch busy times from Google Calendar
    const authClient = await auth.getClient();
    const response = await calendar.freebusy.query({
      auth: authClient as any,
      requestBody: {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID || "primary" }],
      },
    });

    const busySlots =
      response.data.calendars?.[process.env.GOOGLE_CALENDAR_ID || "primary"]
        ?.busy || [];

    // Define your working hours and time slots
    const workingHours = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ];

    // Check which slots are available
    const availableSlots = workingHours.filter((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const slotStart = new Date(selectedDate);
      slotStart.setHours(hours, minutes, 0, 0);

      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + duration);

      // Check if this slot overlaps with any busy time
      const isAvailable = !busySlots.some((busy: any) => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);

        // Check for overlap
        return (
          (slotStart >= busyStart && slotStart < busyEnd) ||
          (slotEnd > busyStart && slotEnd <= busyEnd) ||
          (slotStart <= busyStart && slotEnd >= busyEnd)
        );
      });

      return isAvailable;
    });

    return NextResponse.json({
      success: true,
      availableSlots,
      date: selectedDate.toISOString(),
    });
  } catch (error) {
    console.error("Calendar API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch calendar availability",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Optional: Create booking endpoint
export async function PUT(request: NextRequest) {
  try {
    const { date, time, duration = 60, customerInfo } = await request.json();

    const [hours, minutes] = time.split(":").map(Number);
    const startTime = new Date(date);
    startTime.setHours(hours, minutes, 0, 0);

    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + duration);

    const authClient = await auth.getClient();

    const event = {
      summary: `Training Session - ${customerInfo.name}`,
      description: `
        Name: ${customerInfo.name}
        Phone: ${customerInfo.phone}
        Email: ${customerInfo.email}
        Location: ${customerInfo.location}
        Notes: ${customerInfo.description || "None"}
      `,
      location: customerInfo.location,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: "Europe/Berlin",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "Europe/Berlin",
      },
      attendees: [{ email: customerInfo.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 60 },
        ],
      },
    };

    const response = await calendar.events.insert({
      auth: authClient as any,
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      requestBody: event,
      sendUpdates: "all",
    });

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      htmlLink: response.data.htmlLink,
    });
  } catch (error) {
    console.error("Calendar Booking Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create booking",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
