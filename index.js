const express= require ('express')
const cors = require ('cors')
const userRouter = require('./routes/user')
const cookieParser = require('cookie-parser')
const adminRouter = require('./routes/admin')
const app=express()

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}))
const connect = require('./config/connnection');
connect();
app.use('/',userRouter)


app.use('/admin',adminRouter)

app.listen(3000,()=>{
    console.log("server started");
})
