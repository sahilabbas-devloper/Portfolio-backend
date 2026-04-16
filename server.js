import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import {Resend} from "resend"
dotenv.config()

const app = express()

app.use(cors({
    methods: ["POST", "GET"],
    origin:[ "http://localhost:5173","https://ahsan-exe.netlify.app"]
}))

app.use(express.json())
app.use(cookieParser())

const resend = new Resend(process.env.RESEND_API_KEY)


app.post("/api/send/message", async(req, res) => {

    try {
        
        const {name,email,message} = req.body

        if (!name || !email || !message) {
            return res.status(400).json({
                success:false,
                error:"all fields are requried",
            })
        }

        const data = await resend.emails.send({
            from:"Ahsan portfolio <onboarding@resend.dev>",
            to:"sa9300432@gmail.com",
            subject:`New message from ${name}`,
            html:`<h2> new contect message <h2/>
            <p><b> Name :<b/> ${name}<p/>
            <p><b> Email :<b/> ${email}<p/>
            <p><b> Message :<b/> ${message}<p/>`
        })

        res.status(200).json({message:"Message sent sucessfully."})
    } catch (error) {
        console.log("message sent error", error)
        res.status(500).json({message:"Message could not sent plese try again !"})
    }

})

const PORT = process.env.PORT || 5000

app.listen(PORT, (req,res)=>{
   console.log("server is running on PORT",PORT)
})