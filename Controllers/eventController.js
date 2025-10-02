import {Event} from "../Models/eventModel.js";

const registerEvent = async(req,res) =>{
    
    try{
        const {title,description,date,time,location,capacity} = req.body;

        const organizerId = req.user.id;
        console.log(organizerId);

        const event = await Event.findOne({title,organizerId});

        if(event) return res.status(400).json({message:"Event already registered"});

        const newEvent = Event.create({
            title,
            description,
            date,
            time,
            location,
            capacity
        });
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent }); res.status(201).json({ message: "Event created successfully", event: newEvent });



    }catch(error){
        console.log("Event registration Error");
        res.json({status:false,message:error.message})
    }
} 
export {registerEvent};