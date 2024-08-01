const mongoose = require('mongoose')

const db = async() => {
    mongoose.connect("mongodb+srv://bhanupratap352000:Bhanu12225@cluster0.zeskgan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/quizzie;")
    .then(()=>console.log("db is connected"))
    .catch(()=>console.log("db connection failed"))
}

module.exports = db;