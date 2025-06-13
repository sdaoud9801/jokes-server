import Express from 'express';
import cookieParser from 'cookie-parser';
import verifyJwt from '../jwt/verifyJwt.js';
import getJokes from '../model/getJokes.js';
import createJoke from '../model/createJoke.js';
import likeJoke from '../model/likeJoke.js';
import unlikeJoke from '../model/unlikeJoke.js'
const jokesRouter = Express.Router();
jokesRouter.use(cookieParser());
jokesRouter.use(Express.json());
jokesRouter.use((req,res,next)=>{
    let token = req.cookies.auth;
    console.log(token);
    if(!token) {
        res.json({
            status: "error",
            message: "no JWT"
        });
    } else {
        next();
    }
})

jokesRouter.get("/",async (req,res)=>{
    // verify jwt
    let token = req.cookies.auth;
    try {
        let username = verifyJwt(token);
        let jokes = await getJokes(username);
        res.send({
            status: "success",
            jokes
        });
    } catch (e) {
        res.json({
            status: "error",
        });
        console.log(e);
    };
});

jokesRouter.post("/createjoke", async (req,res)=>{
    try {
        let token = req.cookies.auth;
        let username = verifyJwt(token);
        let {content} = req.body;
        let created = await createJoke(username,content);
        if(created) {
            res.json({
                status: "success"
            })
        } else {
            res.json({
                status: "error"
            })
        }
    } catch (e) {
        console.log(e);
        res.json({
            status: "error"
        })
    }
} )

jokesRouter.post("/like",async (req,res)=>{
    let token = req.cookies.auth;
    let {joke_id} = req.body;
    try {
        let username = verifyJwt(token);
        await likeJoke(username,joke_id);
        res.send({
            status: "success"
        });
    } catch (e) {
        console.log(e);
        res.send({
            status: "failure",
            message: "Error liking post"
        })
    }
})

jokesRouter.post("/unlike",async (req,res)=>{
    let token = req.cookies.auth;
    let {joke_id} = req.body;
    try {
        let username = verifyJwt(token);
        await unlikeJoke(username,joke_id);
        res.send({
            status: "success"
        });
    } catch (e) {
        console.log(e);
        res.send({
            status: "failure",
            message: "Error unliking post"
        })
    }
})

export default jokesRouter;