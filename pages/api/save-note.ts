import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Lipsesc datele necesare.' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('notesdb');
    const result = await db.collection('notes').insertOne({ title, content, createdAt: new Date() });
    res.status(200).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Eroare la salvarea notiței.' });
  }
}
