const express = require("express");
const cors = require("cors");


const fetch = (...args) => 
        import('node-fetch').then(({default: fetch}) => fetch(...args));

require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cors())

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;



app.listen(3005, ()=> {
    console.log("server running ...");
})


app.get('/', (req,res) => {
    res.status(200).json({status: "Server up and running..."});
});

// get access token

app.get("/getAccessToken", async (req,res) => {

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

    await fetch("https://github.com/login/oauth/access_token"+params, {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log("data ", data);
        res.json(data);
    });



});

// get user data

app.get("/getUserData", async (req,res) => {
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    }).then(response => response.json())
    .then((data) => {
        console.log("data user, ",data);
        res.json(data)
    });
});