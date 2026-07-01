import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [search, setSearch] = useState("");

  const Deconnexion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    alert("Déconnexion réussie");
    navigate("/");
  };

 

  return (
    <nav className="w-full h-[10vh] flex items-center justify-between px-8 bg-gray-800 text-white shadow">
      
      {/* Logo */}
      <NavLink to="/" className="text-xl font-bold text-blue-400">
        MiniStack
      </NavLink>

     

      {/* Liens */}
      <div className="flex items-center gap-6">

        <NavLink to="/" className="hover:text-blue-300">
          Accueil
        </NavLink>

        {token ? (
          <>
            <NavLink
              to={`/user/${userId}`}
              className="hover:text-blue-300"
            >
              Profil
            </NavLink>

            <button
              onClick={Deconnexion}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Deconnexion
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <NavLink
              to="/connexion"
              className="bg-yellow-500 px-4 py-1 rounded hover:bg-yellow-600"
            >
              Connexion
            </NavLink>

            <NavLink
              to="/inscription"
              className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
            >
              Inscription
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;