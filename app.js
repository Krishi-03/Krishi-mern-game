const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const path = require('path');
const { message } = require('statuses');

app.use(bodyParser.json({ limit: '100mb' }));
const port = 3000;
app.use(cors());

const uri = "mongodb+srv://krishidesai2003:nirma123@cluster0.ewmz0x1.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static('public'));
app.use(express.json());


async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Make username required if needed
  email: { type: String, required: true, unique: true },
  isAdmin: {type: Boolean, required: true, default:false},
  password: { type: String, required: true },
  numOfGames: { type: Number, default: 0 }, // Optional, tracks games played
  maxScore: { type: Number, default: 0 } // Optional, stores highest score
});

const User = mongoose.model('User', userSchema);

app.listen(port, () => {
    connect();
    console.log(`Server is running on port ${port}`);
});

// User Login
app.post('/login', async (req, res) => {
    const { p_email, p_pass } = req.body;
    try {
        console.log(p_email+p_pass);
        // Check if the username exists
        const existingUser = await User.findOne({email: p_email});
        if (!existingUser) {
            return res.json({ success: false, message: 'Username not found. Please register first.' });
        }
        // Validate password
        if (existingUser.password !== p_pass) {
            return res.json({ success: false, message: 'Incorrect password.'});
        }
        if(existingUser.isAdmin){
            return res.json({ success: false, message: 'Admin Login not allowed.'})
        }
            // sessionStorage.setItem("mxscore",user.maxScore);
        return res.json({ success: true, message: 'Login successful.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// User Registration
app.post('/register', async (req, res) => {
    const { p_name,p_email, p_pass } = req.body;

    try {
        // Check if the username already exists
        console.log("app");
        const existingUser = await User.findOne({ email:p_email });
        if (existingUser) {
            return res.json({ success: false, message: 'Username already exists. Please choose a different one.' });
        }
        const newUser = new User({username: p_name,email: p_email, password: p_pass, numOfGames: 0,maxScore: 0});
        await newUser.save();
        return res.json({ success: true, message: 'Registration successful.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Update user score
app.post('/updateUserscore', async (req, res) => {
  const { username, score } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, maxScore: score});
    } else {
      user.maxScore = Math.max(user.maxScore, score);
      user.numOfGames++;
    }
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update user details
app.put('/admin/updateuser/:username', async (req, res) => {
    const {username} = req.params;  
    const { email, password } = req.body;    
    // res.send(username+email+password);
    // console.log(name);  
    try {
        const user = await User.findOne({ username});
        if (user && !user.isAdmin){
            user.email=email;
            user.password=password;
            await user.save();
            res.status(200).json({ success: true, message: 'Updated user details successfully!' });
        }
        else{
            console.log(username);
            // res.json(name);
            res.status(404).json({ error: 'User not found '});
        }            
    }
    catch (error){
        res.status(500).json({ error: 'Internal Server error '});
    }
});

// Delete a user
app.delete('/deleteuser', async (req, res) => {
    const {username} = req.body;
    try {
        const deleteduser = await User.deleteOne({ username });
        // Respond with the user details
        res.status(200).json({ success: true, message: 'Deleted user successfully!' });
    } catch (error) {
        // res.send("nhi aaya");
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Admin Registration
app.post('/adminregister', async (req, res) => {
    const { p_name,p_email, p_pass } = req.body;

    try {
        // Check if the username already exists
        console.log("app");
        const existingUser = await User.findOne({ email:p_email,isAdmin: true });
        if (existingUser) {
            return res.json({ success: false, message: 'Admin username already exists. Please choose a different one.' });
        }
        if(p_pass=='4dm1n72'){
            const newUser = new User({username: p_name,email: p_email, password: p_pass, isAdmin: true, numOfGames: 0,maxScore: 0});
            await newUser.save();
        }
        else{
            return res.json({ success: false, message: 'Check your credentials.' });
        }

        return res.json({ success: true, message: 'Registration successful.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Admin Login
app.post('/adminlogin', async (req, res) => {
    const { p_email, p_pass } = req.body;
    try {
        console.log(p_email+p_pass);
        // Check if the username exists
        const existingUser = await User.findOne({email: p_email});
        if (!existingUser) {
            return res.json({ success: false, message: 'Admin username not found. Please register as an admin first.' });
        }
        // Validate password
        if (p_pass !== '4dm1n72' || existingUser.isAdmin==false) {
            return res.json({ success: false, message: 'Access Denied.'});
        }
            // sessionStorage.setItem("mxscore",user.maxScore);
        return res.json({ success: true, message: 'Access Granted.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Admin Dashboard
app.get('/users', async (req, res) => {
    try {
        await connect();

        // Access the database
        const db = mongoose.connection;

        // Fetch all users
        const allUsers = await User.find().exec();

        // Respond with the user details
        res.json(allUsers);
    } catch (error) {
        // res.send("nhi aaya");
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// User Dashboard
app.get('/api/user/:username', async (req, res) => {
    const {username} = req.params;   
    // console.log(name);  
    try {
        const user = await User.findOne({ username });
        if (user && (user.isAdmin==false)){
            res.json(user);
        }
        else{
            console.log(username);
            // res.json(name);
            res.status(404).json({ error: 'User not found '});
        }            
    }
    catch (error){
        res.status(500).json({ error: 'Internal Server error '});
    }
});

app.put('/user/updateuser/:username', async (req, res) => {
    const {username} = req.params;  
    const { email, password } = req.body;    
    // res.send(username+email+password);
    // console.log(name);  
    try {
        const user = await User.findOne({ username});
        if (user && !user.isAdmin){
            user.email=email;
            user.password=password;
            await user.save();
            res.status(200).json({ success: true, message: 'Updated user details successfully!' });
        }
        else{
            console.log(username);
            // res.json(name);
            res.status(404).json({ error: 'User not found '});
        }            
    }
    catch (error){
        res.status(500).json({ error: 'Internal Server error '});
    }
});


