import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db("notesdb");
      const collection = db.collection("notes");

      await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "Notița a fost ștearsă." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Eroare la ștergerea notiței." });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
