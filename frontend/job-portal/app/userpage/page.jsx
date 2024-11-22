"use client";
import React, { useEffect, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BsTelephone } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";
import EditUser from "../components/EditUser";


function Page() {
  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserByEmail = async () => {
      try {
        const email = localStorage.getItem("email");
        const res = await fetch(`http://localhost:3001/user?email=${email}`);

        if (!res.ok) {
          throw new Error(
            "Erreur lors de la récupération des données utilisateur"
          );
        }
        const data = await res.json();
        console.log(data.users);
        
        setUser(data.users[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserByEmail();
  }, []);

  if (loading) return <div className="text-red-800">Chargement</div>;
  if (error) return <div className="text-red-800">Erreur : {error}</div>;
  if (!user) return <div className="text-red-800">Aucun utilisateur trouvé</div>;
console.log(user);

  return (
    <div className="container max-w-md mx-auto overflow-hidden pt-[16vh]">
      <div className="flex flex-col justify-center items-center bg-gray-200 min-h[100vh]">
        <div className="relative flex w-full flex-col pt-[20px] md:pt-0">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-5 mr-0 h-min max-w-full pt-8 pb-6 px-6 md:mb-0">
            <div className="text-xl text-center font-extrabold text-orangeSite md:text-3xl">
              {user.name} {user.lastname}
            </div>
            <div className="  flex mb-5 mt-1 text-sm font-medium text-greenSite md:text-base"></div>
            <div className="rounded-lg gap-2 botder bg-card text-card-foreground shadow-sm mb-5 h-min flex items-center max-w-full py-4 px-4 md:text-base hover:bg-greenSite">
              <TfiEmail className="size-4" />
              <p className="">{user.email}</p>
            </div>
            <div className="rounded-lg gap-2 botder bg-card text-card-foreground shadow-sm mb-5 h-min flex items-center max-w-full py-4 px-4 md:text-base hover:bg-greenSite">
              <LiaBirthdayCakeSolid />
              <p className="">{user.age} ans </p>
            </div>
            <div className="rounded-lg gap-2 botder bg-card text-card-foreground shadow-sm mb-5 h-min flex items-center max-w-full py-4 px-4 md:text-base  hover:bg-greenSite">
              <BsTelephone />
              <p className="">{user.phone} </p>
            </div>
            <div className="rounded-lg gap-2 botder bg-card text-card-foreground shadow-sm mb-5 h-min flex items-center max-w-full py-4 px-4 md:text-base  hover:bg-greenSite">
              <CiLocationArrow1 />
              <p className="">{user.localisation}, France </p>
            </div>
            <EditUser/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;