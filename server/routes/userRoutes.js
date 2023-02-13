const Express =require( "express");
const {
      registerUser,
      loginUser,
      setAvatar,
      getAllUsers,

      }=require( "../controllers/userController.js");

const router=Express.Router();


router.route("/register").post( registerUser);
router.route("/login").post( loginUser);
router.route("/setAvatar/:id").post(setAvatar)
router.route("/allusers/:id").get( getAllUsers);


module.exports=router;
