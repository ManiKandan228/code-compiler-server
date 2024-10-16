const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DB_URL)
    const db=mongoose.connection
    db.on('error',(errorMessage)=>console.log(errorMessage))
    db.once('open',()=>console.log('Connected to db successfully'))
};

module.exports = connectDB;
