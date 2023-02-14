import mongoose, { Document, model, models, Model, Schema } from 'mongoose'
import db from '../utils/db'

export interface IService extends Document {
  name: string
  executer: string
  api_key: string
  bodyField: string
  responseField: string
}

const ServiceSchema: Schema = new Schema(
  {
    name: String,
    executer: String,
    api_key: String,
    bodyField: String,
    responseField: String,
  },
  {
    collection: 'services',
    timestamps: true,
  }
)

export const Service: Model<IService> =
  models.Service || model<IService>('Service', ServiceSchema)

export async function createService(service: IService) {
  await db
  return Service.create(service)
}

export async function updateService(service: IService) {
  await db
  return Service.updateOne({ _id: service._id }, service)
}

export async function getServices() {
  await db
  return Service.find({}).sort({ createdAt: -1 })
}

export async function deleteService(serviceId: string) {
  await db
  return Service.deleteOne({ _id: serviceId })
}
