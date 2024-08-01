const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../middelwares/authenticate')
const User = require('../Models/User');
const Form = require('../Models/Form');
const nodemailer = require('nodemailer');
const multer = require('multer');
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
    pass: "nlgz smqk uewp jkxr",
  },
});
router.get('/getbyiduser/:userId', (req, res) => {
    const userId = req.params.userId;
    Form.find({ user: userId }).populate(['user'])
      .then(forms => {
        if (!forms || forms.length === 0) {
          return res.status(404).json({ message: 'forms not found for this user' });
        }
        res.json(forms);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });
router.post('/ajouter', upload.any('piecejointe') ,async (req, res) => {
    try {
        
      const Formbody = req.body;
      const filename = req.files.length > 0 ? req.files[0].filename : null; // Get the uploaded file's filename
      const form = new Form(Formbody);
      form.piecejointe=filename;
      const data = await form.save();
      await sendEmailNotification(data, req.files[0]);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  async function sendEmailNotification(data, file) {
    const user = await User.findById(data.user);
    const userEmail = user.email;
    const info = await transporter.sendMail({
      from: 'mouhadje@gmail.com',
      to: userEmail,
      subject: "Reclamation",
      html: `
        <p>Bonjour,</p>
        <p>Veuillez Consulter votre Reclamation :</p>
        <p><strong>User :</strong> ${data.user}</p>
        <p><strong>Name :</strong> ${data.name}</p>
        <p><strong>Serie :</strong> ${data.Serie}</p>
        <p><strong>Description :</strong> ${data.description}</p>
        
      `,
      attachments: file ? [{
        filename: file.originalname,
        path: file.path
      }] : []
    });
  
    console.log("Message sent: %s", info.messageId);
  }
  router.get('/all',(req, res) => {
    Form.find().populate(['user']).then(
    (data) => {
      res.send(data);
    },
    (err) => {
      res.send(err);
    }
  );
});

router.put('/update/:id/:status', async (req, res) => {
  try {
      const formClaimId = req.params.id;
      const  status  = req.params.status;
      console.log(status)

      // Validate status
      if (!['PENDING', 'APPROVED', 'REJECTED', 'RESOLVED'].includes(status)) {
          return res.status(400).json({ success: false, message: 'Invalid status' });
      }

      const updatedFormClaim = await Form.findByIdAndUpdate(formClaimId, { status }, { new: true });
      const form=await Form.findById(formClaimId);
      // Send email to admin
      const mailOptions = {
          from: process.env.ADMIN_EMAIL,
          to: "hamzamekni4@gmail.com",
          subject: `Updated the status of you'r form to : ${status}`,
          text: `
              The form has been Updated:

              Name: ${form.name}
              User: ${form.user}
              Description: ${form.description}
              Serie: ${form.Serie}
              piecejointe: ${form.piecejointe}
              Status: ${status}
          `
      };

       transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
              return res.status(404).json({ success: false, message: 'Form claim not found' });
          }
          res.status(200).json({ success: true, data: updatedFormClaim });
      });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;