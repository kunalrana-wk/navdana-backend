const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')

const {DbConnection} = require('./config')
const apiRoutes = require('./routes')


const { ProductModel } = require('./models')

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,
}));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use('/api',apiRoutes)

app.get('/',(req,res) => {return res.status(400).json({message:"Successfull Connection"})})

app.get('/test',async(req,res) => { 
    const category = await ProductModel.findById("68a9989cafa8da986fa36127")
    return res.status(200).json({
        success: true,
        data: category
    })
} )

app.listen(3000,() => {
    console.log(`Server is listening at PORT ${4000}`)
})


DbConnection.connectDB()