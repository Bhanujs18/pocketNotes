const express = require('express')
const router = express.Router();
const subjectController = require('../controller/subject')

router.post("/addSubject" , subjectController.addSubject)
router.get("/getSubjects" , subjectController.getSubjects)


router.post("/saveNote" , subjectController.addNote)
router.get("/getNotes" , subjectController.getNotes)
router.get("/getNoteById/:id" , subjectController.fetchNoteById)

module.exports = router;