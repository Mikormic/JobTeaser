'use client'
import React, { useEffect, useState } from 'react'
import Users from '../components/Users'
import Recruteurs from '../components/Recruteurs'
import Jobs from '../components/Jobs'
import Createuser from '../components/Createuser'
import Createrecruteur from '../components/Createrecruteur'
import Createjobs from '../components/Createjobs'
import axios from 'axios'
import { useRouter } from 'next/navigation'



function page() {

    const [userscheck, setUsercheck] = useState(false)
    const [recruteurscheck, setRecruteurscheck] = useState(false)
    const [jobscheck, setJobscheck] = useState(false)

    const router = useRouter()

    useEffect(() => {

        const email = localStorage.getItem('email')

        fetch(`http://localhost:3001/isAdmin?email=${email}`, {
            method: "GET",
          }).then(
            response => response.json()
          ).then(
            (data) => {
              console.log(data);
              localStorage.setItem('isAdmin', data.user[0].isAdmin);
              if(data.user[0].isAdmin == 0){
                router.push('/404')
              }
            }
          ).catch((error) => {
            console.error(error);
          });
          
    }, [])




    function checkUsers() {

        setUsercheck(true)
        setRecruteurscheck(false)
        setJobscheck(false)

    }
    function checkRecruteurs() {

        setRecruteurscheck(true)
        setUsercheck(false)
        setJobscheck(false)

    }
    function checkJobscheck() {

        setJobscheck(true)
        setUsercheck(false)
        setRecruteurscheck(false)
    }




    return (
        <div>
            <button onClick={checkUsers}>Users</button>
            <button onClick={checkRecruteurs}>Recruteurs</button>
            <button onClick={checkJobscheck}>Jobs</button>
            <Createuser />
            <Createrecruteur />
            <Createjobs />

            {
                userscheck ? (
                    <Users />
                ) : recruteurscheck ? (
                    <Recruteurs />
                ) : jobscheck ? (
                    <Jobs />
                ) : <Users />
            }

        </div>
    )
}

export default page