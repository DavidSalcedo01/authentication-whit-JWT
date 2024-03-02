import express from 'express'
import { Bicycle } from '../types/bicycles.type'
import BicycleService from '../services/bicycles.service'
import passport from 'passport'
import { UserRequestType } from '../types/user.type'

const router = express.Router()
const service = new BicycleService()

router.post(
  '/bicycle',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const bicycle: Bicycle = req.body
    const newBicycle = await service.create(bicycle)

    res.status(201).json(newBicycle)
  }
)

router.get(
  '/bicycle',
  passport.authenticate('jwt', { session: false }),
  async (req: UserRequestType, res, next) => {
    try {
      const { user } = req
      //console.log(user)
      const bicycle = await service.findAll()
      res.status(200).json(bicycle)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/bicycle/:name',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const bicycle = await service.findById(req.params.name)
      res.status(200).json(bicycle)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/bicycle',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const bicycle = await service.findById(req.query.name as string)
      res.status(200).json(bicycle)
    } catch (error) {
      next(error)
    }
  }
)

export default router