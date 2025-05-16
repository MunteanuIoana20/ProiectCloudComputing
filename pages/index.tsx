import { useEffect, useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState([]);

  const generateTitle = async () => {
    const res = await fetch('/api/generate-title', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    setTitle(data.title);
  };

  const saveNote = async () => {
    const res = await fetch('/api/save-note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      setMessage('Notiță salvată cu succes!');
      setTitle('');
      setContent('');
      fetchNotes(); // reîncarcă lista după salvare
    } else {
      setMessage('Eroare la salvare.');
    }
  };

  const fetchNotes = async () => {
    const res = await fetch('/api/get-notes');
    const data = await res.json();
    setNotes(data.notes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Adaugă o notiță</h1>

      <textarea
        className="w-full border rounded p-2 mb-2"
        placeholder="Scrie conținutul notiței..."
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={generateTitle}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
      >
        Generează titlu
      </button>

      <input
        className="w-full border rounded p-2 mb-2"
        placeholder="Titlul generat"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={saveNote}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Salvează Notița
      </button>

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}

      <h2 className="text-xl font-semibold mt-6 mb-2">Notițele tale</h2>
      <ul className="space-y-2">
      {notes && notes.length > 0 ? (
  notes.map((note: any) => (
    <li key={note._id} className="border rounded p-3 bg-white shadow">
      <h3 className="font-bold">{note.title}</h3>
      <p>{note.content}</p>
    </li>
  ))
) : (
  <p>Nu există notițe salvate încă.</p>
)}

      </ul>
    </div>
  );
}
