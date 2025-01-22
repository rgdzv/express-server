import type { InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id?: string
    declare firstName: string
    declare lastName: string
    declare email: string
    declare password: string
    declare roles: string[]
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roles: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: ['user']
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'Users'
    }
)
