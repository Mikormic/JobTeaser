import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Recruteurs() {



  const [jobsMessage, setJobMessage] = useState('')
  const [jobs, setJobs] = useState([])
  const [email, setEmail] = useState('')
  const [titre, setTitre] = useState('')
  const [localisation, setLocalisation] = useState('')
  const [recruteur_id, setRecruteur_id] = useState('')
  const [hidden, setHidden] = useState(false)

  useEffect(() => {

    fetch("http://localhost:3001/recruteurs").then(
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

  }, [])

  const Edit = (job: any) => {
    setTitre(job.titre);
    setEmail(job.email);
    setLocalisation(job.localisation);
    setRecruteur_id(job.recruteur_id);
    setHidden(!hidden)

  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log(titre, email, localisation, recruteur_id);

    fetch(`http://localhost:3001/updateRecruteur?email=${email}&titre=${titre}&localisation=${localisation}&recruteur_id=${recruteur_id}`, {
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

  const Delete = async (recruteur_id: any) => {
    console.log(recruteur_id);
    
    try {
      await axios.delete('http://localhost:3001/deleteRecruteur', {
       data: {recruteur_id}
      })
      console.log(recruteur_id);
      
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
                    <div className='info-jobs'>
                      <div className='titles-jobs'>
                        <h2 className=' text-greenSite font-bold'>Nom de l'entreprise : {job.titre}</h2>
                        <h2 className='text-greenSite font-bold'>Email de l'entreprise : {job.email}</h2>
                      </div>
                    </div>
                  </div>
                  <div className='footer-jobs '>
                    <p className='text-orangeSite'>Localisation : {job.localisation}</p>
                    <button onClick={() => Edit(job)} data-modal-target="crud-modal" data-modal-toggle="crud-modal" type='button' className='btn-jobs-footer bg-greenSite text-orangeSite font-bold hover:bg-beigeSite' >Modification</button>
                    <button onClick={() => Delete(job.recruteur_id)} type='button' className='btn-jobs-footer bg-red-600 text-stone-300 font-bold' >Delete</button>
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
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Localisation</label>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={localisation} onChange={(e) => setLocalisation(e.target.value)} required />
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">id</label>
                              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={recruteur_id} onChange={(e) => setRecruteur_id(e.target.value)} required />
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

export default Recruteurs