const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Création d'un nouvel utilisateur sur la plateforme
exports.createUser = (req, res) => {
  // const emailExist = "SELECT * FROM Users WHERE email = 'mwnslgt@gmail.com'";
  const { name, lastname, email, password, age, phone, localisation } =
    req.body;
  const emailExist = "SELECT * FROM Users WHERE email = ?";

  db.connect(function (err) {
    console.log(db);
    if (err) {
      res.status(500).json({
        error: "Erreur de connexion à la base de données",
      });
      return;
    }
    db.query(emailExist, [email], (err, result) => {
      if (err) {
        res.status(500).json({
          error: "Erreur lors de la recherche de l'utilisateur",
        });
      }
      if (result.length > 0) {
        return res.status(400).json({ error: "L'utilisateur existe déjà" });
      }
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Erreur lors du hachage du mot de passe" });
        }
        const query =
          "INSERT INTO Users (name, lastname, email, password, age, phone, localisation) VALUES (?, ?, ?, ?, ?, ?, ?)";
        // const query = `INSERT INTO Users (user_id, name, lastname, email, password, age, phone, localisation) VALUES (1, 'Mawen', 'Salignat-Moandal', 'mwnslgt@gmail.com', '${hash}', 25, '0646122007', 'Paris')`;
        db.query(
          query,
          [name, lastname, email, hash, age, phone, localisation],
          (err, result) => {
            if (err) {
              console.error("Erreur SQL:", err);
              res.status(500).json({
                error: "Erreur lors de la création de l'utilisateur",
              });
            } else {
              res.status(201).json({
                message: "Utilisateur créé avec succès",
                userId: result.insertId,
              });
            }
          }
        );
      });
    });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  // const email = "mickael1.lesueur@epitech.eu";
  // const password = "Leackim77";

  db.connect(function (err) {
    if (err) {
      res.status(500).json({
        error: "Erreur de connexion à la base de données",
      });
      return;
    }
    const emailExist = "SELECT * FROM Users WHERE email = ?";
    db.query(emailExist, [email], (err, result) => {
      if (err) {
        return res.status(500).json({
          error: "Erreur lors de la recherche de l'utilisateur",
        });
      }

      if (result.length === 0) {
        return res.status(400).json({ error: "L'utilisateur n'existe pas" });
      }
      const user = result[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la vérification du mot de passe" });
        }
        if (!isMatch) {
          return res.status(401).json({ error: "Mot de passe incorrect" });
        }
        // Créer un token JWT
        const token = jwt.sign(
          { userId: user.user_id, email: user.email },
          "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          { expiresIn: "1h" }
        );
        return res
          .status(200)
          .json({ message: "Connexion réussie", token: token });
      });
    });
  });
};

// Recupération d'un utilisateur
exports.getUserbyId = (req, res) => {
  const { email } = req.query;
  const queryByEmail = `SELECT user_id FROM Users WHERE email = '${email}'`;

  db.query(queryByEmail, (err, results) => {
    if (err) {
      throw err;
    }
    const value = results[0].user_id;
    const queryAllUser = `SELECT * FROM Users WHERE user_id = ${value} `;

    db.query(queryAllUser, (err, results) => {
      if (err) {
        res.status(500).json({
          error: "Erreur de selection de l'utilisateur",
        });
      } else {
        res.status(200).json({
          message: "job affiché avec succès",
          users: results,
        });
      }
    });
  });
};

exports.updateUserNoAdmin = (req, res) => {
  const { email, phone, localisation } = req.body; // Récupérer les données du corps de la requête
  const user_id = req.params.id; // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
  // Utilisation de requêtes préparées pour éviter les injections SQL
  const query = "UPDATE Users SET email = ?, phone = ?, localisation = ? WHERE user_id = ?";
  const values = [email, phone, localisation, user_id];
  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err); // Journaliser l'erreur pour le débogage
      res.status(500).json({
        error: "Erreur de la mise à jour de l'utilisateur de la plateforme",
      });
    } else {
      // Vérifiez si des lignes ont été affectées
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      res.status(200).json(results);
    }
  });
};

exports.updateUser = (req, res) => {
  const {name, lastname, email, age, phone, localisation, isAdmin, user_id } = req.query;

  const query =
    `UPDATE Users SET name = '${name}', lastname = '${lastname}', email = '${email}', age = '${age}', phone = '${phone}', localisation = '${localisation}', isAdmin = ${isAdmin} WHERE user_id = ${user_id}`;
  // const query = "UPDATE Users SET ? WHERE user_id = ?";
  // const data = req.body;
  // const id = req.params.id;
  db.query(query, (err, results) => {
    // db.query(query, [data, id], (err, results) => {
    if (err) {
      console.error(err); // Journaliser l'erreur pour le débogage
      res.status(500).json({
        error: "Erreur de la mise à jour de l'utilisateur de la plateforme",
      });
    } else {
      res.status(200).json({ 
        results: results, 
        message: "Update is done !" });
    }
  });
};


exports.deleteUser = (req, res) => {
  const { user_id } = req.body;
    const deleteUser = `
      DELETE FROM Users 
      WHERE user_id = ${user_id}
    `;

    db.query(deleteUser, (err, results) => {
      if (err) {
        res.status(500).json({
          error: "Erreur lors de la suppression de l'utilisateur",
        });
      } else {
        res.status(200).json(results);
      }
    });
};

exports.allUsers = (req, res) => {
  const query = "SELECT * FROM Users";
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error sql :", err);

      res.status(500).json({
        error: "Erreur lors de l'affichage des jobs",
        details: err.message,
      });
    } else {
      res.status(200).json({
        message: "job affiché avec succès",
        users: result,
      });
    }
  });
};

exports.checkIsAdmin = (req, res) => {
  const { email } = req.query;
  const query = `SELECT isAdmin FROM Users WHERE email = '${email}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error sql :", err);

      res.status(500).json({
        error: "Erreur lors du check admin",
        details: err.message,
      });
    } else {
      res.status(200).json({
        message: "Check admin done",
        user: result,
      });
    }
  });
};