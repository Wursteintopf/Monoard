import { randomBytes, createHmac } from 'crypto'

interface HashedPassword {
  salt: string
  hash: string
}

export const hashPassword = (password: string, salt: string) => {
  return createHmac('sha512', salt).update(password).digest('hex')
}

export const generateSaltAndHash = (password: string): HashedPassword => {
  const salt = randomBytes(128).toString('base64')
  const hash = hashPassword(password, salt)

  return {
    salt,
    hash,
  }
}

export const comparePasswords = (savedHash: string, savedSalt: string, passwordAttempt: string) => {
  return savedHash === hashPassword(passwordAttempt, savedSalt)
}
