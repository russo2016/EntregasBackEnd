import getLogger from "../utils/logger.js";
const logger = getLogger();

function auth(isAvailable) {
    return function(req, res, next) {
        if (isAvailable[0] === "PUBLIC") return next();
        if (!req.isAuthenticated()) {
            logger.error('Usuario no autenticado. Rol:', req.user.role);
            return res.status(401).json({ message: "Unauthorized", role: req.user.role });
        }
        if (!isAvailable.includes(req.user.role)) {
            logger.error('Usuario no autorizado. Rol: ' + req.user.role);
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    }   
}

  
export default auth;
