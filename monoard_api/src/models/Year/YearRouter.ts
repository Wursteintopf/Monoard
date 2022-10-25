import { authenticate } from '../../middleware/authenticate'
import { catchErrors } from '../../middleware/catchErrors'
import { baseWithUserRouter } from '../BaseModel/BaseWithUserRouter'
import { YearController } from './YearController'
import { YearModel } from './YearModel'

export const yearRouter = () => {
  const controller = new YearController(YearModel)

  const router = baseWithUserRouter(
    controller,
    YearModel,
    {
      createAccess: [],
      readAccess: [],
      updateAccess: [],
      deleteAccess: [],
      createOwn: true,
      readOwn: true,
      updateOwn: true,
      deleteOwn: true,
    },
  )

  router.get('/readActive', authenticate([], true), (req, res) => {
    controller
      .readActiveYear(req.session.userId as number)
      .then(activeYear => res.send(activeYear))
      .catch(e => catchErrors(e, res))
  })

  return router
}
