const mongoose = require('mongoose')


const noteSchema = mongoose.Schema({
    note:{
      type : String,
      require : true
    },
    subject:{
        type : String,
        require : true
    }
},{
    timestamps : true
})

const Note = mongoose.model("Note" , noteSchema);

module.exports = Note;