const Note = require("../schema/note");
const Subject = require("../schema/subjects");

const addSubject = async (req, res) => {
try {
    const {subjectName , subjectColor , messages} = req.body;

    const newSubject = new Subject({
     subject : subjectName,
     color : subjectColor,
     notes : messages,
    })

    await newSubject.save();
    const response = await Subject.find({});
    res.status(200).json({data : response});
} catch (error) {
    console.log(error)
}
}

const getSubjects = async(req, res) => {
    try {
        const response = await Subject.find({});
        res.status(200).json({data : response});
    } catch (error) {
        console.log(error)
    }
}

const getNotes = async(req, res) => {
    try {
        const response = await Note.find({});
        res.status(200).json({data : response});
    } catch (error) {
        console.log(error)
    }
}

const addNote = async (req, res) => {
    try {
        const {note , subject} = req.body;
    
        const newNote = new Note({
         note,
         subject,
        })
    
        await newNote.save();
    
        res.json({message : req.body})
    } catch (error) {
        console.log(error)
    }
    }

    const fetchNoteById = async (req, res) => {
        const {id} = req.params;
        console.log(id)
       const data = await Note.find({_id :id})
       if(data){
        res.status(200).json({data})
        return;
       }
       res.status(200).json({error : "No data found"})
    }

module.exports = {addSubject , getSubjects , addNote , getNotes , fetchNoteById}