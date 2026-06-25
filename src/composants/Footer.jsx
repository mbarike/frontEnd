import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#232629] text-gray-300 mt-10">
      
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo / Description */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">StackDev</h2>
          <p className="text-sm text-gray-400">
            Une plateforme pour poser des questions, partager et apprendre ensemble.
          </p>
        </div>

        

        

        {/* Colonne 3 */}
        <div>
          <h3 className="text-white font-semibold mb-3">contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">stackOverflow@gmail.com </li>
            <li className="hover:text-white cursor-pointer">Dakar, Sénégal</li>
          </ul>
        </div>

      </div>

      {/* Bas du footer */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} StackDev — Tous droits réservés
      </div>

    </footer>
  )
}

export default Footer