import passport from "passport";
import UsersDTO from "../dao/DTO/usersDTO.js";
import getLogger from "../utils/logger.js";
import nodemailer from "nodemailer";
import {userService} from "../repository/index.js";
import dotenv from "dotenv";
import {hashSync, genSaltSync, compareSync} from "bcrypt";
import { createHash, isValidPassword } from "../utils.js";

const logger = getLogger();
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

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
            return res.status(200).json({user:user ,message: "Usuario creado con éxito", success: true });
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
            const user = req.user
            user.last_connection = new Date();
            user.save();
            logger.info("Inicio de sesión exitoso");
            return res.status(200).json({ message: "Inicio de sesión exitoso", success: true });
        });
    })(req, res, next);
};

export const logout = async (req, res) => {
    try {
        const user = req.user
        user.last_connection = new Date();
        user.save();
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
        console.error(error);
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

export const forgotPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        let result = await transporter.sendMail({
            from: `${process.env.EMAIL}`,
            to: `${email}`,
            subject: "Forgot your password",
            text: "Este mail es para recuperar tu contraseña",
            html: `<a href="https://entregasbackend-production.up.railway.app/forgotPassword/${email}">Click aquí para recuperar tu contraseña</a>`
          });
          res.json({ status: "success", result });
        } catch (error) {
            res.json({ status: "error", error });
            }
}

export const getForgotPasswordPage = async (req, res) => {
    try {
        res.render("forgotPass", {
            title: "Restaurar contraseña",
            style: "/css/forgotPassword.css"
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
}

export const getNewPasswordPage = async (req, res) => {
    try {
        res.render("newPassword", {
            title: "Nueva contraseña",
            style: "/css/newPassword.css"
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
}

export const updateNewPassword = async (req, res) => {
    try {
        const { email } = req.params;
        const { password } = req.body;
        const user = await userService.getUser(email);
        if (!user) {
            logger.error("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado", success: false});
        }
        if (isValidPassword(user,password)) {
            logger.error("La contraseña no puede ser igual a la anterior");
            return res.status(400).json({ message: "La contraseña no puede ser igual a la anterior", success: false});
        }else{
            const response = await userService.updatePassword(user._id, hashSync(password,genSaltSync(10)));
            res.status(200).json({response: response, success: true, message: "Contraseña actualizada con éxito"});
        }
    } catch (error) {
        console.log(error);
        logger.error(error);
        res.status(500).json(error);
    }
}