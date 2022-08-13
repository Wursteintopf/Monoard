import { NextFunction, Request, Response } from 'express'

export const checkForParameters = (params: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const results = params.filter(param => !req.body[param])

    if (results.length > 0) {
      res.status(400).send('Unsufficient data provided.')
      return
    }

    next()
  }
}
