import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await fetch("/api/get-notes");
    const data = await res.json();
    setNotes(data.notes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/save-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📝 Aplicație Notițe</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Titlul notiței"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            placeholder="Conținutul notiței"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Salvează Notița
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">📚 Notițele tale</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {notes.map((note: any) => (
              <div key={note._id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>
                <p className="text-gray-600">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
