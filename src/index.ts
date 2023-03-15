import app from "./routes/app"
import { userRouter } from "./routes/userRouter"
//import { postRouter } from "./routes/postRouter"


/**************************** ENDPOINTS ******************************/
app.use('/signup', userRouter);
app.use('/login', userRouter);
app.use('/user', userRouter);
//app.use('/recipe', postRouter);