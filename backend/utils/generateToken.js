const jwt=require('jsonwebtoken');

const generateToken=async (user)=>{
  const token=jwt.sign(
    {_id:user._id,
      name:user.name,
      mobile:user.mobile,
      role:user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn:'1d',}

  )

  return token;
}

module.exports=generateToken;