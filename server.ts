import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

function generateCpf() {
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
  return [...n, d1, d2].join("");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API to handle MedusaPay PIX creation
  app.post("/api/checkout", async (req, res) => {
    try {
      const { amount } = req.body;
      const publicKey = process.env.MEDUSAPAY_PUBLIC_KEY;
      const secretKey = process.env.MEDUSAPAY_SECRET_KEY;

      if (!publicKey || !secretKey) {
        return res.status(500).json({ error: "Missing MedusaPay credentials in environment" });
      }

      const credentials = Buffer.from(`${secretKey}:x`).toString("base64");
      const cpf = generateCpf();

      const response = await fetch("https://api.v2.medusapay.com.br/v1/transactions", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: amount, // amount is already in cents from frontend
          paymentMethod: "pix",
          postbackUrl: "https://doacao-esolidaria.com/webhook",
          customer: {
            name: "João Silva",
            email: "joao@example.com",
            document: {
              number: cpf,
              type: "cpf"
            },
            phone: "11999999999"
          },
          items: [
            {
              title: "Doação SOS Animal Help",
              unitPrice: amount,
              quantity: 1,
              tangible: false
            }
          ],
          pix: {
            expiresInDays: 1
          },
          metadata: "Doacao SOS Animal Help"
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("MedusaPay API Error Details:", JSON.stringify(data, null, 2));
        return res.status(response.status).json({ error: "Failed to create PIX transaction", details: data });
      }

      // We will send the whole response to the frontend to handle, or extract what's possible.
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
