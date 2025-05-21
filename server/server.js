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

app.use("/api/auth", require("./routers/authRouter"))
app.use("/api/user", require("./routers/userRouter"))
app.use("/api/address", require("./routers/addressRouter"))
app.use("/api/tourStation", require("./routers/tourStationRouter"))
app.use("/api/tour", require("./routers/tourRouter"))
app.use("/api/userTours", require("./routers/userTourRouter"))

app.get("/getser", (req, res) => {
    res.json("get")
})

mongoose.connection.once('open', () => {
    console.log(`connected to MongoDB`)
    app.listen(PORT, () => console.log(`The server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)

})

