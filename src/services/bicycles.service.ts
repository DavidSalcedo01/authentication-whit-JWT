import Bicycles from '../models/bicycle.model'
import { Bicycle, BicyclesModel } from '../types/bicycles.type'
import boom from '@hapi/boom'

class BicycleService {
  async create(bicycle: Bicycle) {
    const newBicycle = await Bicycles.create(bicycle).catch((error) => {
      console.log('Could not save bicycle', error)
    })

    return newBicycle
  }

  async findAll() {
    const bicycles = await Bicycles.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!bicycles) {
      throw boom.notFound('There are not categories')
    }

    return bicycles
  }

  async findById(id: string) {
    const bicycle = await Bicycles.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!bicycle) {
      throw boom.notFound('Category not found')
    }

    return bicycle
  }

  async findByName(name: string) {
    const bicycle = await Bicycles.findOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!bicycle) {
      throw boom.notFound('Category not found')
    }
  }
}

export default BicycleService