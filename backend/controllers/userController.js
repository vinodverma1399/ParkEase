const User=require('../models/User');
const bcrypt = require('bcrypt');
const generateToken=require('../utils/generateToken');

const createUser= async(req,res)=>{
  try {
    const {name,email,mobile,gender,password,role,photo}=req.body;

    const existingUser= await User.findOne({$or:[{email},{mobile}]});
    if(existingUser){
      return res.status(400).json({message:'user mobile no or email already exist'})
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must contain at least 1 capital letter, 1 number, and 1 special character.'
      });
}


    const hashedPassword=await bcrypt.hash(password,10)
    
    const newUser=await new User({name,email,mobile,gender,password:hashedPassword,role,photo});

    await newUser.save();

    res.status(200).json({
      message:'User registered successfully',
      user:{
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        mobile:newUser.mobile,
        gender:newUser.gender,
        role:newUser.role
      }
    })

  } catch (error) {
    
     return res.status(400).json({message:error.message})
  }
}

// login user controller/api

const loginUser = async (req, res) => {
  try {
    const {username,password}=req.body;

    const user= await User.findOne({$or:[{email:username},{mobile:username}]});
    if (!user) {
      return res.status(400).json({message:'user not found try correct user name'})
    }

    const match = await bcrypt.compare(password, user.password);
      if(!match){
        return res.status(401).json({message:'invalid Password try again'})
      }

      const token=await generateToken(user);

      res.status(200).json({
        message:'user login Successfully',
        token,
        user:{
          _id:user._id,
          name:user.name,
          email:user.email,
          mobile:user.mobile,
          gender:user.gender,
          role:user.role,
          photo:user.photo

      
        }
      })
    
  } catch (error) {
    res.status(400).json({message:error.message});
  }
};


module.exports = {
  createUser,
  loginUser
};