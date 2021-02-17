const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://>User>:<Pswd>@cluster0.acudl.mongodb.net/test?retryWrites=true&w=majority',// corriger adresse si on veut faire fonctionner
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

const bodyParser = require('body-parser'); // Pour extraire l'objet JSON de la demande POST

const stuffRoutes = require('./routes/stuff');

const userRoutes = require('./routes/user');

const path = require('path');


// Middlewares Express

//.use() traite TOUTES les requêtes

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); // On définit la fonction json ( body parser ) comme middleware global pour l'app

app.use('/api/stuff', stuffRoutes);

app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
