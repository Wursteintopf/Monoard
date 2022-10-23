import { authenticate } from '../../middleware/authenticate'
import { catchErrors } from '../../middleware/catchErrors'
import { baseWithUserRouter } from './../BaseModel/BaseWithUserRouter'
import { MoneyMoveController } from './MoneyMoveController'
import { MoneyMoveModel } from './MoneyMoveModel'

export const moneyMoveRouter = () => {
  const controller = new MoneyMoveController(MoneyMoveModel)

  const router = baseWithUserRouter(
    controller,
    MoneyMoveModel,
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

  return router
}
