import {Event} from "../Models/eventModel.js";

const registerEvent = async(req,res) =>{
    
    try{
        const {title,description,date,time,location,capacity} = req.body;

        const organizerId = req.user.id;

        const event = await Event.findOne({title,organizerId});

        if(event) return res.status(400).json({message:"Event already registered"});

        const newEvent = new Event({
            title,
            description,
            date,
            time,
            location,
            organizerId,
            capacity
        });
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent }); res.status(201).json({ message: "Event created successfully", event: newEvent });



    }catch(error){
        console.log("Event registration Error");
        res.json({status:false,message:error.message})
    }
};


const getEventStatus=(event)=>{
    const eventDateTime = new Date(`${event.date}T${event.time}`);
    const now = new Date();

    if(now<eventDateTime) return "upcoming";
    if(now.toDateString()===eventDateTime.toDateString()) return "ongoing";
    return "completed";

};


const showAllEvents = async(req,res)=>{
        try{
            const events = await Event.find({});
            if(!events) return res.json({success:true,message:"No events are registered"});
            
            const eventsWithStatus = events.map(event=>({
                ...event.toObject(),
                status:getEventStatus(event)
            }));
            return res.json({
                success:true,
                data:events,
            })
        }catch(error){
            console.log("cant get the users error");
            return res.json({success:false,message:error.message});
        }
};


const deleteEvent =async(req,res)=>{
    try {
        const event = await Event.findOneAndDelete({title:req.body.title});

        if(!event) return res.json({success:true,message:"No event found"});

        return res.json({message:"Deleted Successful"});
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}


export {registerEvent,showAllEvents,deleteEvent};