import { Sequelize, DataTypes } from 'sequelize'

export const userModel = (sequelize: Sequelize) => {
    const User = sequelize.define(
        'User',
        {
            username: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'User'
        }
    )

    return User
}
