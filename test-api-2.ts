import fetch from 'node-fetch';

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

async function test() {
  const cpf = generateCpf();
  console.log("Using CPF:", cpf);
  const credentials = Buffer.from(`${process.env.ANUBISPAY_PUBLIC_KEY}:${process.env.ANUBISPAY_SECRET_KEY}`).toString("base64");
  const body = JSON.stringify({
    amount: 12050, // cents
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
        title: "Doacao SOS Animal Help",
        unit_price: 12050,
        quantity: 1,
        tangible: false
      }
    ],
    metadata: { "provider_name": "SOS Animal Help" }
  });
  
  const response = await fetch("https://api.anubispay.com/v1/payment-transaction/create", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/json"
    },
    body
  });
  
  const text = await response.text();
  console.log(response.status, text);
}

test();
