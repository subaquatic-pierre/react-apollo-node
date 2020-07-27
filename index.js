import mongoose from 'mongoose';
import dotenv from 'dotenv';
import server from './serverConfig.js'

// initialize process.env
dotenv.config({ path: 'config.env' })

// import variables from config.env
const DB_URI = process.env.DB_URI

// connect to database from config variables
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
).then(() => console.log(`Connected to database at ${DB_URI}`)).catch(err => console.log(err));

// Add a load of comments
server.listen().then(() => {
    console.log('🚀  Server ready at http://localhost:4000/')
})
