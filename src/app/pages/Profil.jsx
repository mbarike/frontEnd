import React, { useEffect, useState } from "react";

const Profil = () => {
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    nom: "hawa",
    prenom: "thaim",
    email: "hawathiam@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  // ✅ charger image sauvegardée au démarrage
  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");

    if (savedAvatar) {
      setUser((prev) => ({
        ...prev,
        avatar: savedAvatar,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ CORRIGÉ : image persistante (Base64)
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;

        setUser((prev) => ({
          ...prev,
          avatar: base64Image,
        }));

        localStorage.setItem("avatar", base64Image);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-6">

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt="profil"
            className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
          />

          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-3 text-sm"
            />
          )}

          <h1 className="text-2xl font-bold mt-3 text-gray-800">
            Mon Profil
          </h1>
        </div>

        {/* Infos */}
        <div className="mt-6 space-y-4">

          <div>
            <label className="text-sm text-gray-500">Nom</label>
            <input
              name="nom"
              value={user.nom}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Prénom</label>
            <input
              name="prenom"
              value={user.prenom}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Modifier
            </button>
          ) : (
            <button
              onClick={() => setEditMode(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Sauvegarder
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profil;