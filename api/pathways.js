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
                  const pathwayCollection = client.db('Pathway').collection('pathways');
                      if (req.method === 'GET') {
                            const { id } = req.query;
                                  if (id) {
                                          const pathway = await pathwayCollection.findOne({ _id: id });
                                                  return res.status(200).json({ success: true, pathway: pathway || null });
                                                        }
                                                              const pathways = await pathwayCollection.find({}).toArray();
                                                                    return res.status(200).json({ success: true, pathways: pathways || [] });
                                                                        } else if (req.method === 'POST') {
                                                                              const { title, description, category, courses } = req.body;
                                                                                    if (!title || !description) {
                                                                                            return res.status(400).json({ success: false, error: 'Missing title or description' });
                                                                                                  }
                                                                                                        const result = await pathwayCollection.insertOne({
                                                                                                                title, description, category: category || 'General', courses: courses || [], rating: 0, students: 0, createdAt: new Date()
                                                                                                                      });
                                                                                                                            res.status(201).json({ success: true, message: 'Pathway created', pathway: { _id: result.insertedId, title } });
                                                                                                                                }
                                                                                                                                  } catch (error) {
                                                                                                                                      res.status(500).json({ success: false, error: 'Internal server error: ' + error.message });
                                                                                                                                        } finally {
                                                                                                                                            await client.close();
                                                                                                                                              }
                                                                                                                                              }
