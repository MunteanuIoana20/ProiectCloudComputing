import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';  /
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,  
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Conținutul este necesar.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Generează un titlu scurt și sugestiv pentru o notiță scrisă de un utilizator.',
        },
        {
          role: 'user',
          content,
        },
      ],
      max_tokens: 20,
    });

    const title = completion.choices[0].message?.content?.trim();

    res.status(200).json({ title });
  } catch (error) {
    console.error('Eroare OpenAI:', error);
    res.status(500).json({ error: 'Eroare la generarea titlului.' });
  }
}
