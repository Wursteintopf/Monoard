import { Nullable } from './../../../data_types/UtilTypes'
import { appDataSource } from './../../config/typeOrmDataSource'
import { EntityNotFoundError, Repository } from 'typeorm'
import { BaseModel } from './BaseModel'

export class BaseController<Model extends BaseModel> {
  protected repository: Repository<Model>
  protected ModelConstructor: new () => Model

  constructor (
    ModelConstructor: new () => Model,
  ) {
    this.ModelConstructor = ModelConstructor
    this.repository = appDataSource.getRepository<Model>(ModelConstructor)
  }

  public async create (params: Nullable<Model>) {
    const model = new this.ModelConstructor()
    model.setAll(params)
    return await this.repository.save(model)
  }

  public async createMultiple (params: Nullable<Model>[]) {
    const models = params.map(param => {
      const model = new this.ModelConstructor()
      model.setAll(param)
      return model
    })
    return await this.repository.save(models)
  }

  public async read (id: number): Promise<Model> {
    const model = await this.repository.findOne({ where: { id: id as any } })
    if (!model) throw new EntityNotFoundError(this.ModelConstructor, '')
    return model
  }

  public async readAll (): Promise<Model[]> {
    return await this.repository.find()
  }

  public async readBy (params: Nullable<Model>): Promise<Model[]> {
    return await this.repository.findBy(params as any)
  }

  public async readOneBy (params: Nullable<Model>): Promise<Model> {
    const model = await this.repository.findOne({ where: params as any })
    if (!model) throw new EntityNotFoundError(this.ModelConstructor, '')
    return model
  }

  public async update (params: Nullable<Model> & { id: number }) {
    const model = await this.read(params.id)
    model.setAll(params)
    await this.repository.save(model)
  }

  public async delete (id: number) {
    await this.repository.delete({ id: id as any })
  }
}
