import Express from 'express';
import createUser from '../model/createUser.js';
import authenticateUser from '../model/authenticateUser.js';
import cookieParser from 'cookie-parser';
import createJwt from '../jwt/createJwt.js';
const authRouter = Express.Router();
authRouter.use(Express.json());
authRouter.use(cookieParser());


authRouter.post("/createuser", async (req, res) => {
    try {
        let { username, password, email } = req.body;
        await createUser(username, email, password);
        res.json({
            status: "success"
        });
    } catch (e) {
        console.log(e);
        res.json({
            status: "failure",
            error: e.message
        });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        let { username, password } = req.body;
        let authenticated = await authenticateUser(username, password);
        if (authenticated) {
            let auth = createJwt(username);
            res.cookie("auth", auth, {
                httpOnly: true,
                secure: true,         
                sameSite: 'none'       
            });
            res.json({
                status: "success"
            });
        } else {
            res.json({
                status: "failure",
                message: "incorrect password"
            })
        }
    } catch (e) {
        res.json({
            status: "failure",
            message: e.message
        })
        console.log(e);
    }
});


export default authRouter;