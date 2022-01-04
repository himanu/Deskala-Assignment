const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require("dotenv")
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(bodyparser.json());
dotenv.config();

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zmg0v.mongodb.net/deskala?retryWrites=true&w=majority`;
const client = new MongoClient(url);

app.get('/candidate/:username',async(req,res)=>{
    try {
        const username = req.params.username;
        console.log(username);
        await client.connect();
        const collection = client.db().collection('users');
        const document = await collection.findOne({username});
        const candidates = document.candidates;
        console.log('candidates ', candidates); 
        res.status(200).send({success: true, candidates});
    } catch(err) {
        console.log("Error occured ",err);
        res.status(500).send({
            error: true,
            message: "Server error"
        })
    }
    res.end();
})

app.post('/candidate',async(req,res)=>{
    try {
        const {username, name, address, dob, state, age, pin} = req.body;
        await client.connect();
        const collection = client.db().collection('users');
        const result = await collection.updateOne({
            username
        }, {
            $push: {
                candidates: {
                    id: ObjectId(),
                    name, 
                    address, 
                    dob, 
                    state, 
                    age, 
                    pin
                }
            }
        });
        console.log("pushed ", result);
        res.status(200).send({
            success: true
        })

    } catch(err) {
        console.log("Server errro ",err);
        res.status(500).send({
            error: true,
        })
    }
})

app.put('/candidate',async(req,res)=>{
    try {
        const {username, id, name, address, dob, state, age, pin} = req.body;
        await client.connect();
        const collection = client.db().collection('users');
        if(!id || !username) {
            res.status(400).send({
                error: true,
                message: "can't get the id"
            })
            return;
        }
        const result = await collection.updateOne({
            username,
            "candidates.id": ObjectId(id) 
        }, {
            $set: {
                "candidates.$.name": name, 
                "candidates.$.address": address, 
                "candidates.$.dob": dob, 
                "candidates.$.state": state, 
                "candidates.$.age": age, 
                "candidates.$.pin": pin, 
                "candidates.$.id": id
            }
        });
        console.log("updated", result);
        if(result.modifiedCount) {
            res.status(200).send({
                success: true,
                message: "Candidate is updated"
            });
        } else {
            res.status(200).send({
                success: false,
                message: "Update failed"
            });
        }
    } catch(err) {
        console.log("Server errro ",err);
        res.status(500).send({
            error: true,
        })
    }
    res.end();
})

app.delete('/candidate', async(req,res)=>{
    try {
        console.log(req.body);
        const {id, username} = req.body;
        await client.connect();
        const collection = client.db().collection('users');
        const result = await collection.updateOne({
            username
        }, {
            $pull: {
                candidates: {
                    id: ObjectId(id)
                }
            }
        });
        console.log("updated", result);
        if(result.modifiedCount) {
            res.status(200).send({
                success: true,
                error: false,
                message: 'Candidate deleted'
            })
        } else {
            res.status(200).send({
                success: false,
                error: false,
                message: 'Unable to delete candidate'
            })
        }
    } catch(err) {
        console.log("Server error ",err);
        res.status(500).send({
            error: true,
        })
    }
    res.end();
})

app.post('/login',async(req,res)=>{
    try {
        const {username, password} = req.body;
        await client.connect();
        const collection = client.db().collection('users');
        const doc = await collection.findOne({username});
        const resObj = {
            success: false,
            message: "",
            error: false
        }
        if(!doc) {
            console.log("No user found");
            resObj.message = "Email is not registered. Please sign up first";
        } else {
            const validPassword = await bcrypt.compare(password, doc.password);
            if(validPassword) {
                resObj.message = "Successful";
                resObj.success = true;
            } else {
                resObj.message = "Please input valid password";
            }
        }
        res.status(200).send(resObj);
    } catch(err) {
        console.log("Server Error ",err);
        res.status(500).send({
            error: true,
            success: false,
            message: "Server Error"
        })
    }
})

app.post('/signup',async(req,res,next)=>{
    try {
        const {username, phoneNo, password} = req.body;
        console.log(username, phoneNo, password);
        const hashedPassword = await bcrypt.hash(password,10);
        await client.connect();
        const collection = client.db().collection('users');
        const doc = await collection.findOne({username});
        if(doc) {
            console.log("Email is already registered");
            res.status(200).send({
                success: false,
                message: "Email already registered. Please login"
            })
        } else {
            const data = await collection.insertOne({
                username,
                password: hashedPassword,
                phoneNo,
                candidates: []
            });
            console.log("Collection inserted ",data);
            res.status(201).send({
                success: true,
            })
        }
    } catch(err) {
        console.log("server error ",err);
        res.status(500).send({
            error: true,
            success: false,
            message: "Server Error"
        })
    }
})

app.listen(4000,()=> console.log(`Server is on`));