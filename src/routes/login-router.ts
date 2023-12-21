//Import packages
import express, { Request, Response } from "express"

//Define Express server
const server = express()

//Express server settings
server.set("view engine", "pug")
server.set("views", "./src/views")

//Define Express router
const router = express.Router()

router.get("/", (req: Request, res: Response) => {
	res.status(200).render("login", { pageTitle: "Login" })
})

//Exports
export default router
