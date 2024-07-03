const express = require('express');
const Notes = require('../models/Notes');
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Route:1 for fetching all notes
router.post('/fetchallnotes',fetchuser,
    async (req, res) => {
        try {
            const notes = await Notes.find({user:req.user.id});
            res.json(notes);
        } catch (error) {
            return res.status(500).send("Some error occured");
        }
    })
//Route:2 for adding notes
router.post('/addnotes',fetchuser,[
    body('title','Add a proper title').isLength({min:3}),
    body('description','Add a description').isLength({min:5}),
],async (req,res)=>{
    const error = validationResult(req);
    let success =false
    if(!error.isEmpty()){
        return res.status(400).json({success:success,errors:error.array()});
    }
    try {
        const {title,description,tag}=req.body;
        const note = new Notes({
            title:title,description:description,tag:tag,user:req.user.id
        });
        note.save();
        success=true
        res.json({success:success});
    } catch (error) {
        success=false
        return res.status(500).json({success:success,message:"Some error occured"});
    }
})
//Route:3 for updating notes
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    let success=false
    const{title,description,tag}= req.body;
    const newNote={};
    if(title){newNote.title= title;}
    if(description){newNote.description=description;}
    if(tag){newNote.tag=tag;}
    let note= await Notes.findById(req.params.id) ;
    if(!note){return res.status(404).send("Not Found");}
    if(note.user.toString()!== req.user.id){
       return res.status(401).send("Not Allowed");
    }
    note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    success=true
    res.json({success:success});
})
//Route : 4 for deleting an existing note
router.delete('/deletenode/:id',fetchuser,async (req,res)=>{
    let success=false
    let note= await Notes.findById(req.params.id) ;
    if(!note){return res.status(404).json({success:success,message:"Not Found"});}
    if(note.user.toString()!== req.user.id){
       return res.status(401).json({success:success,message:"Not Allowed"});
    }
    note= await Notes.findByIdAndDelete(req.params.id);
    success=true
    res.json({success:success,message:"Note has been deleted"});
})
module.exports = router;