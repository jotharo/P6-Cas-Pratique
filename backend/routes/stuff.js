// in routes/stuff.js


// Fichier qui va contenir la logique des routes 

//Nous créons un routeur Express. Jusqu'à présent, nous avions enregistré nos routes directement dans notre application. 
//Maintenant, nous allons les enregistrer dans notre routeur Express, puis enregistrer celui-ci dans l'application.


// Il est évident quelles routes sont disponibles à quels points de terminaison, 
//et les noms descriptifs donnés aux fonctions de notre contrôleur permettent de mieux comprendre la fonction de chaque route.

const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllStuff);
//L'ordre des middlewares est important ! Si nous devons placer multer avant le middleware d'authentification, 
//même les images des requêtes non authentifiées seront enregistrées dans le serveur. Veillez à placer multer après auth !
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;

