import { useEffect, useState } from "react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const token = localStorage.getItem("token");

  //  Fetch notes
  useEffect(() => {
    fetch("http://localhost:5000/api/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(Array.isArray(data)){
          setNotes(data);
        }else{
          console.error("NOTES ERROR:",data)
        }
      })
      .catch((err) => console.error(err));
  }, []);

  //  Create note
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setNotes([data, ...notes]);
    setForm({ title: "", content: "" });
  };

  //  Delete note
  const deleteNote = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📒 My Notes</h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* CREATE NOTE */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Create Note
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Add Note
        </button>
      </form>

      {/* NOTES LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet...</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {note.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {note.content}
              </p>

              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
