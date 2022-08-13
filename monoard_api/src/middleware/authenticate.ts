import { NextFunction, Request, Response } from 'express'
import { Role } from '../../data_types/Role'

export const authenticate = (accessRights: Role[], own?: boolean) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (accessRights.includes(Role.UNAUTHENTICATED)) next()
    else if (!req.session.role || !req.session.userId) res.sendStatus(403)
    else if (accessRights.includes(req.session.role)) next()
    else if (own) next()
    else res.sendStatus(403)
  }  
}
