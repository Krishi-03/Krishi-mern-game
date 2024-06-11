const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
 

const app = express();
// Connection URL for your MongoDB database
//const url = "mongodb+srv://lakshin2563:nirma123@cluster0.qtmkizi.mongodb.net/?retryWrites=true&w=majority";

const url = "mongodb+srv://krishidesai2003:nirma123@cluster0.vatkc8j.mongodb.net/?retryWrites=true&w=majorityy";

// Name of the database
const dbName = 'user'; // Change this to your database name


//const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/login', async (req, res) => {
    try {
      const { p_email, p_pass } = req.body;
      console.log(p_email+p_pass);
      // Connect to MongoDB
      await client.connect();
      //console.log('ok');
      // Access the database
      const db = client.db(dbName);
  
      // Check if the username exists
      const existingUser = await db.collection('user').findOne({email: p_email  });
      console.log(p_email+p_pass+"krishi");
      if (!existingUser) {
        return res.json({ success: false, message: 'Username not found. Please register first.'});
      }
  
      // Validate password
      if (existingUser.password !== p_pass) {
        return res.json({ success: false, message: 'Incorrect password.'});
      }
  
      // Respond with a success message
      res.json({ success: true, message: 'Login successful!'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
      // Close the MongoDB connection
      await client.close();
    }
  });

router.post('/register', async (req, res) => {
    // console.log("ok");
    try {
      const { p_name, p_email, p_pass } = req.body;
  
      // Connect to MongoDB
      await client.connect();
      
    
  
      // Access the database
      const db = client.db(dbName);
  
  
      console.log("chala?"+p_email);
      // Check if the username already exists
      const existingUser = await db.collection('user').findOne({email:p_email });
      if (existingUser) {
        return res.json({ success: false, message: ' Username already exists. Please choose a different one.' });
      }
  
      // Insert the new user into the database
      await db.collection('user').insertOne({username: p_name,email: p_email, password: p_pass });
  
      // Respond with a success message
      res.json({ success: true, message: 'Registration successful!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
      // Close the MongoDB connection
      await client.close();
    }
});
router.get('/api/user/:username',async (req,res) =>{
    const {username} = req.query;   
    console.log("router");  
    try {
        const user = await User.findOne({ username });
        if (user){
            res.json(user);
        }
        else{
            console.log(name);
            res.status(404).json({ error: 'User not found '});
        }            
    }
    catch (error){
        res.status(500).json({ error: 'Internal Server error '});
    }
});
  
module.exports=router;