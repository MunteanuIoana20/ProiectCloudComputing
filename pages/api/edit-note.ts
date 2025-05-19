import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb'; 
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Metoda HTTP nu este permisă' });
  }

  const { id, newContent } = req.body;

  if (!id || !newContent || typeof newContent !== 'string') {
    return res.status(400).json({ error: 'Date invalide' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('notesdb');
    const result = await db.collection('notes').updateOne(
      { _id: new ObjectId(id) },
      { $set: { content: newContent, updatedAt: new Date() } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Notița a fost actualizată cu succes' });
    } else {
      res.status(404).json({ error: 'Notița nu a fost găsită' });
    }
  } catch (error) {
    console.error('Eroare la editare:', error);
    res.status(500).json({ error: 'Eroare la actualizarea notiței' });
  }
}
