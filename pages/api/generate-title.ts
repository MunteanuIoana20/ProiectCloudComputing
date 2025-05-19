import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metoda HTTP nu este permisă' });
  }

  const { content } = req.body;

  if (!content || typeof content !== 'string' || !content.trim()) {
    return res
      .status(400)
      .json({ error: 'Conținutul notiței este invalid sau gol' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Generează un titlu scurt și relevant pentru această notiță: "${content.trim()}"`,
        },
      ],
    });

    const title =
      completion.choices?.[0]?.message?.content?.trim() || 'Titlu generat';

    res.status(200).json({ title });
  } catch (error: unknown) {
    console.error('Eroare OpenAI:', error);

    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      (error as { status?: number }).status === 401
    ) {
      return res
        .status(500)
        .json({ error: 'Cheia API este invalidă sau a expirat' });
    }

    res.status(500).json({ error: 'Eroare la generarea titlului' });
  }
}
