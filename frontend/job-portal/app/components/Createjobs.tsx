'use client'
import React, { useState } from 'react'
import axios from 'axios'

function Createjobs() {

    const [recruteur_id, setRecruteur_id] = useState('')
    const [titre, setTitre] = useState('')
    const [description, setDescription] = useState('')
    const [etude, setEtude] = useState('')
    const [type_de_contrat, setTypedecontrat] = useState('')
    const [télétravail, setTélétravail] = useState('')
    const [localisation, setLocalisation] = useState('')
    const [date_debut, setDatedebut] = useState('')
    const [date_limite, setDatelimite] = useState('')
    const [hidden, setHidden] = useState(false)


    const open = () => {
        setHidden(!hidden)
    };

    const submit = async (e: any) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3001/createJob', {
                recruteur_id,
                titre,
                description,
                etude,
                type_de_contrat,
                télétravail,
                localisation,
                date_debut,
                date_limite
            })
            window.location.reload();

        } catch (error) {
            console.log('Registration failed', error)
        }
    }
    const close = () => {
        setHidden(false)
    }

    return (
        <div>
            <button onClick={open} data-modal-target="crud-modal" data-modal-toggle="crud-modal" type='button' className='btn-jobs-footer bg-greenSite text-orangeSite font-bold hover:bg-beigeSite' >Create Jobs</button>
            <div id="crud-modal" tabIndex={-1} aria-hidden={hidden} className={`${hidden ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create Jobs
                            </h3>
                            <button onClick={close} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form className="p-4 md:p-5" onSubmit={submit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recruteur_id</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={recruteur_id} onChange={(e) => setRecruteur_id(e.target.value)} required />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={titre} onChange={(e) => setTitre(e.target.value)} required />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={description} onChange={(e) => setDescription(e.target.value)} required />
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
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date debut</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={date_debut} onChange={(e) => setDatedebut(e.target.value)} required />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date limite</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={date_limite} onChange={(e) => setDatelimite(e.target.value)} required />
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Createjobs