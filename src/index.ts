import app from "./routes/app"
import { userRouter } from "./routes/userRouter"
import { bandRouter } from "./routes/BandRouter"
import { showRouter } from "./routes/ShowRouter";


/**************************** ENDPOINTS ******************************/
app.use('/signup', userRouter);
app.use('/login', userRouter);
app.use('/user', userRouter);
app.use('/band', bandRouter);
app.use('/show', showRouter);
