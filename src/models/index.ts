import { Dialect, Sequelize } from 'sequelize'
import { dbConfig } from 'dbConfig/dbConfig'
import { EnvType } from './types/types'
import { userModel } from './user.model'

const env = process.env.NODE_ENV ?? 'development'
const config = dbConfig[env as EnvType]

// const db = {}

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect as Dialect
    }
)

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

userModel(sequelize)
