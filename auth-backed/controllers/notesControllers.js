const Note = require("../models/Notes");

exports.createNote= async(req,res)=>{
    try{
        const {title,content} = req.body;
        const note = new Note({
            title,
            content,
            user:req.user.id,
        });

        const savedNote = await note.save();
        res.status(201).json(savedNote);

    }catch(error){
        res.status(500).json({error:error.message});
    }
};


//get user notes

exports.getNotes = async(req,res)=>{
    try{
        const notes = await Note.find({
            user:req.user.id,
        });
        res.json(notes);
    }catch(error){
        res.status(500).json({error:error.message});
    }

};

exports.deleteNote = async (req,res)=>{
    try{
        const note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).json({
                error:"Note not found",
            });
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).json({
                error:"Not authorized"
            })
        }

        await note.deleteOne();
        res.json({message:"Note deleted successfully"});
    }catch(error){
        res.status(500).json({error:error.message});
    
    }
};

