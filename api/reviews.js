import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.status(200).end(); return; }
    try {
          await client.connect();
          const reviewCollection = client.db('Pathway').collection('reviews');
          if (req.method === 'POST') {
                  const { userId, pathwayId, rating, comment } = req.body;
                  if (!userId || !pathwayId || !rating) {
                            return res.status(400).json({ success: false, error: 'Missing required fields' });
                          }
                  const result = await reviewCollection.insertOne({
                            userId, pathwayId, rating: Math.min(5, Math.max(1, rating)), comment: comment || '', verified: true, createdAt: new Date()
                          });
                  res.status(201).json({ success: true, message: 'Review submitted', review: { _id: result.insertedId, rating } });
                } else if (req.method === 'GET') {
                  const { pathwayId } = req.query;
                  if (!pathwayId) {
                            return res.status(400).json({ success: false, error: 'Missing pathwayId' });
                          }
                  const reviews = await reviewCollection.find({ pathwayId }).toArray();
                  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
                  res.status(200).json({ success: true, reviews: reviews || [], averageRating: parseFloat(avgRating), totalReviews: reviews.length });
                }
        } catch (error) {
          res.status(500).json({ success: false, error: 'Internal server error: ' + error.message });
        } finally {
          await client.close();
        }
  }
