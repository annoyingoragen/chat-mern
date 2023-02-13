const mongoose =require( "mongoose");
// const validator =require( "validator");

// const jsonwebtoken =require( "jsonwebtoken");
// const crypto =require( "crypto");
// eslint-disable-next-line new-cap
const userSchema=mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
    unique:true
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],

  },
  isAvatarImageSet:{
    type:Boolean,
    default:false
  },
  avatar: {
    
      type: String,
      default: "",
    
  },
});
module.exports= mongoose.model("User", userSchema);
