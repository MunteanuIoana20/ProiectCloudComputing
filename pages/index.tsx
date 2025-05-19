import { useState, useEffect } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchNotes = async () => {
    const res = await fetch("/api/get-notes");
    const data = await res.json();
    setNotes(data.notes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const generateTitle = async () => {
    if (!(content ?? "").trim()) {
      alert("Scrie mai întâi conținutul notiței.");
      return;
    }
    setLoadingTitle(true);
    const res = await fetch("/api/generate-title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    setTitle(data.title ?? "");
    setLoadingTitle(false);
  };

  const saveNote = async () => {
    if (!(title ?? "").trim() || !(content ?? "").trim()) {
      alert("Titlul și conținutul nu pot fi goale.");
      return;
    }
    setLoadingSave(true);
    await fetch("/api/save-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    setLoadingSave(false);
    fetchNotes();
  };

  const startEditing = (note: { _id: string; title: string; content: string }) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    if (!(title ?? "").trim() || !(content ?? "").trim()) {
      alert("Titlul și conținutul nu pot fi goale.");
      return;
    }
    setLoadingSave(true);
    try {
      const res = await fetch("/api/edit-note", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, newContent: content, newTitle: title }),
      });
      if (!res.ok) throw new Error("Eroare la salvarea modificărilor");
      setEditingId(null);
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error: any) {
      alert(error.message);
    }
    setLoadingSave(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi această notiță?")) return;
    await fetch("/api/delete-note", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchNotes();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Aplicație Notițe</h1>

      <textarea
        rows={5}
        placeholder="Scrie conținutul notiței aici..."
        className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loadingTitle || loadingSave}
      />

      <div className="mb-4 flex flex-col">
        <button
          onClick={generateTitle}
          disabled={loadingTitle || !(content ?? "").trim()}
          className="w-40 px-4 py-2 mb-2 bg-purple-600 text-white rounded hover:bg-green-700 transition"
        >
          {loadingTitle ? "Se generează titlul..." : "Generează titlu"}
        </button>

        <input
          type="text"
          placeholder="Titlul generat va apărea aici"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={loadingSave}
        />
      </div>

      <button
        onClick={editingId ? saveEdit : saveNote}
        disabled={
          loadingSave ||
          !(title ?? "").trim() ||
          !(content ?? "").trim()
        }
        className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-blue-700 transition mb-8"
      >
        {loadingSave ? "Se salvează..." : editingId ? "Salvează Modificările" : "Salvează Notița"}
      </button>

      <h2 className="text-2xl font-semibold mb-4">Notițele tale</h2>
      <ul className="space-y-4">
        {notes.map((note: { _id: string; title: string; content: string }) => (
          <li
            key={note._id}
            className="bg-purple-100 text-purple-900 rounded-lg p-4 shadow-md relative"
          >
            <button
              onClick={() => handleDelete(note._id)}
              className="absolute top-2 right-3 text-red-600 hover:text-red-800 font-bold text-xl"
              title="Șterge notița"
            >
              &times;
            </button>

            <button
              onClick={() => startEditing(note)}
              className="absolute top-2 right-10 text-blue-600 hover:text-blue-800 font-bold text-lg"
              title="Editează notița"
            >
              &#9998;
            </button>

            <h3 className="font-bold text-lg mb-2">{(note.title ?? "").trim() || "Fără titlu"}</h3>
            <p className="whitespace-pre-wrap">{(note.content ?? "").trim() || "Fără conținut"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
