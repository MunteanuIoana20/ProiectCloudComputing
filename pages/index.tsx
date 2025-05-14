import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

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
    } else {
      setMessage('Eroare la salvare.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notiță nouă</h1>

      <textarea
        className="w-full border rounded p-2 mb-2"
        placeholder="Conținut notiță"
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
        placeholder="Titlu generat"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={saveNote}
        className="bg-green-600 text-white px-4 py-2 rounded mb-2"
      >
        Salvează Notița
      </button>

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
