const db = require("../config/database");
const bcrypt = require("bcrypt");

// Création d'un recruteur
exports.createRecruters = (req, res) => {
  const { email, password, background_img, logo_img, titre, localisation } =
    req.body;

  const emailExist = `SELECT * FROM Recruteurs WHERE email = ?`;

  db.query(emailExist, [email], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la recherche de l'utilisateur" });
    }

    if (result.length > 0) {
      return res.status(400).json({ error: "L'utilisateur existe déjà" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erreur lors du hashage du mot de passe" });
      }

      const query = `INSERT INTO Recruteurs (email, password, background_img, logo_img, titre, localisation) VALUES (?, ?, '/images/643367.jpg','/images/icons8-nike-50.png', ?, ?)`;

      db.query(query, [email, hash, titre, localisation], (err, result) => {
        if (err) {
          console.error("Erreur SQL :", err);
          return res
            .status(500)
            .json({ error: "Erreur lors de la création du recruteur" });
        }

        res.status(201).json({
          message: "Recruteur créé avec succès",
          recruterId: result.insertId,
        });
      });
    });
  });
};

exports.allRecruters = (req, res) => {
  const query = "SELECT * FROM Recruteurs";
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error sql :", err);

      res.status(500).json({
        error: "Erreur lors de l'affichage des recruteur.",
        details: err.message,
      });
    } else {
      res.status(200).json({
        message: "Recruteurs affiché avec succès",
        recruteurs: result,
      });
    }
  });
};

exports.jobOfRecruters = (req, res) => {
  const { recruteur_id } = req.query;

  const query = `SELECT * FROM Jobs WHERE recruteur_id = ${recruteur_id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error sql :", err);

      res.status(500).json({
        error: "Erreur lors de la récupération des jobID",
        details: err.message,
      });
    } else {
      res.status(201).json({
        result: result,
        message: "JobID Success",
      });
    }
  });
};

exports.updateJob = (req, res) => {
  const {
    titre,
    description,
    etude,
    type_de_contrat,
    télétravail,
    localisation,
    date_debut,
    date_limite,
    job_id,
  } = req.query;
  const query = `UPDATE Jobs SET titre = '${titre}', description = '${description}', etude = '${etude}', type_de_contrat = '${type_de_contrat}', télétravail = '${télétravail}', localisation = '${localisation}', date_debut = '${date_debut}', date_limite = '${date_limite}' WHERE job_id = ${job_id}`;
  db.query(query, (err, results) => {
    if (err) {
      console.log("Error sql :", err);
      res.status(500).json({
        error: "Erreur de la mise à jour du job",
        details: err.message,
      });
    } else {
      res.status(200).json({
        results: results,
        message: "Update is done !",
      });
    }
  });
};

exports.updateRecruteur = (req, res) => {
  const { email, titre, localisation, recruteur_id } = req.query;
  const query = `UPDATE Recruteurs SET email = '${email}', titre = '${titre}', localisation = '${localisation}' WHERE recruteur_id = ${recruteur_id}`;
  db.query(query, (err, results) => {
    if (err) {
      console.log("Error sql :", err);
      res.status(500).json({
        error: "Erreur de la mise à jour du recruteur",
        details: err.message,
      });
    } else {
      res.status(200).json({
        results: results,
        message: "Update is done !",
      });
    }
  });
};

exports.deleteJob = (req, res) => {
  const { job_id } = req.body;

  const query = `
      DELETE FROM Jobs 
      WHERE job_id = ${job_id}
    `;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({
        error: "Erreur lors de la suppression du job",
      });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.deleteRecruter = (req, res) => {
  const { recruteur_id } = req.body;
  
    const deleteRecruteur = `
      DELETE FROM Recruteurs 
      WHERE recruteur_id = ${recruteur_id}
    `;

    db.query(deleteRecruteur, (err, results) => {
      if (err) {
        res.status(500).json({
          error: "Erreur lors de la suppression de l'utilisateur",
          details: err.message,
        });
      } else {
        res.status(200).json(results);
      }
    });
};
