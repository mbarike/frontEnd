import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
const URL_FRONT = import.meta.env.VITE_URL_FRONT;

export default function Detail() {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [contenu, setContenu] = useState("");

  // 📥 récupérer réponses (CORRIGÉ)
  const fetchAnswers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/answer/${id}`
      );

      // 🔥 sécurisé
      if (Array.isArray(res.data)) {
        setAnswers(res.data);
      } else if (Array.isArray(res.data.answers)) {
        setAnswers(res.data.answers);
      } else {
        setAnswers([]);
      }
    } catch (error) {
      console.error(error);
      setAnswers([]);
    }
  };

  // ➕ ajouter réponse
  const handleAnswer = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/answer", {
        contenu,
        auteur: "Hawa",
        questionId: id,
      });

      setContenu("");
      fetchAnswers();
    } catch (error) {
      console.error(error);
    }
  };

  // 📥 charger question + réponses
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/question/${id}`
        );
        setQuestion(res.data.question);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestion();
    fetchAnswers();
  }, [id]);

  if (!question) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  const date = question.createdAt
    ? new Date(question.createdAt).toLocaleDateString()
    : "";

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">

      {/* QUESTION */}
      <h1 className="text-2xl font-bold mb-4">
        {question.titre}
      </h1>

      <div className="text-sm text-gray-500 mb-4">
        👤 {question.auteur || "Anonyme"} • 📅 {date}
      </div>

      <div className="prose max-w-none mb-6">
        <ReactMarkdown>
          {question.description}
        </ReactMarkdown>
      </div>

      {/* ➕ AJOUT RÉPONSE */}
      <form onSubmit={handleAnswer} className="mt-6">
        <textarea
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          className="border w-full p-2 rounded"
          placeholder="Ta réponse..."
        />

        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
          Répondre
        </button>
      </form>

      {/* 📋 LISTE RÉPONSES */}
      <div className="mt-6">
        <h3 className="font-bold mb-2">
          {answers?.length || 0} réponses
        </h3>

        {Array.isArray(answers) &&
          answers.map((a) => (
            <div key={a._id} className="border p-3 mb-3 rounded">

              {/* contenu */}
              <p className="mb-2">{a.contenu}</p>

              {/* auteur */}
              <span className="text-sm text-gray-500">
                👤 {a.auteur}
              </span>

              {/* 👍 👎 */}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={async () => {
                    await axios.put(
                      `${URL_FRONT}/api/answer/like/${a._id}`
                    );
                    fetchAnswers();
                  }}
                  className="text-green-600"
                >
                  👍 {a.likes || 0}
                </button>

                <button
                  onClick={async () => {
                    await axios.put(
                      `${URL_FRONT}/api/answer/dislike/${a._id}`
                    );
                    fetchAnswers();
                  }}
                  className="text-red-600"
                >
                  👎 {a.dislikes || 0}
                </button>
              </div>

              {/* 💬 COMMENTAIRES */}
              <div className="mt-3">
                <h4 className="font-semibold">Commentaires :</h4>

                {a.comments?.map((c, i) => (
                  <p key={i} className="text-sm">
                    <b>{c.auteur}</b> : {c.contenu}
                  </p>
                ))}
              </div>

              {/* ✍️ AJOUT COMMENTAIRE */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const text = e.target.comment.value;

                  if (!text) return;

                  await axios.post(
                    `${URL_FRONT}/api/answer/comment/${a._id}`,
                    {
                      contenu: text,
                      auteur: "Hawa",
                    }
                  );

                  e.target.reset();
                  fetchAnswers();
                }}
                className="mt-2 flex gap-2"
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Ajouter un commentaire..."
                  className="border p-1 flex-1"
                />

                <button className="text-blue-500">
                  Envoyer
                </button>
              </form>

            </div>
          ))}
      </div>
    </div>
  );
}
