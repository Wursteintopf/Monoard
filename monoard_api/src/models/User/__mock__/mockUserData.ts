import { UserModel } from '../UserModel'
import { Role } from '../../../../data_types/Role'
import { appDataSource } from '../../../config/typeOrmDataSource'

export const getMockUsers = async () => {
  const repository = appDataSource.getRepository<UserModel>(UserModel)

  const mockUsers = {
    user: new UserModel().set({
      id: 1,
      username: 'user',
      password: 'password',
      role: Role.USER,
      salt: 'salt',
    }),
  }

  await Promise.all(Object.values(mockUsers).map(user => repository.save(user)))
  return mockUsers
}
