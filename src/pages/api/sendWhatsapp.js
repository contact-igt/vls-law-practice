// pages/api/sendWhatsapp.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, name, amount, programm_name, schedule, platform, link_date } =
    req.body;

  if (
    !phone ||
    !name ||
    !amount ||
    !programm_name ||
    !schedule ||
    !platform ||
    !link_date
  ) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const token = `7dd8121386e580c872816b336b80723eebdcb68d31950278df962dde22127dd87b9bdf0721d57cdb502346ea16e23e0a949a3b60e70256124c7d4fbac9cd0341`;
  const apiUrl = `https://backend.askeva.io/v1/message/send-message?token=${token}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: phone,
        type: "template",
        template: {
          name: "event_remainder",
          language: {
            policy: "deterministic",
            code: "en",
          },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: name },
                { type: "text", text: String(amount) },
                { type: "text", text: programm_name },
                { type: "text", text: schedule },
                { type: "text", text: platform },
                { type: "text", text: link_date },
              ],
            },
          ],
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, result: data });
  } catch (err) {
    console.error("Error sending WhatsApp:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
