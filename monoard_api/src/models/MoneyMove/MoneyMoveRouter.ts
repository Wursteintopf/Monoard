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

  router.get('/readByBankAccountInRange', authenticate([], true), (req, res) => {
    const search: { slug: string, from: string, to: string } = JSON.parse(req.query.search as string)
    controller.readByBankAccountInRange(search.slug, req.session.userId as number, new Date(search.from), new Date(search.to))
      .then(moneyMoves => res.send(moneyMoves))
      .catch(e => catchErrors(e, res))
  })

  router.get('/readInRange', authenticate([], true), (req, res) => {
    const search: { from: string, to: string } = JSON.parse(req.query.search as string)
    controller.readInRange(req.session.userId as number, new Date(search.from), new Date(search.to))
      .then(moneyMoves => res.send(moneyMoves))
      .catch(e => catchErrors(e, res))
  })

  return router
}
