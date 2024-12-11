export const dbConfig = {
    development: {
        username: 'root',
        password: 'database_password',
        database: 'database_development',
        host: '127.0.0.1',
        dialect: 'sqlite'
    },
    test: {
        username: 'root',
        password: 'database_password',
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: 'root',
        password: 'database_password',
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
}
