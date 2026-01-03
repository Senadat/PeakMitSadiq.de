import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);
const resendEmail = process.env.RESEND_EMAIL ?? "treezyvarrick@gmail.com";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // await resend.emails.send({
    //   from: "Contact Form <onboarding@resend.dev>", // works in dev
    //   to: [resendEmail], // your email
    //   subject: `New message from ${name}`,
    //   replyTo: email,
    //   html: `
    //     <h2>New Contact Message</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
