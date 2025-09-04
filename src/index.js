const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')

const {DbConnection} = require('./config')
const apiRoutes = require('./routes')


const { ProductModel } = require('./models')



const allowedOrigins = [
  "https://navdana.com",
  "https://navdana.com",
  "https://www.navdana.com",
  "https://www.navdana.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.options("*", cors()); // handle preflight

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

app.listen(5000,() => {
    console.log(`Server is listening at PORT ${5000}`)
})


DbConnection.connectDB()