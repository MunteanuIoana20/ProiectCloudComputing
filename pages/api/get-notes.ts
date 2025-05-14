// pages/api/get-notes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const client = await clientPromise;
    const db = client.db('notesdb');
    const notes = await db.collection('notes').find({}).sort({ createdAt: -1 }).toArray();

    res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Eroare la preluarea notițelor.' });
  }
}
