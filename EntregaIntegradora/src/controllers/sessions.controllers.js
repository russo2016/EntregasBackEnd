import passport from "passport";
import UsersDTO from "../dao/DTO/usersDTO.js";

export const getSignupPage = async (req, res) => {
    try {
        res.render("signup", {
            title: "Regístrese",
            style: "css/signup.css"
        });
    } catch (error) {
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
        res.status(500).json(error);
    }
};

export const signup = async (req, res) => {
    try {
        passport.authenticate("register", (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: err.message, success: false });
            }
            if (!user) {
                return res.status(400).json({ error: info.message, success: false });
            }
            return res.status(200).json({ message: "Usuario creado con éxito", success: true });
        })(req, res);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const login = async (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err.message, success: false });
        }
        if (!user) {
            return res.status(400).json({ error: info.message, success: false });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message, success: false });
            }
            req.session.user = req.user;
            return res.status(200).json({ message: "Inicio de sesión exitoso", success: true });
        });
    })(req, res, next);
};


export const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
            } else {
                res.json({ success: true, message: 'Sesión cerrada correctamente' });
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};


export const getCurrentSession = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "No hay una sesión activa" });
    } else {
        // Crear una instancia de UsersDTO con req.user
        const userDTO = new UsersDTO(req.user);

        // Utilizar la instancia de UsersDTO para construir el objeto de usuario
        const user = {
            fullName: userDTO.fullName,
            email: userDTO.email,
            age: userDTO.age,
            role: userDTO.role,
            cart: userDTO.cart
        };

        // Construir el objeto de sesión
        const session = {
            message: "Sesión activa",
            user: user
        };

        // Devolver la sesión como respuesta
        res.status(200).json(session);
    }
};