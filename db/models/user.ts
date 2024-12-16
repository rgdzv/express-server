import {
    DataTypes,
    InferAttributes,
    Model,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize'
import { sequelize } from '../index'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number
    declare firstName: string
    declare lastName: string
    declare email: string
    declare password: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
        modelName: 'User'
    }
)
