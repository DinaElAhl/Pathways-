// Vercel Serverless Function for Pathways Auth API
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const mongoUri = process.env.MONGODB_URI;
const client = new MongoClient(mongoUri);

export default async function handler(req, res) {
    // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
        return res.status(200).end();
  }

  try {
        const db = client.db('pathways');
        const usersCollection = db.collection('users');

      // REGISTER
      if (req.method === 'POST' && req.body.action === 'register') {
              const { email, password, name } = req.body;

          const existingUser = await usersCollection.findOne({ email });
              if (existingUser) {
                        return res.status(400).json({ error: 'User already exists' });
              }

          const hashedPassword = await bcrypt.hash(password, 10);
              const result = await usersCollection.insertOne({
                        email,
                        password: hashedPassword,
                        name,
                        createdAt: new Date()
              });

          res.status(201).json({ 
                                       success: true, 
                    userId: result.insertedId,
                    message: 'User registered successfully' 
          });
      }

      // LOGIN
      else if (req.method === 'POST' && req.body.action === 'login') {
              const { email, password } = req.body;

          const user = await usersCollection.findOne({ email });
              if (!user) {
                        return res.status(401).json({ error: 'Invalid credentials' });
              }

          const isValidPassword = await bcrypt.compare(password, user.password);
              if (!isValidPassword) {
                        return res.status(401).json({ error: 'Invalid credentials' });
              }

          res.status(200).json({
                    success: true,
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                    message: 'Login successful'
          });
      }

      // GET USER
      else if (req.method === 'GET') {
              const { userId } = req.query;
              const ObjectId = require('mongodb').ObjectId;

          const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
              if (!user) {
                        return res.status(404).json({ error: 'User not found' });
              }

          res.status(200).json({
                    userId: user._id,
                    email: user.email,
                    name: user.name
          });
      }

      else {
              res.status(405).json({ error: 'Method not allowed' });
      }

  } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
