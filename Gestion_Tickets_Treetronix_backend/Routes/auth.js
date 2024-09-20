const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../Models/User');

const router = express.Router();


router.post('/register',async (req,res)=>{
    try {
    
        const userq=req.body;
        const user = new User(userq);
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.get('/all',(req, res) => {
  User.find().then(
  (data) => {
    res.send(data);
  },
  (err) => {
    res.send(err);
  }
);

});
//user login 
router.post('/login',async (req,res)=>{
   try {
    const {username,password}=req.body;
    const user = await User.findOne({username: username});
    if(!user){
        return res.status(404).send('user not found')
    }
    const isPasswordMatch =await bcrypt.compare(password,user.password);
  if(!isPasswordMatch){
    return res.status(401).send('invalid password')
  }
   const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
   res.send({token:token})
   } catch (err) {
    res.status(400).send(err.message)
   }
});
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({ Roles: 'User' });
    res.json(users);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.deleteOne({ _id: userId, Roles: 'User' });
    if (deletedUser.deletedCount === 1) {
      res.json({ message: 'Utilisateur supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Aucun utilisateur avec ce rôle trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json({role: user.Roles });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  router.get('/userbyid/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
});

 

module.exports = router;