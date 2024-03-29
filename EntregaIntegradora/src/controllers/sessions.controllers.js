import passport from "passport";
import UsersDTO from "../dao/DTO/usersDTO.js";
import getLogger from "../utils/logger.js";

const logger = getLogger();

export const getSignupPage = async (req, res) => {
    try {
        res.render("signup", {
            title: "Regístrese",
            style: "css/signup.css"
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const getLoginPage = async (req, res) => {
    try {
        res.render("login", {
            title: "Inicie sesión",
            style: "css/login.css"
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const signup = async (req, res) => {
    try {
        passport.authenticate("register", (err, user, info) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({ error: err.message, success: false });
            }
            if (!user) {
                logger.error(info.message);
                return res.status(400).json({ error: info.message, success: false });
            }
            logger.info("Usuario creado con éxito");
            return res.status(200).json({ message: "Usuario creado con éxito", success: true });
        })(req, res);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const login = async (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            logger.error(err);
            return res.status(500).json({ error: err.message, success: false });
        }
        if (!user) {
            logger.error(info.message);
            return res.status(400).json({ error: info.message, success: false });
        }
        req.login(user, (err) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({ error: err.message, success: false });
            }
            req.session.user = req.user;
            logger.info("Inicio de sesión exitoso");
            return res.status(200).json({ message: "Inicio de sesión exitoso", success: true });
        });
    })(req, res, next);
};

export const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                logger.error(err);
                res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
            } else {
                logger.info('Sesión cerrada correctamente');
                res.json({ success: true, message: 'Sesión cerrada correctamente' });
            }
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
};

export const getCurrentSession = async (req, res) => {
    if (!req.isAuthenticated()) {
        logger.warning("No hay una sesión activa");
        res.status(401).json({ message: "No hay una sesión activa" });
    } else {
        const userDTO = new UsersDTO(req.user);

        const user = {
            fullName: userDTO.fullName,
            email: userDTO.email,
            age: userDTO.age,
            role: userDTO.role,
            cart: userDTO.cart
        };

        const session = {
            message: "Sesión activa",
            user: user
        };

        res.status(200).json(session);
    }
};
