const mongoose = require("mongoose")

const connectDB = async () => {

    try{

        await mongoose.connect("mongodb+srv://cuong:cuong@cluster0.mc5n4.mongodb.net/userdb")

        console.log("MongoDB Connected")

    }catch(err){

        console.log(err)
        process.exit(1)

    }

}

module.exports = connectDB