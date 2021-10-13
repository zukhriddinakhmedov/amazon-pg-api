import pg from "pg" // a package which connects to postgreesql


const { DATABASE_URL, DATABASE_URL_DEV, NODE_ENV } = process.env



const isProduction = NODE_ENV === "production" // if it is deployed to heroku sets NODE_ENV ==== "production"
// we can understand if code is running on heroku or local by checking it 


const connectionString = isProduction ? DATABASE_URL : DATABASE_URL_DEV // if it is deployed to heroku we use heroku connection string
// otherwise we use local connection string


const sslConfig = isProduction
    ? {
        ssl: {
            rejectUnauthorized: false,
        },
    }
    : {} // heroku deployment requires this ssl configs so if its deployed to heroku, we area providing these sslConfig

const pool = new pg.Pool({
    connectionString,
    ...sslConfig,
})

export default pool