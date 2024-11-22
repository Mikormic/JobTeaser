'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import logo from '../images/icons8-compagnie-50.png'
import bg from '@/public/images/icons8-compagnie-50.png'
import Image from 'next/image';
function Page() {

  const [jobInfo, setJobInfo] = useState([]);
  const [recruteursMessage, setRecruteursMessage] = useState("")
  const [recruteurs, setRecruteurs] = useState([])
  const [isApply, setIsApply] = useState('');
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [user, setUser] = useState([])
  const [hidden, setHidden] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('Recherche Emploi')
  const [text, setText] = useState('')

  const router = useRouter();



  useEffect(() => {
    let job_id = localStorage.getItem('job-id');
    fetch(`http://localhost:3001/job/${job_id}`).then(
      response => response.json()
    ).then(
      (data) => {
        setJobInfo(data)
      }
    ).catch((error) => {
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



  useEffect(() => {
    let email = localStorage.getItem('email');
    fetch(`http://localhost:3001/user?email=${email}`).then(
      response => response.json()
    ).then(
      (data) => {
        console.log(data);
        setRecruteursMessage(data.message)
        setUser(data.users[0])
      }
    ).catch((error) => {
      console.error(error);
      setRecruteursMessage('Erreur lors de la récupération des données');
    });
  }, [])


  const Edit = () => {
    setName(user.name)
    setLastname(user.lastname)
    setEmail(user.email)
    setPhone(user.phone)
    setFrom(user.email)
    setText(`Vous avez une recherche d\'emploi à consulter !`)
    setHidden(!hidden)

  };



  async function apply() {
    try {
      let job_id = localStorage.getItem('job-id');
      let email = localStorage.getItem('email');
      fetch(`http://localhost:3001/apply?email=${email}&job_id=${job_id}`, {
        method: "POST",
      }).then(
        response => response.json()
      ).then(
        (data) => {
          console.log(data);
        }
      ).catch((error) => {
        console.error(error);
        setRecruteursMessage('Erreur lors de la récupération des données');
      });

      const formData = new FormData();
      formData.append('from', from);
      formData.append('to', to);
      formData.append('subject', subject);
      formData.append('text', text);

      fetch(`/api/send-email`, {
        method: "POST",
        body: formData
      }).then(
        response => response.json()
      ).then(
        (data) => {
          console.log(data);
        }
      ).catch((error) => {
        console.error(error);
        setRecruteursMessage('Erreur lors de la récupération des données');
      });

      window.location.reload();
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  const fal = () => {
    setHidden(false)
  }

  useEffect(() => {

    let job_id = localStorage.getItem('job-id');
    let email = localStorage.getItem('email');
    fetch(`http://localhost:3001/apply?email=${email}&job_id=${job_id}`, {
      method: "GET",
    }).then(
      response => response.json()
    ).then(
      (data) => {
        if (data.error === "Job is already apply") {
          setIsApply("Job is already apply")
          console.log(data.error);
        }

      }
    ).catch((error) => {
      console.error(error);
    });
  }, [])



  function recruteurTitle(id: any) {
    let i = 0

    while (i < recruteurs.length) {
      if (recruteurs && recruteurs.length > 0 && recruteurs[0]) {
        if (id === recruteurs[0].recruteur_id) {
          return recruteurs[0].titre
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
  function recruteurBackgroundCompagnies(id: any) {
    let i = 0

    while (i < recruteurs.length) {
      if (recruteurs && recruteurs.length > 0 && recruteurs[0]) {
        if (id === recruteurs[i].recruteur_id) {
          return recruteurs[i].background_img
        }
      }
      i += 1
    }
    return
  }
  function recruteurEmail(id: any) {
    let i = 0

    while (i < recruteurs.length) {
      if (recruteurs && recruteurs.length > 0 && recruteurs[0]) {
        if (id === recruteurs[i].recruteur_id) {
          console.log(recruteurs[i]);

          return recruteurs[i].email
        }
      }
      i += 1
    }
    return
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

  function goBack() {
    router.push('/')
  }


  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-6">
      {jobInfo.map((info, index) => (
        <div key={index} className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <button
              onClick={() => goBack()}
              className="px-4 py-2 rounded-lg bg-orangeSite text-beigeSite font-bold 
                       hover:bg-greenSite hover:text-orangeSite transition-colors"
            >
              &#60; Retour
            </button>
          </div>

          {/* Main Content Container */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image and Recruiter Section */}
            <div className="relative h-48 md:h-64">
              <Image
                src={recruteurBackgroundCompagnies(info.recruteur_id)}
                width={1366}
                height={768}
                alt="Background of the recruteur"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src={recruteurLogo(info.recruteur_id)}
                    width={60}
                    height={60}
                    alt="Logo of the recruteur"
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="bg-white p-2 rounded-lg shadow">
                  <p className="text-sm font-medium">Date limite :</p>
                  <p className="text-sm">{truncate(info.date_limite, 11)}</p>
                </div>
              </div>
            </div>

            {/* Job Information Section */}
            <div className="p-6">
              {/* Title and Apply Button */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bold mb-2">{info.titre}</h1>
                  <ul className="flex flex-wrap gap-2 text-gray-700">
                    <li>{recruteurTitle(info.recruteur_id)},</li>
                    <li>{info.localisation},</li>
                    <li>{info.type_de_contrat}</li>
                  </ul>
                </div>
                {isApply != "Job is already apply" ?
                  <button onClick={Edit} data-modal-target="crud-modal" data-modal-toggle="crud-modal" id='btn-apply' className='bg-orangeSite text-beigeSite font-bold text hover:bg-beigeSite hover:text-orangeSite'>Apply</button>
                  : <p id='btn-apply' className=' bg-orangeSite text-beigeSite font-bold text hover:bg-beigeSite hover:text-orangeSite'>Already Apply</p>}
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

                    <form className="p-4 md:p-5" onSubmit={apply}>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" valu>Lastname</label>
                      <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email of recruteur</label>
                          <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={recruteurEmail(info.recruteur_id)} onChange={(e) => setTo(e.target.value)} required />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                          <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
                          <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                          <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                      </div>
                      <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Apply
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Date de début</h4>
                <p>{truncate(info.date_debut, 11)}</p>
              </div>
              <div className="text-center border-t md:border-t-0 md:border-x border-gray-300 py-4 md:py-0">
                <h4 className="font-semibold mb-2">Niveau d'étude</h4>
                <p>{info.etude}</p>
              </div>
              <div className="text-center border-t md:border-t-0">
                <h4 className="font-semibold mb-2">Télétravail</h4>
                <p>{info.télétravail}</p>
              </div>
            </div>

            {/* Description Section */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Description du Job</h4>
              <p className="bg-beigeSite p-4 rounded-lg leading-relaxed">
                {info.description}
              </p>
            </div>
          </div>
        </div>
      ))
      }
    </div >
  );

}
export default Page;
