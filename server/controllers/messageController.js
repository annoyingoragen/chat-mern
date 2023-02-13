const messageModel =require( "../models/messageModel.js");


exports.addMessage=async (req, res)=>{
  try {
   
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    
  
   
      if (data) return res.status(200).json({
      success: true,
      message:"Message added successfully.",
    });
    else return res.json({ message: "Failed to add message to the database" });
    

  } catch (error) {
    // console.log(error)
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};


exports.getAllMessages=async (req, res)=>{
  
  try{
    
    const { from, to } = req.body;

    const messages = await messageModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.status(200).json({
        success: true,
        projectedMessages
      });
  }
  catch(error){
    return res.status(400).json({
        success: false,
        message: error,
      });
  }
 
};
