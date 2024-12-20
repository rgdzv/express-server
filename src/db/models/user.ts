import {
    DataTypes,
    InferAttributes,
    Model,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize'
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
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'Users'
    }
)
