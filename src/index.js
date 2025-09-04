const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { DbConnection } = require('./config')
const apiRoutes = require('./routes')
const { ProductModel } = require('./models')

const app = express()

// Allowed origins (no duplicates, no trailing slashes)
// const allowedOrigins = [
//   "https://navdana.com",
//   "https://www.navdana.com"
// ]

// CORS middleware
app.use(cors({
  origin: 'https://www.navdana.com',
  credentials: true
}))

// // Preflight requests for all routes
// app.options("*", cors({
//   origin: allowedOrigins,
//   credentials: true
// }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// API routes
app.use('/api', apiRoutes)

// Test routes
app.get('/', (req, res) => {
  return res.status(200).json({ message: "Successful Connection" })
})

app.get('/test', async (req, res) => {
  const category = await ProductModel.findById("68a9989cafa8da986fa36127")
  return res.status(200).json({
    success: true,
    data: category
  })
})

// Start server
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`)
})

// Connect to DB
DbConnection.connectDB()
