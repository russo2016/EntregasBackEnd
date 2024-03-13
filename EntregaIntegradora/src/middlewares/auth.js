import isAuthenticated from "./isAuthenticated.js";

function auth(isAvailable) {
    return function(req, res, next) {
        if (isAvailable === "PUBLIC") return next();
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: "Unauthorized",role: req.user.role});
        }
        if (!isAvailable.includes(req.user.role)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    }   
}

  
export default auth;