import { Schema, model } from 'mongoose'
import { Bicycle, BicyclesModel } from '../types/bicycles.type'

const Bicycles = new Schema<Bicycle, BicyclesModel>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    dimensions: {
            type: Number,
            required: true,
            trim: true
    },
    weight: {
            type: Number,
            required: true,
            trim: true
    },
    price: {
            type: Number,
            required: true,
            trim: true
        }
    }) // Add closing parenthesis here

export default model('Bicycles', Bicycles)