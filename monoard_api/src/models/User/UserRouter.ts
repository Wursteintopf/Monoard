import { checkForParameters } from '../../middleware/checkForParameters'
import { catchErrors } from '../../middleware/catchErrors'
import { appDataSource } from '../../config/typeOrmDataSource'
import { authenticate } from '../../middleware/authenticate'
import { UserModel } from './UserModel'
import { comparePasswords, generateSaltAndHash } from './UserUtility'
import { UserController } from './UserController'
import { baseRouter } from '@wursteintopf/crudpress'
import { Role } from '@wursteintopf/monoard_data_models'

export const userRouter = () => {
  const repository = appDataSource.getRepository(UserModel)
  const controller = new UserController(UserModel, appDataSource)

  const userRouter = baseRouter(
    controller,
    {
      createAccess: [Role.ADMIN],
      readAccess: [Role.ADMIN, Role.UNAUTHENTICATED],
      updateAccess: [Role.ADMIN],
      deleteAccess: [Role.ADMIN],
    },
    [
      '/create',
    ],
    authenticate,
  )

  userRouter.put('/firstSetUp', async (req, res) => {
    const userRepoLength = await controller.getLength()
    if (userRepoLength !== 0) res.send(403)
    else {
      const account = new UserModel()
      account.set(req.body)

      const { salt, hash } = generateSaltAndHash(req.body.password)

      account.salt = salt
      account.password = hash

      account.role = Role.ADMIN

      repository
        .save(account)
        .then(user => {
          req.session.regenerate(() => {
            req.session.role = user.role
            req.session.username = user.username
            req.session.userId = user.id

            res.send({ id: user.id, username: user.username, role: user.role })
          })
        })
        .catch(e => catchErrors(e, res))
    }
  })

  // TODO: Unauthenticated sollte keinen Zugriff auf die Create Route haben
  userRouter.put('/create', authenticate([Role.ADMIN, Role.UNAUTHENTICATED]), (req, res) => {
    const account = new UserModel()
    // TODO: Check for some parameters, account shouldnt be created without password eg
    account.set(req.body)

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

  userRouter.get('/checkSession', async (req, res) => {
    const userRepoLength = await controller.getLength()
    if (req.session.username) res.send({ id: req.session.id, username: req.session.username, role: req.session.role })
    else if (userRepoLength === 0) res.send({ id: -1, username: 'FIRST_LOGIN', role: Role.UNAUTHENTICATED })
    else res.sendStatus(403)
  })

  userRouter.delete('/logout', (req, res) => {
    if (!req.session.username) res.sendStatus(403)
    else req.session.destroy(() => res.sendStatus(200))
  })

  return userRouter
}
