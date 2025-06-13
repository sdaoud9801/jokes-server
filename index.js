import Express from 'express';
import authRouter from './controller/authenticate.js';
import cors from 'cors';
import jokesRouter from './controller/jokes.js';
const app = Express();

app.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: "200",
        credentials: true
    })
);

app.use("/auth", authRouter);
app.use("/jokes", jokesRouter);

app.listen(5000, () => {
    console.log("Listening on port 5000");
});