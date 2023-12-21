//Import packages
import { Request, Response, NextFunction } from "express"

interface SessionRequest extends Request {
	session?: {
		user?: string
	}
}

/**
 * Middleware function to check if the user is authenticated.
 * If the user is authenticated, it calls the next middleware function.
 * If the user is not authenticated, it redirects to the login page.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
function checkAuth(req: SessionRequest, res: Response, next: NextFunction) {
	if (req.session && req.session.user) {
		return next()
	} else {
		return res.redirect("/login")
	}
}

//Exports
export default checkAuth
