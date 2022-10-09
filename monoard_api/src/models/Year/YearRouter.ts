import { Role } from '../../../data_types/Role'
import { baseWithUserRouter } from '../BaseModel/BaseWithUserRouter'
import { YearController } from './YearController'
import { YearModel } from './YearModel'

export const yearRouter = () => {
  const controller = new YearController(YearModel)

  const router = baseWithUserRouter(
    controller,
    YearModel,
    {
      createAccess: [Role.UNAUTHENTICATED],
      readAccess: [Role.UNAUTHENTICATED],
      updateAccess: [Role.UNAUTHENTICATED],
      deleteAccess: [],
      createOwn: true,
      readOwn: true,
      updateOwn: true,
      deleteOwn: true,
    },
  )

  router.get('/deactivateYear', async (req, res) => {
    await controller.deactivateYear(1)
    res.send('Done')
  })

  return router
}
