import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
          res.status(200).end();
          return;
    }
    if (req.method !== 'GET') {
          return res.status(405).json({ success: false, error: 'Method not allowed' });
    }
    try {
          await client.connect();
          const database = client.db('Pathway');
          const pathwayCollection = database.collection('pathways');
          const { q, category, limit = 10, trending } = req.query;
          let query = {};
          if (trending) {
                  query = {};
          } else if (q) {
                  query = {
                            $or: [
                              { title: { $regex: q, $options: 'i' } },
                              { description: { $regex: q, $options: 'i' } }
                                      ]
                  };
          }
          if (category) {
                  query.category = category;
          }
          const results = await pathwayCollection
            .find(query)
            .limit(parseInt(limit))
            .toArray();
          res.status(200).json({
                  success: true,
                  results: results || [],
                  total: results.length
          });
    } catch (error) {
          res.status(500).json({
                  success: false,
                  error: 'Internal server error: ' + error.message
          });
    } finally {
          await client.close();
    }
}
