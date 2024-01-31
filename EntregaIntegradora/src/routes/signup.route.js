import Router from 'express';

const router = Router();

router.get("/", (req,res) => {
    res.render("signup",{
        title: "Regístrese"
    });
});

export default router;