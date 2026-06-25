import { useState } from "react";
import axios from "axios";

export default function QuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [auteur, setAuteur] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/question", {
        titre: title,
        description,
        tags: tags.split(","), // ✅ tableau
        auteur: auteur,
      });

      alert("Question ajoutée !");

      setTitle("");
      setDescription("");
      setTags("");
      setAuteur("");

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi ❌");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded p-6 w-full max-w-xl"
      >
        <h2 className="text-xl font-bold mb-4">Poser une question</h2>

       

        {/* Titre */}
        <input
          type="text"
          placeholder="Titre de la question"
          className="border p-2 w-full mb-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          placeholder="Décris ton problème..."
          className="border p-2 w-full mb-3 rounded h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="tags (ex: react,node)"
          className="border p-2 w-full mb-4 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">
          Publier
        </button>
      </form>
    </div>
  );
}