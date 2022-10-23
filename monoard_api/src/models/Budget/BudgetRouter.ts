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

  router.get('/usedSlugs', authenticate([], true), (req, res) => {
    controller.readUsedSlugs(req.session.userId as number)
      .then(slugs => res.send(slugs))
      .catch(e => catchErrors(e, res))
  })

  return router
}
