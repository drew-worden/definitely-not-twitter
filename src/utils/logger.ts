//Import packages
import winston from "winston"

//Log levels
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4
}

//Log colors
const colors = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	debug: "white"
}

//Add colors to logger
winston.addColors(colors)

//Format logger
const format = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
	winston.format.colorize({ all: true }),
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)

//Define logger transports
const transports = [
	new winston.transports.Console(),
	new winston.transports.File({
		filename: "logs/error.log",
		level: "error"
	}),
	new winston.transports.File({ filename: "logs/all.log" })
]

//Create logger
const logger = winston.createLogger({
	level: "debug",
	levels,
	format,
	transports
})

//Export logger
export default logger
