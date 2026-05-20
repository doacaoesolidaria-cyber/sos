export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const publicKey = process.env.ANUBISPAY_PUBLIC_KEY;
    const secretKey = process.env.ANUBISPAY_SECRET_KEY;

    if (!publicKey || !secretKey) {
      console.error("Missing AnubisPay keys");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const credentials = Buffer.from(`${publicKey}:${secretKey}`).toString("base64");
    
    // Generate a valid CPF format
    const t = () => Math.floor(Math.random() * 9);
    const n = [t(), t(), t(), t(), t(), t(), t(), t(), t()];
    let d1 = 0;
    for (let i = 0; i < 9; i++) d1 += n[i] * (10 - i);
    d1 = 11 - (d1 % 11);
    if (d1 >= 10) d1 = 0;
    let d2 = 0;
    for (let i = 0; i < 9; i++) d2 += n[i] * (11 - i);
    d2 += d1 * 2;
    d2 = 11 - (d2 % 11);
    if (d2 >= 10) d2 = 0;
    const cpf = [...n, d1, d2].join("");

    const externalApiResponse = await fetch("https://api.anubispay.com/v1/payment-transaction/create", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount, // amount is already in cents from frontend
        payment_method: "pix",
        postback_url: "https://doacao-esolidaria.com/webhook",
        customer: {
          name: "João Silva",
          email: "joao@example.com",
          document: {
            number: cpf,
            type: "cpf"
          },
          phone: "+5511999999999"
        },
        items: [
          {
            title: "Doação SOS Animal Help",
            unit_price: amount,
            quantity: 1,
            tangible: false
          }
        ],
        pix: {
          expires_in_days: 1
        },
        metadata: { provider_name: "Doacao SOS Animal Help" }
      })
    });

    const data = await externalApiResponse.json();

    if (!externalApiResponse.ok) {
      console.error("AnubisPay API Error Details:", JSON.stringify(data, null, 2));
      return res.status(externalApiResponse.status).json({ error: "Failed to create PIX transaction", details: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error creating PIX transaction:", error);
    return res.status(500).json({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) });
  }
}
