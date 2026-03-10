const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")

const userRoute = require("./routes/userRoute")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/users",userRoute)

app.listen(3000,()=>{

    console.log("Server running at http://localhost:3000")

})