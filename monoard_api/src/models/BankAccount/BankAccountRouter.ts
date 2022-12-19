import { appDataSource } from './../../config/typeOrmDataSource'
import { BankAccountController } from './BankAccountController'
import { authenticate } from './../../middleware/authenticate'
import { BankAccountModel } from './BankAccountModel'
import { baseWithUserRouter } from './../BaseModel/BaseWithUserRouter'
import { catchErrors } from '../../middleware/catchErrors'

export const bankAccountRouter = () => {
  const controller = new BankAccountController(BankAccountModel, appDataSource)

  const router = baseWithUserRouter(
    controller,
    BankAccountModel,
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
