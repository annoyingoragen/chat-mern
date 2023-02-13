const userModel =require( "../models/userModel.js");
// const sendToken =require( "../utils/jwtToken.js");
const bcryptjs =require( "bcrypt");


exports.registerUser=async (req, res)=>{
  try {

    const {username, email, password}=req.body;
    const usernameCheck = await userModel.findOne({ username });
    if (usernameCheck)
      return res.json({ message: "Username already used", success: false });
    const emailCheck = await userModel.findOne({ email });
    if (emailCheck)
      return res.json({ message: "Email already used", success: false });
    const hashedPassword=await bcryptjs.hash(password,10);
    const user=await userModel.create({
      username, email, password:hashedPassword
    });
    delete user.password
    res.status(200).json({
      success: true,
      user,
    });
    

  } catch (error) {
    // console.log(error)
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};


exports.loginUser=async (req, res)=>{
  
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user)
    return res.json({ message: "Invalid Credentials", success: false });
  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid)
    return res.json({ message: "Invalid Credentials", success: false });
  delete user.password;
  res.status(200).json({
    success: true,
    user,
  });
};


exports.logout=async (req, res)=>{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    // httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};


exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const userData = await userModel.findByIdAndUpdate(
      userId,
      {
        
        
        isAvatarImageSet: true,
        avatar:avatarImage,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      isSet: userData.isAvatarImageSet,
      image: userData.avatar,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatar",
      "_id",
    ]);
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};