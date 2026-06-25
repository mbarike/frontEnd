import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  

  const [user, setUser] = useState({
    nom: "Hawa Thiam",
    email: "hawa@gmail.com",
    role: "membre depuis le 17/09/23",
  });

  // ✏️ changement input
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">

        <div className="h-24 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

        <div className="p-6 text-center -mt-12">

          {/* avatar */}
          <div className="w-24 h-24 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md">
            {user.nom.charAt(0)}
          </div>

          {/* NOM */}
          {editMode ? (
            <input
              name="nom"
              value={user.nom}
              onChange={handleChange}
              className="border p-2 mt-4 w-full text-center rounded"
            />
          ) : (
            <h1 className="text-2xl font-bold mt-4 text-gray-800">
              {user.nom}
            </h1>
          )}

          {/* ROLE */}
          <span className="inline-block mt-2 px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full">
            {user.role}
          </span>

          {/* EMAIL */}
          {editMode ? (
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border p-2 mt-4 w-full text-center rounded"
            />
          ) : (
            <div className="mt-5 bg-gray-50 rounded-lg p-3 text-sm text-gray-700 flex items-center justify-center gap-2">
              📧 <span>{user.email}</span>
            </div>
          )}

          {/* ACTIONS */}
          <div className="mt-6 flex gap-3">

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition font-medium"
              >
                Modifier
              </button>
            ) : (
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition font-medium"
              >
                Enregistrer
              </button>
            )}

            <button
              onClick={() => navigate("/ajouter_question")}
              className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition font-medium"
            >
              + Ajouter une question
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profil;