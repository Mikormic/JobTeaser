const db = require("../config/database");

// Création d'un job
exports.createJob = (req, res) => {
  const { recruteur_id,
    titre,
    description,
    etude,
    type_de_contrat,
    télétravail,
    localisation,
    date_debut,
    date_limite } =
    req.body;

  const jobExist =
    `SELECT * FROM Jobs WHERE titre = '${titre}' AND recruteur_id = ${recruteur_id}`;

  db.connect(function (err) {
    if (err) {
      res.status(500).json({
        error: "Erreur de connexion à la base de données",
      });
      return;
    }
    db.query(jobExist, (err, result) => {
      if (err) {
        res.status(500).json({
          error: "Erreur lors de la recherche du job",
        });
      }
      if (result.length > 0) {
        return res.status(400).json({ error: "Le job existe déjà" });
      }
      const today = new Date();
      function formatDate(date, format) {
        const map = {
          mm: date.getMonth() + 1,
          dd: date.getDate(),
          yy: date.getFullYear().toString().slice(-2),
          yyyy: date.getFullYear(),
        };

        return format.replace(/mm|dd|yy|yyyy/gi, (matched) => map[matched]);
      }
      const date = formatDate(today, "yyyy/mm/dd");
      const query = `INSERT INTO Jobs (recruteur_id, titre, description, etude, type_de_contrat, télétravail, localisation, date_publication, date_debut, date_limite) VALUES (${recruteur_id}, '${titre}', '${description}', '${etude}', '${type_de_contrat}', '${télétravail}', '${localisation}', '${date}', '${date_debut}', '${date_limite}')
`;
      db.query(query, (err, result) => {
        if (err) {
          console.log("Error sql :", err);

          res.status(500).json({
            error: "Erreur lors de la création du job",
            details: err.message,
          });
        } else {
          res.status(201).json({
            message: "job créé avec succès",
            userId: result.insertId,
          });
        }
      });
    });
  });
};

exports.allJobs = (req, res) => {
  const query = "SELECT * FROM Jobs";
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error sql :", err);

      res.status(500).json({
        error: "Erreur lors de l'affichage des jobs",
        details: err.message,
      });
    } else {
      res.status(200).json({
        message: "Success !",
        jobs: result,
      });
    }
  });
};

exports.recruteurOfTheJob = (req, res) => {
  const query = "SELECT Jobs.recruteur_id, Recruteurs.recruteur_id, Recruteurs.titre, logo_img, background_img, email FROM Recruteurs JOIN Jobs ON Jobs.recruteur_id = Recruteurs.recruteur_id";
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error sql :", err);

      res.status(500).json({ 
        error: "Erreur lors de l'affichage des jobs",
        details: err.message,
      });
    } else {
      res.status(200).json({
        message: "Success ! ",
        recruteurs: result,
      });
    }
  });
};

exports.getJobbyId = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Jobs WHERE job_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.log(err);
      
      res.status(500).json({
        error:
          "Erreur de la récuperation de tous les utilisateurs de la platefrome",
      });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.deleteJob = (req, res) => {
  const { job_id } = req.body;
    const deleteJob = `
      DELETE FROM Jobs 
      WHERE user_id = ${job_id}
    `;

    db.query(deleteJob, (err, results) => {
      if (err) {
        res.status(500).json({
          error: "Erreur lors de la suppression du job",
        });
      } else {
        res.status(200).json(results);
      }
    });
};