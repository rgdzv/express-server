import { Options, Sequelize } from 'sequelize'
import { EnvType } from './types/types'
import { userModel } from './user'
import { configDB } from 'db/config/configDB'

const env = process.env.NODE_ENV ?? 'development'
const config = configDB[env as EnvType]

const sequelize = new Sequelize(config as Options)

export const db = {
    sequelize: sequelize,
    user: userModel(sequelize)
}
