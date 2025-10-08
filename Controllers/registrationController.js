import {User} from "../Models/userModel.js"
import {Event} from "../Models/eventModel.js"
import {Registration} from "../Models/registrationModel.js";


const userEventRegister = async (req, res) => {
  try {
    const  userId  = req.user.id;
    const eventId= req.params.eventId;
    console.log(eventId)

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: "User or Event not found" });
    }

    if (user.registeredEvents.includes(eventId)) {
      return res.status(400).json({ message: "User already registered for this event" });
    }

    if (event.registrations.includes(userId)) {
      return res.status(400).json({ message: "Event already has this user registered" });
    }


    const newRegister = await Registration.create({
      UserId:userId,
      eventId
    })

    user.registeredEvents.push(eventId);

    
    event.registrations.push(userId);

    await user.save();
    await event.save();

    res.status(200).json({
      success: true,
      message: "User registered for event successfully",
      data: {ticktId:newRegister._id}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const allEnrolledUsers=async(req,res)=>{
  const eventId=req.params.eventId;

  try{
    if(!eventId){
      return res.status(400).json({success:false,message:"EventId is missing"});
    }
    const event = await Event.findById(eventId).populate("registrations","_id");

    return res.status(200).json({success:true,data:event.registrations});
  }catch(error){
    return res.json({success:false,message:error.message});
  }
};


const removeUser=async(req,res)=>{
  try {
    const userId = req.params.userId;  
    const eventId = req.body.id;   

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ success: false, message: "User or Event not found" });
    }

    // Remove user from event registrations
    event.registrations = event.registrations.filter(
      (id) => id.toString() !== userId
    );

    // Remove event from user's registered events
    user.registeredEvents = user.registeredEvents.filter(
      (id) => id.toString() !== eventId
    );

    await user.save();
    await event.save();

    res.status(200).json({
      success: true,
      message: "User successfully unregistered from event",
    });
  } catch (error) {
   
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



const isEnrolled = async (req, res) => {
  try {
    const {ticketId} = req.body;
    if(!ticketId)return res.status(404).json({success:false,message:"Ticket is not provided."});

    const ticket = await Registration.findOne({_id:ticketId}).populate("eventId","title");

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found." });
    }

    if (!ticket.eventId) {
      return res.status(404).json({ success: false, message: "Event not found for this ticket." });
    }

    const eventTitle = ticket.eventId.title;

    return res.status(200).json({ success: true, data: eventTitle });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export {userEventRegister,allEnrolledUsers,removeUser,isEnrolled};