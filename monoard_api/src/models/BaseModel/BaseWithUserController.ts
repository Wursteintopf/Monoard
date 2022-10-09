import { EntityNotFoundError } from 'typeorm'
import { BaseController } from './BaseController'
import { BaseUserModel } from './BaseUserModel'
import { BaseWithUserModel } from './BaseWithUserModel'

export class BaseWithUserController<Model extends BaseWithUserModel> extends BaseController<Model> {
  public async createOwn (params: Partial<Model>, userId: number) {
    const model = new this.ModelConstructor()
    model.set(params)
    model.user = userId as unknown as BaseUserModel
    await this.repository.save(model)
  }

  public async createMultipleOwn (params: Partial<Model>[], userId: number) {
    const models = params.map(param => {
      const model = new this.ModelConstructor()
      model.set(param)
      model.user = userId as unknown as BaseUserModel
      return model
    })
    return await this.repository.save(models)
  }

  public async readOwn (id: number, userId: number): Promise<Model> {
    const model = await this.repository.findOne({ where: { id, user: { id: userId } } as any, relations: ['user'] })
    if (!model) throw new EntityNotFoundError(this.ModelConstructor, '')
    return { ...model, user: undefined }
  }
  
  public async readAllOwn (userId: number): Promise<Model[]> {
    const models = await this.repository.find({ where: { user: { id: userId } } as any, relations: ['user'] })
    return models.map(model => ({ ...model, user: undefined }))
  }
  
  public async readByOwn (params: Partial<Model>, userId: number): Promise<Model[]> {
    const models = await this.repository.find({ where: { user: { id: userId }, ...params } as any, relations: ['user'] })
    return models.map(model => ({ ...model, user: undefined }))
  }
  
  public async readOneByOwn (params: Partial<Model>, userId: number): Promise<Model> {
    const model = await this.repository.findOne({ where: { user: { id: userId }, ...params } as any, relations: ['user'] })
    if (!model) throw new EntityNotFoundError(this.ModelConstructor, '')
    return new this.ModelConstructor().set({ ...model, user: undefined })
  }
  
  public async updateOwn (params: Partial<Model> & { id: number }, userId: number) {
    const model = await this.read(params.id)
    model.set(params)
    model.user = userId as unknown as BaseUserModel
    await this.repository.save(model)
  }
  
  public async deleteOwn (id: number, userId: number) {
    await this.repository.delete({ id, user: { id: userId } } as any)
  }
}
