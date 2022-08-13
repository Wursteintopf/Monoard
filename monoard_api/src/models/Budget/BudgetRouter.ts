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

  router.get('/readInMonth', authenticate([], true), (req, res) => {
    const search: { month: string } = JSON.parse(req.query.search as string)
    controller.readInMonth(req.session.userId as number, new Date(search.month))
      .then(budgets => res.send(budgets))
      .catch(e => catchErrors(e, res))
  })

  return router
}
