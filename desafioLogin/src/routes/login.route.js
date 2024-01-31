import Router from 'express';

const router = Router();

router.get("/", (req,res) => {
    res.render("login",{
        title: "Inicie sesión"
    });
});

export default router;