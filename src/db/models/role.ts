import {
    DataTypes,
    InferAttributes,
    Model,
    InferCreationAttributes
} from 'sequelize'
import { sequelize } from '../db'

export class Role extends Model<
    InferAttributes<Role>,
    InferCreationAttributes<Role>
> {
    declare value: string
}

Role.init(
    {
        value: {
            type: DataTypes.STRING,
            defaultValue: 'USER',
            unique: true
        }
    },
    {
        sequelize,
        modelName: 'Role',
        tableName: 'Roles'
    }
)
