const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.post('/', (req, res)=>{
    const email = req.body.email
    const data = {
        members: [{
            email_address: email,
           status: "subscribed"
        }]
    }
    jsonData = JSON.stringify(data)
   // const apiKey = "ed9890d0d0d6f04e580c6e939ae3021b-us21"
    const url = "https://us21.api.mailchimp.com/3.0/lists/288df6f747"
    const options = {
        method: "POST",
        auth: "vej:ed9890d0d0d6f04e580c6e939ae3021b-us21"
    }
    const request = https.request(url, options, (response)=>{
        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()
    console.log(email)
})
app.listen(8000, (req, res)=>{
    console.log("Server is Running on Port 8000")
})
/*require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendMail = async (msg) => //msg
{
    try
    {
        await sgMail.send(msg);
        console.log("Message Sent Successfully");
    }
    catch(error){
        console.error(error);
        if(error.response)
        {
            console.error(error.response.body);
        }
    }
};



sendMail(
    {
        to: document.getElementById('Email').value,
        from: "rvklenora@gmail.com",
        subject: "Task2.1P",
        text: "Email Sent Successfully?",
    }
)
*/