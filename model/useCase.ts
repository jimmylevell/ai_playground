import { IService } from "./Service"

export interface IUseCase {
  service: IService
  body: any
}
