import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Jobs() {

  const [jobsMessage, setJobMessage] = useState('')
  const [jobs, setJobs] = useState([])
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [etude, setEtude] = useState('')
  const [type_de_contrat, setTypedecontrat] = useState('')
  const [télétravail, setTélétravail] = useState('')
  const [localisation, setLocalisation] = useState('')
  const [date_debut, setDatedebut] = useState('')
  const [date_limite, setDatelimite] = useState('')
  const [job_id, setJob_id] = useState('')
  const [hidden, setHidden] = useState(false)

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
      }
    ).catch((error) => {
      console.error(error);
    });
  }, [])

  const Edit = (job: any) => {
    setTitre(job.titre)
    setDescription(job.description)
    setEtude(job.etude)
    setTypedecontrat(job.type_de_contrat)
    setTélétravail(job.télétravail)
    setLocalisation(job.localisation)
    setDatedebut(job.date_debut)
    setDatelimite(job.date_limite)
    setJob_id(job.job_id)
    setHidden(!hidden)

  };


  const handleSubmit = (e: React.FormEvent) => {
    console.log(titre, description, etude, type_de_contrat, télétravail, localisation, date_debut, date_limite, job_id);

    fetch(`http://localhost:3001/updateJob?titre=${titre}&description=${description}&etude=${etude}&type_de_contrat=${type_de_contrat}&télétravail=${télétravail}&localisation=${localisation}&date_debut=${date_debut}&date_limite=${date_limite}&job_id=${job_id}`, {
      method: "PUT",
    }).then(
      response => response.json()
    ).then(
      (data) => {
        console.log(data);
        setJobMessage(data.message)
        setJobs(data.recruteurs)
      }
    ).catch((error) => {
      console.error(error);
      setJobMessage('Erreur lors de la récupération des données');
    });

  }



  const fal = () => {
    setHidden(false)
  }


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

  const Delete = async (job_id: any) => {

    try {
      await axios.delete('http://localhost:3001/deleteJob', {
        data: { job_id }
      })

      window.location.reload();

    } catch (error) {
      console.log('Delete failed', error)
    }

  }

  return (
    <div>

      {
        jobs.map((job, index) => {
          {
            return (
              <div key={index}>
                <div className='jobs bg-white'>
                  <div className='list-jobs bg-orangeSite'>
                    <div id='date-publi-admin'>
                      <p className='date-publication bg-beigeSite text-orangeSite font-bold'>Date de publication : {truncate(job.date_publication, 11)}</p>
                      <p className='date-publication bg-beigeSite text-orangeSite font-bold'>Date de début : {truncate(job.date_debut, 11)}</p>
                      <p className='date-publication bg-beigeSite text-orangeSite font-bold'>Date limite : {truncate(job.date_limite, 11)}</p>
                    </div>
                    <div className='info-jobs'>
                      <div className='titles-jobs'>
                        <h2 className='text-greenSite font-bold'>Nom du job : {job.titre}</h2>
                      </div>
                    </div>
                    <ul className='ul-jobs'>
                      <li className='bg-beigeSite text-orangeSite'>Type contrat : {job.type_de_contrat}</li>
                      <li className='bg-beigeSite text-orangeSite'>Étude : {job.etude}</li>
                      <li className='bg-beigeSite text-orangeSite'>Télétravail : {job.télétravail}</li>
                    </ul>
                  </div>
                  <p>Description : {job.description}</p>
                  <div className='footer-jobs '>
                    <p className='text-orangeSite'>Localisation : {job.localisation}</p>
                    <button onClick={() => Edit(job)} data-modal-target="crud-modal" data-modal-toggle="crud-modal" type='button' className='btn-jobs-footer bg-greenSite text-orangeSite font-bold hover:bg-beigeSite' >Modification</button>
                    <button onClick={() => Delete(job.job_id)} type='button' className='btn-jobs-footer bg-red-600 text-stone-300 font-bold' >Delete</button>
                  </div>
                  <div id="crud-modal" tabIndex={-1} aria-hidden={hidden} className={`${hidden ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                    <div className="relative p-4 w-full max-w-md max-h-full">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Update Information
                          </h3>
                          <button onClick={fal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>

                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                          <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={titre} onChange={(e) => setTitre(e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                              <textarea name="name" rows={10} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Etude</label>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={etude} onChange={(e) => setEtude(e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type de contrat</label>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={type_de_contrat} onChange={(e) => setTypedecontrat(e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Télétravail</label>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={télétravail} onChange={(e) => setTélétravail(e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Localisation</label>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={localisation} onChange={(e) => setLocalisation(e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date de debut</label>
                              <p>Il faut changer la date en format yyyy/mm/dd</p>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={date_debut} onChange={(e) => setDatedebut(e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date limite</label>
                              <p>Il faut changer la date en format yyyy/mm/dd</p>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={date_limite} onChange={(e) => setDatelimite(e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">id</label>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={job_id} onChange={(e) => setJob_id(e.target.value)} required />
                            </div>
                          </div>
                          <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Update
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })
      }
    </div>
  )
}

export default Jobs