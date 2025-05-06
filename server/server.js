require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")

const app = express()
const PORT = process.env.PORT || 6666
connectDB()

app.use(express.json())
app.use(express.static("public"))
app.use(cors())

<<<<<<< HEAD
app.use("/user",require("./routers/userRouter"))
app.use("/tourRouter",require("./routers/tourRouter"))
app.use("/tourStationRouter",require("./routers/tourStationRouter"))
=======
app.use("/tour", require("./routers/tourRouter"))
app.use("/tourStation", require("./routers/tourStationRouter"))
app.use("/user", require("./routers/userRouter"))
>>>>>>> f8c50ae5c67550baff014511b60aaf05fbacc630

app.get("/getser",(req,res) => {
res.json("get")
})
mongoose.connection.once('open', () => {
    console.log(`connected to MongoDB`)
    app.listen(PORT, () => console.log(`The server running on port ${PORT}`))
})


mongoose.connection.on('error', err => {
    console.log(err)

})

