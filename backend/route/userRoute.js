const express=require('express');
const router=express.Router();
const {createUser,loginUser} = require('../controllers/userController');




  router.post('/signUp',createUser);
  router.post('/login',loginUser);

    router.get('/test',(req,res)=>{
    console.log('Test Api successfully');

    })


module.exports=router;