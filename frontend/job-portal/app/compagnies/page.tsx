'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPinIcon } from '@heroicons/react/24/outline';

// Définition de l'interface pour un recruteur
interface Recruteur {
  recruteur_id: number;
  titre: string;
  logo_img: string;
  localisation: string;
}

const Pages: React.FC = () => {
  const [recruteursMessage, setRecruteursMessage] = useState<string>("Chargement des recruteurs...");
  const [recruteurs, setRecruteurs] = useState<Recruteur[]>([]);
  const router = useRouter();

  // Fetch pour récupérer la liste des recruteurs
  useEffect(() => {
  
  
    fetch("http://localhost:3001/recruteurs").then(
      response => response.json()
    ).then(
      (data) => {
        console.log(data);
        setRecruteursMessage(data.message)
        setRecruteurs(data.recruteurs)
      }
    ).catch((error) => {
      console.error(error);
      setRecruteursMessage('Erreur lors de la récupération des données');
    });
    
  }, []);

  // Stocke l'ID du recruteur et redirige vers la page de la compagnie
  const idToStorage = (recruteur_id: number) => {
    localStorage.setItem('recruteur_id_for_recruteur', recruteur_id.toString());
    router.push('/compagnie'); // Redirection vers la page des détails de la compagnie
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">
          Listes des entreprises : {recruteurs.length}
        </h1>

        {recruteursMessage && <p className="text-red-600">{recruteursMessage}</p>}
        {recruteurs.length === 0 && <p className="text-red-600">Nous ne trouvons pas de recruteurs.</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recruteurs.map((recruteur) => (
            <div key={recruteur.recruteur_id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-orangeSite p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="titles-jobs flex-grow">
                    <h2 className="text-xl font-bold text-greenSite">{recruteur.titre}</h2>
                  </div>
                  <Image
                    src={recruteur.logo_img}
                    width={50}
                    height={50}
                    alt={`Logo de ${recruteur.titre}`}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-orangeSite flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {recruteur.localisation}
                  </p>
                  <button
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-orangeSite bg-greenSite hover:bg-beigeSite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-greenSite transition-colors duration-200"
                    onClick={() => idToStorage(recruteur.recruteur_id)}
                  >
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pages;
