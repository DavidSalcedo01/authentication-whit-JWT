import express from 'express'
import { User, UserModel } from '../types/user.type'
import UserService from '../services/user.service'
import boom from '@hapi/boom'

const router = express.Router()
const service = new UserService()

router.post('/', async (req, res, next) => {
  try {
    //TODO: Validate user data coming from the request
    const user: User = req.body
    //delete user.password
    const newUser = await service.create(user)
    res.status(201).json({ user: newUser.toClient() })
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { email } = req.query
    const user = await service.findByEmail(email as string)
    const secureUser = {
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber
    };

    //console.log({ user })

    res.status(200).json({ secureUser })
  } catch (error) {
    next(error)
  }
})

export default router
