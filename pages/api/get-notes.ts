import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const client = await clientPromise;
    const db = client.db('notesdb');
    const notesRaw = await db.collection('notes').find({}).sort({ createdAt: -1 }).toArray();

    
    const notes = notesRaw.map(note => ({
      ...note,
      title: typeof note.title === 'string' ? note.title : '',
      content: typeof note.content === 'string' ? note.content : '',
    }));

    res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Eroare la preluarea notițelor.' });
  }
}
