import { authenticate } from '../../middleware/authenticate'
import { catchErrors } from '../../middleware/catchErrors'
import { baseWithUserRouter } from './../BaseModel/BaseWithUserRouter'
import { BudgetController } from './BudgetController'
import { BudgetModel } from './BudgetModel'

export const budgetRouter = () => {
  const controller = new BudgetController(BudgetModel)

  const router = baseWithUserRouter(
    controller,
    BudgetModel,
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
