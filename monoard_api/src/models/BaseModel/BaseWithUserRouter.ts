import { appDataSource } from './../../config/typeOrmDataSource'
import { BaseWithUserController } from './BaseWithUserController'
import { authenticate } from './../../middleware/authenticate'
import bodyParser from 'body-parser'
import { catchErrors } from '../../middleware/catchErrors'
import { BaseWithUserModel } from './BaseWithUserModel'
import { checkForId } from '../../middleware/checkForId'
import { AccessRights, baseRouter } from '@wursteintopf/crudpress'
import { Role } from '@wursteintopf/monoard_data_models'

declare module 'express-session' {
  export interface SessionData {
    role: Role
    username: string
    userId: number
  }
}

interface AccessWithUserRights extends AccessRights {
  createOwn?: boolean
  readOwn?: boolean
  updateOwn?: boolean
  deleteOwn?: boolean
}

export const baseWithUserRouter = <Model extends BaseWithUserModel>(
  controller: BaseWithUserController<Model>,
  ModelConstructor: new () => Model,
  accessRights: AccessWithUserRights,
  overrideRoutes: string[] = [],
) => {
  const router = baseRouter<Model>(new BaseWithUserController(ModelConstructor, appDataSource), accessRights, overrideRoutes, authenticate)

  router.use(bodyParser.json())

  if (!overrideRoutes.includes('/createOwn')) {
    router.put('/createOwn', authenticate([], accessRights.createOwn), (req, res) => {
      controller.createOwn(req.body, req.session.userId as number)
        .then(model => res.status(200).send(model))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/createMultipleOwn')) {
    router.put('/createMultipleOwn', authenticate([], accessRights.createOwn), (req, res) => {
      controller
        .createMultipleOwn(req.body, req.session.userId as number)
        .then(models => res.status(200).send(models))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/readOwn')) {
    router.get('/readOwn', authenticate([], accessRights.readOwn), (req, res) => {
      const id = Number(req.query.id as string)
      controller.readOwn(id, req.session.userId as number)
        .then(entity => res.send(entity))
        .catch(e => catchErrors(e, res))
    })
  }
  
  if (!overrideRoutes.includes('/readAllOwn')) {
    router.get('/readAllOwn', authenticate([], accessRights.readOwn), (req, res) => {
      controller.readAllOwn(req.session.userId as number)
        .then(entities => res.send(entities))
        .catch(e => catchErrors(e, res))
    })
  }
  
  if (!overrideRoutes.includes('/readByOwn')) {
    router.get('/readByOwn', authenticate([], accessRights.readOwn), (req, res) => {
      controller.readByOwn(JSON.parse(req.query.search as string), req.session.userId as number)
        .then(entities => res.send(entities))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/readOneByOwn')) {
    router.get('/readOneByOwn', authenticate([], accessRights.readOwn), (req, res) => {
      controller.readOneByOwn(JSON.parse(req.query.search as string), req.session.userId as number)
        .then(entity => res.send(entity))
        .catch(e => catchErrors(e, res))
    })
  }
  
  if (!overrideRoutes.includes('/updateOwn')) {
    router.post('/updateOwn', authenticate([], accessRights.updateOwn), checkForId, (req, res) => {
      controller.updateOwn(req.body, req.session.userId as number)
        .then(model => res.status(200).send(model))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/deleteOwn')) {
    router.delete('/deleteOwn', authenticate([], accessRights.deleteOwn), checkForId, (req, res) => {
      controller.deleteOwn(req.body.id, req.session.userId as number)
        .then(id => res.status(200).send({ id }))
        .catch(e => catchErrors(e, res))
    })
  }

  return router
}
