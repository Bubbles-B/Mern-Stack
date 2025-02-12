import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"

//This functions access the database (mongodb)
async function main() {
    dotenv.config() //dotenv accesses environmental variables

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )
    //use port 8000 if we can't access port from .env
    const port = process.env.PORT || 8000
    try {
        // Connect to the MongoDB cluster
        await client.connect()
        app.listen(port, () => {
            console.log('server is running on port:' + port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}
main().catch(console.error);
