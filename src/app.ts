import express from 'express'
import mongoose from 'mongoose'
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler'
import routerApi from './routes'
import { config } from './config/config'
import passport from 'passport'
import cors from 'cors'
import './utils/auth'
import { Category } from './types/category.type'
import CategoryService from './services/category.service'
import { Bicycle } from './types/bicycles.type'
import BicycleService from './services/bicycles.service'
const bicycleServiceInstance  = new BicycleService()
const categoryServiceInstance  = new CategoryService()
const { mongoUri, port } = config

const app = express()
app.use(express.json())
app.use(cors())
const connectDB = () => {
  mongoose.connect(mongoUri)
}

app.use(passport.initialize())
routerApi(app)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  connectDB()
})

app.post('/category', async (req, res) => {
  const category: Category = req.body

  const newCategory = await categoryServiceInstance .create(category)
  res.status(201).json(newCategory)
})

app.get('/category', async (req, res) => {

  const categories = await categoryServiceInstance.findAll()
  res.status(200).json(categories)

})

app.post('/bicycle', async (req, res) => {
  const bicycle: Bicycle = req.body

  const newBicycle = await bicycleServiceInstance.create(bicycle)
  res.status(201).json(newBicycle)
})

app.get('/bicycle', async (req, res) => {

  const bicycles = await bicycleServiceInstance.findAll()
  res.status(200).json(bicycles)

})


app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
