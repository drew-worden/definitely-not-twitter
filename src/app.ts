//Import packages
import express, { Request, Response } from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import compression from "compression"
import path from "path"

//Import routers
import loginRouter from "./routes/login-router.ts"

//Import utilities
import logger from "./utils/logger.ts"

//Import middleware
import checkAuth from "./middleware/auth-middleware.ts"

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

//Static files
server.use(express.static(path.join(__dirname, "public")))

//Express server settings
server.set("view engine", "pug")
server.set("views", "./src/views")

//Routers
server.use("/login", loginRouter)

//Start and listen with Express server
server.listen(port, () => logger.info(`Server started up listening on port ${port}.`))

server.get("/", checkAuth, (req: Request, res: Response) => {
	const payload = {
		pageTitle: "Home",
		heading: "Twitter Heading"
	}

	res.status(200).render("home", payload)
})
