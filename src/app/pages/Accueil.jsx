import React from 'react'
import { useNavigate } from 'react-router-dom'
import Questions from './../../composants/Questions'
const URL_FRONT = import.meta.env.VITE_URL_FRONT;

const Accueil = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const VerificationToken = () => {
    if (token) return navigate('/ajouter_question')
    navigate('/connexion')
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">

      {/* ── Hero banner ── */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 py-16 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          
          {/* Texte */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-4">
  <span className="text-white">Bienvenue sur </span>
  <span className="text-black">Stack Overflow</span>
</h1>

            <p className="text-blue-100 text-base sm:text-lg max-w-xl leading-relaxed">
             Posez vos questions, échangez avec la communauté et développez vos compétences
            </p>
          </div>

          {/* Bouton */}
          <button
            onClick={VerificationToken}
            className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Poser une question
          </button>
        </div>
      </div>

      {/* ── Section Questions ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        
       

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Questions />
        </div>

      </div>

    </div>
  )
}

export default Accueil