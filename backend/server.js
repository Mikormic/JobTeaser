const express = require('express'); 
const dotenv = require('dotenv');  // Package pour récuperer les informations dans le .env 
const connection = require('./config/database'); // Importer la connexion avec la database
const cors = require('cors')
const router = express.Router() // Express Router 

const userController = require('./controllers/userControllers');
const recruteurController = require('./controllers/recruteursController');
const jobController = require('./controllers/jobController');
const applicationController = require('./controllers/applicationController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello Job Portal')
  })

  // User Controller 
app.get('/isAdmin', userController.checkIsAdmin)
app.get('/users', userController.allUsers)
app.post('/registerUser', userController.createUser);
app.get('/user', userController.getUserbyId);
app.post('/loginUser', userController.loginUser);
app.put('/updateUserNoAdmin/:id', userController.updateUserNoAdmin);
app.put('/updateUser', userController.updateUser);
app.delete('/deleteUser', userController.deleteUser);



//Job Controller 
app.post('/createJob', jobController.createJob);
app.get('/jobs', jobController.allJobs);
app.get('/job/:id', jobController.getJobbyId);
app.get('/jobRecruteur', jobController.recruteurOfTheJob);
app.put('/updateJob', recruteurController.updateJob);
app.delete('/deleteJob', recruteurController.deleteJob);


// Recruteur Controller 
app.post('/createRecruteurs', recruteurController.createRecruters);
app.get('/recruteurs', recruteurController.allRecruters);
app.get('/recruteur', recruteurController.jobOfRecruters);
app.put('/updateRecruteur', recruteurController.updateRecruteur);
app.delete('/deleteRecruteur', recruteurController.deleteRecruter);


// application Controller 
app.post('/apply', applicationController.applyJob);
app.get('/apply', applicationController.alreadyApply);

app.listen(PORT,()=>{
    console.log(`Serveur démarré sur le port ${PORT}`)
})

