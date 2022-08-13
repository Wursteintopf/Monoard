import mysql, { Pool } from 'mysql'

const databaseConfig = {
  host: process.env.MYSQL_DATABASE_HOST,
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}

const initializeConnection = () => {
  const addDisconnectHandler = (connection: Pool) => {
    connection.on('error', (error) => {
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error(error.stack)
        console.log('Lost connection. Reconnecting...')

        initializeConnection()
      } else if (error.fatal) {
        throw error
      }
    })
  }

  const connection = mysql.createPool(databaseConfig)
  addDisconnectHandler(connection)

  return connection
}

export const connection = initializeConnection()
