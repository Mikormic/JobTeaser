"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


function page() {

  const token = localStorage.getItem('token')
  const router = useRouter()
  if (!token) {
    router.push('/login')
  }


  const [jobMessage, setJobMessage] = useState("")
  const [recruteursMessage, setRecruteursMessage] = useState("")
  const [jobs, setJobs] = useState([])
  const [recruteurs, setRecruteurs] = useState([])

  useEffect(() => {


    fetch("http://localhost:3001/jobs").then(
      response => response.json()
    ).then(
      (data) => {
        console.log(data);
        setJobMessage(data.message)
        setJobs(data.jobs)
      }
    ).catch((error) => {
      console.error(error);
      setJobMessage('Erreur lors de la récupération des données');
    });

  }, [])
  useEffect(() => {

    fetch("http://localhost:3001/jobRecruteur").then(
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
  }, [])

  function truncate(str: string, n: number) {
    let dateStr = (str.length > n) ? str.slice(0, n - 1) : str;

    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    const dateTimeFormatter = new Intl.DateTimeFormat(['ban', 'id'], { dateStyle: 'long', timeZone: 'Europe/Paris' });
    const formatDate = dateTimeFormatter.format(date);
    let month = formatDate.split(" ");
    month.splice(1, 1, month[1].slice(0, 4 - 1) + '.')
    let newdate = month.join(" ");
    return newdate;
  }

  function recruteurTitle(id: any) {
    let i = 0

    while (i < recruteurs.length) {
      if (recruteurs && recruteurs.length > 0 && recruteurs[0]) {
        if (id === recruteurs[i].recruteur_id) {
          return recruteurs[i].titre
        }
      }
      i += 1
    }
    return
  }
  function recruteurLogo(id: any) {
    let i = 0

    while (i < recruteurs.length) {
      if (recruteurs && recruteurs.length > 0 && recruteurs[0]) {
        if (id === recruteurs[i].recruteur_id) {
          return recruteurs[i].logo_img
        }
      }
      i += 1
    }
    return
  }

  function idToStorage(job_id: any, recruteur_id: any) {
    localStorage.setItem('job-id', job_id)
    localStorage.setItem('recruteur_id_for_job', recruteur_id)
    router.push('/job')
  }
  


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Nombre d'offres : {jobs.length}
        </h1>
        
        {jobMessage && <p className="text-red-600">{jobMessage}</p>}
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.length === 0 ? (
            <p className="text-red-600">Aucun emploi trouvé.</p>
          ) : (
            jobs.map((job, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-orangeSite p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="titles-jobs flex-grow">
                      <p className="date-publication bg-beiteSite text-orangeSite font-bold">
                        {truncate(job.date_publication, 11)}
                      </p>
                      <h2 className="text-greenSite font-bold">
                        {recruteurTitle(job.recruteur_id)}
                      </h2>
                      <h2 className="text-greenSite font-bold">{job.titre}</h2>
                    </div>
                    <Image
                      src={recruteurLogo(job.recruteur_id)}
                      width={50}
                      height={50}
                      alt="Logo of the recruteur"
                      className="pt-4 rounded-lg"
                    />
                  </div>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    <li className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-beigeSite text-orangeSite">
                      {job.type_de_contrat}
                    </li>
                    <li className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-beigeSite text-orangeSite">
                      {job.etude}
                    </li>
                    <li className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-beigeSite text-orangeSite">
                      {job.télétravail}
                    </li>
                  </ul>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-orangeSite">{job.localisation}</p>
                    <button
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-orangeSite bg-greenSite hover:bg-beigeSite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-greenSite transition-colors duration-200"
                      onClick={() => idToStorage(job.job_id, job.recruteur_id)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
  
}

export default page;
