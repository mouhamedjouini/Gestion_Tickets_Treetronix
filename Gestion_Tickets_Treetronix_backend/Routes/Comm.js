const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../middelwares/authenticate')
const User = require('../Models/User');
const Comm = require('../Models/Comm');
const form = require('../Models/Form');
const res = require('express/lib/response');
const nodemailer = require('nodemailer');
const multer = require('multer');
const Form = require('../Models/Form');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
filename = '';

const storage1 = multer.diskStorage(
    {
    destination : './upload',
    filename: function(req, file, cb){
        date = Date.now();
        filename = date + '.' + file.mimetype.split('/')[1]
        cb(null, filename);
       

    },
    }
);
const upload =  multer ({storage: storage1});
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "mouhadje@gmail.com",
    pass: "yfeo xzwn bckt kujc",
  },
});


router.post('/ajouter', upload.any('piecejointe') ,async (req, res) => {
    try {
      
      
      // Création d'un nouveau commentaire
      let commfrombody = req.body;
      const filename = req.files.length > 0 ? req.files[0].filename : null; 
      let comm = new Comm(commfrombody);
      comm.piecejointe=filename;
      const data = await comm.save();
      await sendEmailNotification(data, req.files[0]);

  console.log(data)
  
      res.send(data);
  
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Erreur interne du serveur.' });
    }
  });
  
  async function sendEmailNotification(comm, file) {
    try {
        
        const user = await User.findById(comm.user);
      
     
        const form = await Form.findById(comm.form);
        const status = form.status;
        const user3 = await User.findById(form.user);
        const userEmail = user3.email;
        const role = user3.Roles
        let recipients = [];

    
        if (role === 'Admin') { 
            recipients = [userEmail]; 
            console.log('User :', userEmail, recipients);
        } 
      
        else if (role === 'User') { 
            const admins = await User.find({ Roles: 'Admin' }); 
            if (admins.length > 0) {
                recipients = admins.map(admin => admin.email); 
            }
            console.log('Admin :', userEmail, recipients);
        }
       
     
        const info = await transporter.sendMail({
            from: '<mouhadje@gmail.com>',
            to: recipients.join(','),
            subject: "Suivi de votre réclamation",
            html: `
                <p>Bonjour ${user3.username},</p>
                <p>Nous vous informons que votre réclamation est ${status}. Voici les détails :</p>
                <ul>
                    <li><strong>Description de la suivi de réclamation :</strong> ${comm.description}</li>
                    <li><strongDate de soumission :</strong> ${comm.Date ? comm.Date.toLocaleDateString() : 'Non spécifiée'}</li>
                </ul>
                <p>Nous vous tiendrons informé de toute évolution concernant votre réclamation.</p>
                <p>Merci de votre patience.</p>
            `,
            attachments: file ? [{
                filename: file.originalname,
                path: file.path
            }] : []
        });

        console.log("Message envoyé: %s", info.messageId);
    } catch (error) {
        console.error("Erreur lors de l'envoi de la notification par e-mail :", error);
        throw error; // Relancer l'erreur pour la gérer dans le bloc try...catch de l'appelant
    }
}

  
router.get('/getall',(req,res)=>{
    Comm.find().populate(['user','form']).then(
         (data)=>{
            console.log(data);
             res.send(data);
         },
         (err)=>{res.send(err);
         }
     )
     
 });
 router.delete('/delete/:id',(req,res)=>{
    let id =req.params.id;
    Comm.findByIdAndDelete({_id:id}).then(
        (deleted)=>{
            res.send(deleted);
        },
        (err)=>{
            res.send(err);
        }
    );
    
});
router.get('/getcommbyidform/:formId', (req, res) => {
    const formId = req.params.formId;
    Comm.find({ form: formId }).populate(['user','form'])
      .then((data)=>{
        console.log(data);
         res.send(data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });
module.exports = router;