import mongoose from 'mongoose';
import dotenv from 'dotenv';
import server from './serverConfig.js'

PROD_ENV = process.env.PROD_ENV

if (!PROD_ENV) {
    // initialize process.env
    dotenv.config({ path: 'config.env' })
}

// import variables from config.env

const DB_URI = process.env.DB_URI
const USER = process.env.USER
const PASSWORD = process.env.PASS

// connect to database from config variables
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: USER,
    pass: PASSWORD
}

).then(() => console.log(`Connected to database at ${DB_URI}`)).catch(err => console.log(err));

server.listen().then(() => {
    console.log('🚀  Server ready at http://localhost:4000/')
})
