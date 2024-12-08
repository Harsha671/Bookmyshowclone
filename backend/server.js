const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer")
const os = require("os")

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const server = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsha',
});

function getLocalIp() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const addresses = networkInterfaces[interfaceName];
        for (const address of addresses) {
            if (address.family === "IPv4" && !address.internal) {
                return address.address; // Return the first non-internal IPv4 address
            }
        }
    }
    return "127.0.0.1"; // Fallback to localhost if no address is found
}

server.connect((err)=> {
    if (err) {
        console.log('Error connecting to MySQL:', err);
    }
    console.log('Connected to MySQL');
});
app.post('/register', (req, res) => {
    console.log(req.body);
    const { fullname, mobilenumber, email, password, confirmpwd } = req.body;

    const query = 'INSERT INTO users (fullname, mobilenumber, email, password, confirmpwd) VALUES (?, ?, ?, ?, ?)';

    server.query(query, [fullname, mobilenumber, email, password, confirmpwd], (error, result) => {
        if (error) {
            console.log("Error Inserting Data into DataBase", error);
            return res.status(500).json({ message: 'Failed to register user' });
        }
        res.status(201).json({ message: 'User Registerd successfully' });
    })
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';

    server.query(query, [email], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length > 0) {
            const user = result[0];
            console.log(user);
            if (user.password === password) {
                return res.status(200).json({ success: true, message: 'Login successful' })
            } else {
                return res.status(401).json({ success: false, message: 'Invalid E-mail or Password' });
            }
        } else {
            return res.status(404).json({ success: false, message: "Email is not registered" });
        }
    });
});

// Add this to your backend code
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';

    server.query(query, [email], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length > 0) {
            // Here, you'd send an email with password reset instructions
            // For now, just simulate a successful response
            return res.status(200).json({ success: true, message: 'Password reset email sent' });
        } else {
            return res.status(404).json({ success: false, message: 'Email is not registered' });
        }
    });
});


app.post("/sendmail", async(req,res)=>
{
try{


    const to = req.body.to;
    const subject = req.body.subject;
    const text = req.body.text;


    if (!to || !subject || !text)
    {
        return res.json({message:"invalid Input Data"})
    }


    const sendmail = async(to,mailOptions)=>
    {
     const transport=   nodemailer.createTransport({
            host:'smtp.zeptomail.in',
            port:587,
            auth:{
                user:"emailapikey",
                pass:'PHtE6r1eROHrjG968hhW7fbuF8LwZoMqru1nfgRG4YxKAqAFSU1QotAjxGfj/hl+VaQWE/aby91ouOmbu+PXJWq+MTlPCGqyqK3sx/VYSPOZsbq6x00cuFgZckHYUYbnc9Bq3CDVud3YNA=='
            }
        })

        const options =
        {
            to:to,
            from: 'noreply@ramanasoft.in',
            ...mailOptions
        }

        try{
            await transport.sendMail(options);
            console.log("email sent successfully")
            return { status:200, message:'email sent successfully'}
        }
        catch(err)
        {
            console.error("Error in mail sending",err)
            return {status:500, message:'Error in mail sending'}
        }
    }

    const response= await sendmail(to,{
        subject,
        text
    })

    res.status(response.status).send(response.message)
}
catch(err)
{
    console.error("error ",err);
    res.status(500).json({message:"error"})
    
}
})


app.get("/checkemail", async(req,res)=>
{
    const sql= "select password from users where email=?";


    const email =req.query.email;
    const subject="Reset Password || RamanaSoft Consulting Services"
    const text=`By using below url reset your password,${`http://${getLocalIp()}:5173/Newpassword`}`

  server.query(sql,email,(err,result)=>
    {
        if (err) {
            console.error(err); // Log the error for debugging purposes.
            return res.status(500).json({ status: "500", message: "Internal Server Error" });
        }

        if (result.length > 0) {
            
            const response=  sendmail(email,{
                subject,
                text
            })
            if(response.status==="200")
                {
                    console.log("reset mail sended")
                }
                else{
                    console.log("error in reset mail")
                }
            

            return res.status(200).json({ status: "200", message: `${email}` });

        } else {
            return res.status(404).json({ status: "404", message: "Email not exists" });
        }
    })


    const sendmail = async(to,mailOptions)=>
        {
         const transport=   nodemailer.createTransport({
                host:'smtp.zeptomail.in',
                port:587,
                auth:{
                    user:"emailapikey",
                    pass:'PHtE6r1eROHrjG968hhW7fbuF8LwZoMqru1nfgRG4YxKAqAFSU1QotAjxGfj/hl+VaQWE/aby91ouOmbu+PXJWq+MTlPCGqyqK3sx/VYSPOZsbq6x00cuFgZckHYUYbnc9Bq3CDVud3YNA=='
                }
            })
    
            const options =
            {
                to:to,
                from: 'noreply@ramanasoft.in',
                ...mailOptions
            }
    
            try{
                await transport.sendMail(options);
                console.log("email sent successfully")
                return { status:200, message:'email sent successfully'}
            }
            catch(err)
            {
                console.error("Error in mail sending",err)
                return {status:500, message:'Error in mail sending'}
            }
        }

})

app.post("/update_password",(req,res)=>
    {
        
        const { userEmail, password } = req.body;
        console.log(userEmail,password);


        const query = "update users set password = ? where email=?";

        server.query(query,[password,userEmail],(err,result)=>
        {
            if(err) 
                {
                    console.log(err);
                    return res.status(404).send("Invalid Email ");
                   
                }
            return res.status(200).send("password updated successfully");

        })



    })


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})