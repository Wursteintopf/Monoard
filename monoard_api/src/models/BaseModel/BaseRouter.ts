import { checkForId } from './../../middleware/checkForId'
import { authenticate } from './../../middleware/authenticate'
import { Role } from '../../../data_types/Role'
import bodyParser from 'body-parser'
import express from 'express'
import { BaseModel } from './BaseModel'
import { catchErrors } from '../../middleware/catchErrors'
import { BaseController } from './BaseController'

export interface AccessRights {
  createAccess: Role[]
  readAccess: Role[]
  updateAccess: Role[]
  deleteAccess: Role[]
}

export const baseRouter = <Model extends BaseModel>(
  controller: BaseController<Model>,
  accessRights: AccessRights,
  overrideRoutes: string[] = [],
) => {
  const router = express.Router()

  router.use(bodyParser.json())

  if (!overrideRoutes.includes('/create')) {
    router.put('/create', authenticate(accessRights.createAccess), (req, res) => {
      controller
        .create(req.body)
        .then(() => res.status(200).send({ status: 'OK' }))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/createMultiple')) {
    router.put('/createMultiple', authenticate(accessRights.createAccess), (req, res) => {
      controller
        .createMultiple(req.body)
        .then(() => res.status(200).send({ status: 'OK' }))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/read')) {
    router.get('/read', authenticate(accessRights.readAccess), (req, res) => {
      const id = Number(req.query.id as string)
      controller.read(id)
        .then(entity => res.send(entity))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/readAll')) {
    router.get('/readAll', authenticate(accessRights.readAccess), (req, res) => {
      controller.readAll()
        .then(entities => res.send(entities))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/readBy')) {
    router.get('/readBy', authenticate(accessRights.readAccess), (req, res) => {
      controller.readBy(JSON.parse(req.query.search as string))
        .then(entities => res.send(entities))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/readOneBy')) {
    router.get('/readOneBy', authenticate(accessRights.readAccess), (req, res) => {
      controller.readOneBy(JSON.parse(req.query.search as string))
        .then(entity => res.send(entity))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/update')) {
    router.post('/update', authenticate(accessRights.updateAccess), checkForId, (req, res) => {
      controller.update(req.body)
        .then(() => res.status(200).send({ status: 'OK' }))
        .catch(e => catchErrors(e, res))
    })
  }

  if (!overrideRoutes.includes('/delete')) {
    router.delete('/delete', authenticate(accessRights.deleteAccess), checkForId, (req, res) => {
      controller.delete(req.body.id)
        .then(() => res.status(200).send({ status: 'OK' }))
        .catch(e => catchErrors(e, res))
    })
  }

  return router
}
