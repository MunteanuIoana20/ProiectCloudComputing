import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metoda nepermisă' });

  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Lipsește conținutul' });

 try {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `Generează un titlu scurt pentru acest text: "${content}"` }],
  });

  const title = completion.choices[0].message?.content?.trim() ?? "Titlu generat";
  res.status(200).json({ title });
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Eroare OpenAI:", error.message);
    res.status(500).json({ error: error.message });
  } else {
    console.error("Eroare necunoscută:", error);
    res.status(500).json({ error: "Eroare necunoscută" });
  }
}

}
