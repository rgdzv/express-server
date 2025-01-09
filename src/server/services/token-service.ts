import jwt from 'jsonwebtoken'

interface PayloadInterface {
    id: string
    email: string
}

export const generateTokens = (payload: PayloadInterface) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? '', {
        expiresIn: '30m'
    })

    const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET ?? '',
        {
            expiresIn: '30d'
        }
    )

    return {
        accessToken,
        refreshToken
    }
}
