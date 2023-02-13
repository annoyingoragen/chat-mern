const Express =require( "express");
const {
     addMessage,
     getAllMessages,

      }=require( "../controllers/messageController.js");

const router=Express.Router();


router.route("/addmsg").post( addMessage);
router.route("/getmsg").post( getAllMessages);




module.exports=router;
