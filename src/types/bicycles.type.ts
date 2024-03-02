import type { Model } from 'mongoose'

export type Bicycle = {
    id?: string
    name: string
    description?: string
    dimensions: number
    weight: number
    price: number
}

export type BicyclesModel = Model<Bicycle>