const mongoose =require('mongoose');

const userSchema= mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim: true
  },
  email:{
    type:String,
    unique:true,
    required:true,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    trim: true
  },
  mobile: {
  type: String,
  required: true,
  match: /^[6-9]\d{9}$/,
  trim: true
  },
  role: {
  type: String,
  enum: ['user', 'admin', 'technician'],
  default: 'user',
  
},
gender:{
  type:String,
  enum:['male','female','other'],
  default:'other'
},
photo: {
  type: String,
  default: () => 'neutral-default.png',
  trim: true
},

password: {
  type: String,
  required: true,
  trim: true
}

},{
  timestamps: true
})

const User=mongoose.model('User',userSchema);

module.exports=User;