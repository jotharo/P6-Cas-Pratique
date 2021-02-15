const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({            // nous créons une constante storage , à passer à multer comme configuration, 
                                               // qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants 
  destination: (req, file, callback) => {    //la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images
    callback(null, 'images');
  },
  filename: (req, file, callback) => {            //la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores 
                                            
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];     //Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée

    callback(null, name + Date.now() + '.' + extension); //et d'ajouter un timestamp Date.now() comme nom de fichier. 
  }
});

module.exports = multer({storage: storage}).single('image');  // nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage 
                                                                        //et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.