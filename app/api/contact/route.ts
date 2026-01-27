import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
const resendEmail = process.env.RESEND_EMAIL ?? "info@peakmitsadiq.de"; //

export async function POST(req: Request) {
  try {
    const { name, email, message, isBooking, payload } = await req.json();

    if (!name || !email) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!isBooking && !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // Build email HTML based on whether it's a booking or regular message
    let emailHtml = "";

    if (isBooking && payload) {
      // Format available dates for better display
      const formattedDates = payload.available_dates
        ? typeof payload.available_dates === "string"
          ? payload.available_dates
          : payload.available_dates.join("<br/>")
        : "Nicht angegeben";

      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00D9FF; border-bottom: 2px solid #00D9FF; padding-bottom: 10px;">
            Neue Terminanfrage
          </h2>
          
          <h3 style="color: #333; margin-top: 20px;">Kontaktinformationen</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Telefon:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                payload.phone || "Nicht angegeben"
              }</td>
            </tr>
            ${
              payload.address
                ? `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Adresse:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${payload.address}</td>
            </tr>
            `
                : ""
            }
          </table>

          <h3 style="color: #333; margin-top: 20px;">Paketinformationen</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Paket:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                payload.package_name || "Nicht angegeben"
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Preis:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                payload.package_price || "Nicht angegeben"
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Dauer:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                payload.session_duration || "Nicht angegeben"
              }</td>
            </tr>
          </table>

          <h3 style="color: #333; margin-top: 20px;">Wunschtermine</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; line-height: 1.8;">
            ${formattedDates}
          </div>

          ${
            payload.goal || payload.gender || payload.age || payload.commitment
              ? `
          <h3 style="color: #333; margin-top: 20px;">Weitere Informationen</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${
              payload.goal
                ? `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Ziel:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${payload.goal}</td>
            </tr>
            `
                : ""
            }
            ${
              payload.gender
                ? `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Geschlecht:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${payload.gender}</td>
            </tr>
            `
                : ""
            }
            ${
              payload.age
                ? `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Alter:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${payload.age}</td>
            </tr>
            `
                : ""
            }
            ${
              payload.commitment
                ? `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Engagement:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${payload.commitment}</td>
            </tr>
            `
                : ""
            }
          </table>
          `
              : ""
          }

          ${
            message
              ? `
          <h3 style="color: #333; margin-top: 20px;">Zusätzliche Anmerkungen</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
          `
              : ""
          }

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            Diese Nachricht wurde über das Buchungsformular auf PeakMitSadiq gesendet.
          </p>
        </div>
      `;
    } else {
      // Regular contact message
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00D9FF; border-bottom: 2px solid #00D9FF; padding-bottom: 10px;">
            Neue Kontaktnachricht
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
          </table>
          <h3 style="color: #333; margin-top: 20px;">Nachricht</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            Diese Nachricht wurde über das Kontaktformular auf PeakMitSadiq gesendet.
          </p>
        </div>
      `;
    }

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [resendEmail],
      subject: `Neue ${isBooking ? "Buchung" : "Nachricht"} von ${name}`,
      replyTo: email,
      html: emailHtml,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
