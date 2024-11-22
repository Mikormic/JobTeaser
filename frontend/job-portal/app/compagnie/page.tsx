"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeftIcon,
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

// Définir les interfaces pour les types de données que tu reçois
interface Job {
  job_id: number;
  recruteur_id: number;
  titre: string;
  date_publication: string;
  type_de_contrat: string;
  etude: string;
  télétravail: string;
  localisation: string;
}

interface Recruteur {
  recruteur_id: number;
  titre: string;
  logo_img: string;
}

function Page() {
  // Ajouter les types pour les états
  const [recruteurJobs, setRecruteurJobs] = useState<Job[]>([]);
  const [recruteursMessage, setRecruteursMessage] = useState("");
  const [recruteurs, setRecruteurs] = useState<Recruteur[]>([]);

  const router = useRouter();

  // Fetch pour obtenir les informations d'offres d'emploi d'un recruteur
  useEffect(() => {
    const recruteur_id = localStorage.getItem("recruteur_id_for_recruteur")

    if (recruteur_id) {
      fetch(`http://localhost:3001/recruteur?recruteur_id=${recruteur_id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Données de l'API recruteur:", data);
          if (data && data.result) {
            setRecruteurJobs(data.result); // Mise à jour de recruteurJobs
            console.log("Offres d'emploi:", data.result);
          } else {
            setRecruteursMessage("Aucune information sur le recruteur.");
          }
        })
        .catch((error) => {
          console.error(error);
          setRecruteursMessage("Erreur lors de la récupération des données.");
        });
    }
  }, []);

  // Fetch pour obtenir la liste des recruteurs
  useEffect(() => {
    fetch("http://localhost:3001/jobRecruteur")
      .then((response) => response.json())
      .then((data) => {
        console.log("Recruteurs:", data);
        setRecruteursMessage(data.message);
        setRecruteurs(data.recruteurs); // Mise à jour de recruteurs
      })
      .catch((error) => {
        console.error(error);
        setRecruteursMessage("Erreur lors de la récupération des données");
      });
  }, []);

  // Troncature de la date et formatage
  function truncate(str: string, n: number) {
    let dateStr = str.length > n ? str.slice(0, n - 1) : str;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    const dateTimeFormatter = new Intl.DateTimeFormat(["ban", "id"], {
      dateStyle: "long",
      timeZone: "Europe/Paris",
    });
    const formatDate = dateTimeFormatter.format(date);
    let month = formatDate.split(" ");
    month.splice(1, 1, month[1].slice(0, 3) + ".");
    let newdate = month.join(" ");
    return newdate;
  }

  // Récupère le titre du recruteur par recruteur_id
  function recruteurTitle(id: number) {
    const recruteur = recruteurs.find((recruteur) => recruteur.recruteur_id === id);
    return recruteur ? recruteur.titre : "Inconnu";
  }

  // Récupère le logo du recruteur par recruteur_id
  function recruteurLogo(id: number) {
    const recruteur = recruteurs.find((recruteur) => recruteur.recruteur_id === id);
    return recruteur ? recruteur.logo_img : "";
  }

  // Stocke les IDs dans le localStorage et redirige vers la page des détails de l'offre
  function idToStorage(job_id: number, recruteur_id: any) {
    localStorage.setItem("job-id", job_id.toString());
    localStorage.setItem("recruteur_id_for_job", recruteur_id);
    router.push("/job");
  }

  // Redirige vers la page des compagnies
  function goBack() {
    router.push("/compagnies");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <button
          className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-beigeSite bg-orangeSite hover:bg-beigeSite hover:text-orangeSite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orangeSite transition-colors duration-200"
          onClick={goBack}
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" />
          Retour
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Nombre d'offres par entreprise: {recruteurJobs.length}
        </h1>

        {recruteursMessage && <p className="text-red-600">{recruteursMessage}</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recruteurJobs.map((job) => (
            <div
              key={job.job_id}  // Utilise job_id comme clé unique
              className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="bg-orangeSite p-4">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-beigeSite text-orangeSite">
                    {truncate(job.date_publication, 11)}
                  </span>
                  <Image
                    src={recruteurLogo(job.recruteur_id)}
                    width={50}
                    height={50}
                    alt="Logo du recruteur"
                    className="rounded-full"
                  />
                </div>
                <h2 className="text-lg font-semibold text-greenSite mb-1">
                  {recruteurTitle(job.recruteur_id)}
                </h2>
                <h3 className="text-xl font-bold text-greenSite">{job.titre}</h3>
              </div>
              <div className="p-4">
                <ul className="flex flex-wrap gap-2 mb-4">
                  <li className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-beigeSite text-orangeSite">
                    <BriefcaseIcon className="h-4 w-4 mr-1" />
                    {job.type_de_contrat}
                  </li>
                  <li className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-beigeSite text-orangeSite">
                    <AcademicCapIcon className="h-4 w-4 mr-1" />
                    {job.etude}
                  </li>
                  <li className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-beigeSite text-orangeSite">
                    <GlobeAltIcon className="h-4 w-4 mr-1" />
                    {job.télétravail}
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-orangeSite flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {job.localisation}
                  </p>
                  <button
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-orangeSite bg-greenSite hover:bg-beigeSite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-greenSite transition-colors duration-200"
                    onClick={() => idToStorage(job.job_id, job.recruteur_id)}
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
}

export default Page;
