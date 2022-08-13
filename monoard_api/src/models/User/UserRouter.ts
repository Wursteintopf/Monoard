import { checkForParameters } from '../../middleware/checkForParameters'
import { catchErrors } from '../../middleware/catchErrors'
import { appDataSource } from '../../config/typeOrmDataSource'
import { authenticate } from '../../middleware/authenticate'
import { baseRouter } from '../BaseModel/BaseRouter'
import { Role } from '../../../data_types/Role'
import { UserModel } from './UserModel'
import { comparePasswords, generateSaltAndHash } from './UserUtility'
import { UserController } from './UserController'

export const userRouter = () => {
  const repository = appDataSource.getRepository(UserModel)

  const userRouter = baseRouter(
    new UserController(UserModel),
    {
      createAccess: [Role.ADMIN],
      readAccess: [Role.ADMIN],
      updateAccess: [Role.ADMIN],
      deleteAccess: [Role.ADMIN],
    },
    [
      '/create',
    ],
  )

  userRouter.put('/create', authenticate([Role.ADMIN]), (req, res) => {
    const account = new UserModel()
    // TODO: Check for some parameters, account shouldnt be created without password eg
    account.setAll(req.body)

    const { salt, hash } = generateSaltAndHash(req.body.password)

    account.salt = salt
    account.password = hash

    repository
      .save(account)
      .then(() => res.sendStatus(200))
      .catch(e => catchErrors(e, res))
  })

  // TODO: Bruteforce Schutz einbauen
  userRouter.post('/login', checkForParameters(['username', 'password']), (req, res) => {
    const username = req.body.username
    const password = req.body.password

    repository
      .findOneByOrFail({ username })
      .then(account => {
        if (comparePasswords(account.password, account.salt, password)) {
          req.session.regenerate(() => {
            req.session.role = account.role
            req.session.username = account.username
            req.session.userId = account.id

            res.send({ id: account.id, username: account.username, role: account.role })
          })
        } else {
          res.sendStatus(403)
        }
      })
      .catch(() => res.sendStatus(403))
  })

  userRouter.get('/checkSession', (req, res) => {
    if (req.session.username) res.send({ id: req.session.id, username: req.session.username, role: req.session.role })
    else res.sendStatus(403)
  })

  userRouter.delete('/logout', (req, res) => {
    if (!req.session.username) res.sendStatus(403)
    else req.session.destroy(() => res.sendStatus(200))
  })

  return userRouter
}
