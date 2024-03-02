import Bicycles from '../models/bicycle.model'
import { Bicycle, BicyclesModel } from '../types/bicycles.type'
import boom from '@hapi/boom'

class BicycleService {
  async create(category: Bicycle) {
    const newCategory = await Bicycles.create(category).catch((error) => {
      console.log('Could not save category', error)
    })

    return newCategory
  }

  async findAll() {
    const categories = await Bicycles.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!categories) {
      throw boom.notFound('There are not categories')
    }

    return categories
  }

  async findById(id: string) {
    const category = await Bicycles.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!category) {
      throw boom.notFound('Category not found')
    }

    return category
  }

  async findByName(name: string) {
    const category = await Bicycles.findOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!category) {
      throw boom.notFound('Category not found')
    }
  }
}

export default BicycleService