const mongoose = require('mongoose')


const subjectSchema = mongoose.Schema({
    subject:{
      type : String,
      require : true
    },
    color:{
        type : String,
        require : true
    }
})

const Subject = mongoose.model("Subject" , subjectSchema);

module.exports = Subject;