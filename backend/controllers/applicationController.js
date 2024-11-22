const db = require("../config/database");

// Postuler
exports.applyJob = (req, res) => {
  db.connect(function (err) {
    if (err) {
      res.status(500).json({
        error: "Erreur de connexion à la base de données",
      });
      return;
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
    const { email, job_id } = req.query;
    const emailSelect = `SELECT user_id FROM Users WHERE email = '${email}'`;
    db.query(emailSelect, (err, results) => {
      if (err) throw err;
      const value = results[0].user_id;
      const check = `SELECT job_id FROM Applications WHERE user_id = ${value}`;
      db.query(check, (err, result) => {
        if (err) {
          return res.status(500).json({
            error: "Erreur lors de la recherche de l'id",
          });
        }
        let i = 0;
        while (i < result.length) {
          if (result[i].job_id == job_id) {
            return res.status(400).json({ error: "Job is already apply" });
          }
          i += 1;
        }
        const query = `INSERT INTO Applications (user_id, job_id, date_application) VALUES (${value}, ${job_id}, '${date}')`;
        db.query(query, (err, result) => {
          if (err) throw err;
          else {
            res.status(201).json({
              result: result,
              message: "Apply success",
            });
          }
        });
      });
    });
  });
};

//  cette méthode sera utilisé pour faire le changement entre le bouton apply et le message "déjà apply"
exports.alreadyApply = (req, res) => {
  const { email, job_id } = req.query;
  const emailSelect = `SELECT user_id FROM Users WHERE email = '${email}'`;
  db.query(emailSelect, (err, results) => {
    if (err) throw err;
    const value = results[0].user_id;
    const check = `SELECT job_id FROM Applications WHERE user_id = ${value}`;
    db.query(check, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: "Erreur lors de la recherche de l'id",
        });
      }
      let i = 0;
      while (i < result.length) {
        if (result[i].job_id == job_id) {
          return res.status(400).json({ error: "Job is already apply" });
        }
        i += 1;
      }
      res.status(201).json({
        result: result,
        message: "Not apply",
      });
    });
  });
};
