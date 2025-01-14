import { config } from './config/config'
import { Options, Sequelize } from 'sequelize'
import { EnvType } from './types/envType'

const env = process.env.NODE_ENV ?? 'development'
const configDB = config[env as EnvType]

export const sequelize = new Sequelize(configDB as Options)

export const connectToDB = async () => {
    try {
        await sequelize.sync({ force: true })
        console.log('All models are successfully syncronized')
    } catch (err) {
        throw new Error('Connecting to database failed.', { cause: err })
    }
}
