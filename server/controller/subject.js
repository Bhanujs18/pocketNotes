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

    console.log(newSubject)
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
        console.log(response)
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

module.exports = {addSubject , getSubjects , addNote , getNotes}