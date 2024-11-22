import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EditUser {
  email: string;
  phone: string;
  localisation: string;
  user_id: number; // Assurez-vous que user_id est inclus dans les données utilisateur
}

function EditUser() {
  const [editUser, setEditUser] = useState<EditUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (storedEmail) {
          const response = await axios.get(
            `http://localhost:3001/user?email=${storedEmail}`
          );

          console.log("User data fetched:", response.data);
          console.log(response.data.users[0]);
          setEditUser(response.data.users[0]);
          // Vérifiez la structure de la réponse
          if (Array.isArray(response.data) && response.data.length > 0) {


            if (response.data[0].user_id) {
              setEditUser(response.data[0].users[0]); // Stocker les données de l'utilisateur
            } else {
              console.error("user_id est manquant dans la réponse");
            }
          } else {
            console.error("Aucune donnée utilisateur trouvée ou mauvaise structure");
          }
        } else {
          console.error("Aucun email trouvé dans localStorage");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur", error);
      }
    };

    fetchUserData();
  }, [storedEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!editUser || !editUser.user_id) {
      console.error("editUser est nul ou user_id est manquant");
      alert("Les données de l'utilisateur sont manquantes.");
      setIsLoading(false);
      return;
    }

    console.log("editUser avant la soumission:", editUser); // Ajout de log

    try {
      console.log(`Updating user at: http://localhost:3001/updateUserNoAdmin/${editUser.user_id}`);
      const response = await axios.put(`http://localhost:3001/updateUserNoAdmin/${editUser.user_id}`, {
        email: editUser.email,
        phone: editUser.phone,
        localisation: editUser.localisation,
      });
      console.log("Réponse de la mise à jour:", response.data);
      alert("Profil mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error);
      alert("Échec de la mise à jour du profil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editUser) {
      setEditUser({
        ...editUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Modification</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-orangeSite">Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-orangeSite">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={editUser?.email || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right text-orangeSite">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={editUser?.phone || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="localisation" className="text-right text-orangeSite">
                Localisation
              </Label>
              <Input
                id="localisation"
                name="localisation"
                value={editUser?.localisation || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-orangeSite" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditUser;