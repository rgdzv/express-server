import { Options, Sequelize } from 'sequelize'
import { EnvType } from './types/envType'
import { config } from './config'

const env = process.env.NODE_ENV ?? 'development'
const configDB = config[env as EnvType]

export const sequelize = new Sequelize(configDB as Options)
