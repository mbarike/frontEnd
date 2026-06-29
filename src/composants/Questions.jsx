import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import axios from "axios";
import { useSearchParams } from "react-router-dom";


const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [loading, setLoading] = useState(true);
  const URL_FRONT = import.meta.env.VITE_URL_FRONT;

  const filteredQuestions =
    selectedTag === "all"
      ? questions
      : questions.filter(
          (q) =>
            q.tags &&
            q.tags.some(
              (tag) =>
                tag.toLowerCase() === selectedTag.toLowerCase()
            )
        );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          "https://backend-node-kiqh.onrender.com/api/question"
          
        );
        console.log("QUESTIONS:", res.data.questions);

        setQuestions(res.data.questions || []);
      } catch (error) {
        console.error("Erreur récupération questions :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDeleteQuestion = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/question/${id}`
      );

      setQuestions((prev) =>
        prev.filter((question) => question._id !== id)
      );
    } catch (error) {
      console.error("Erreur suppression :", error);
      alert("Erreur lors de la suppression");
    }
  };

  

  if (loading) {
    return (
      <div className="text-center mt-10">
        Chargement des questions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              💬 Questions
            </h1>

            <p className="text-gray-600 mt-1">
              {filteredQuestions.length} questions disponibles
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-5 flex-wrap">
          <button
            onClick={() => setSelectedTag("all")}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Tous
          </button>

          <button
            onClick={() => setSelectedTag("React")}
            className="px-3 py-1 bg-blue-200 rounded"
          >
            React
          </button>

          <button
            onClick={() => setSelectedTag("Node")}
            className="px-3 py-1 bg-green-200 rounded"
          >
            Node
          </button>

          <button
            onClick={() => setSelectedTag("MongoDB")}
            className="px-3 py-1 bg-yellow-200 rounded"
          >
            MongoDB
          </button>
        </div>

        <div className="grid gap-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question._id}
                question={question}
                onDelete={handleDeleteQuestion}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">
              Aucune question trouvée.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;