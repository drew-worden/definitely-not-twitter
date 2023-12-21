//Import packages
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import compression from "compression"

//Import utilities
import logger from "./utils/logger.ts"

//Load environment variables
dotenv.config()
const port = process.env.PORT

//Define Express server
const server = express()

//Set stream for logger
const stream = {
	write: (message: string) => logger.http(message)
}

//Package middleware
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(compression())
server.use(
	morgan(":remote-addr :method :url :status :res[content-length] - :response-time ms", {
		stream,
		skip: () => false
	})
)

//Start and listen with Express server
server.listen(port, () => logger.info(`Server started up listening on port ${port}.`))
