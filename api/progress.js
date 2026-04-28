import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
  }

  try {
        await client.connect();
        const database = client.db('Pathway');
        const progressCollection = database.collection('progress');

      if (req.method === 'POST') {
              const { userId, pathwayId, courseId, progress, status } = req.body;

          if (!userId || !pathwayId || typeof progress !== 'number') {
                    return res.status(400).json({
                                success: false,
                                error: 'Missing required fields: userId, pathwayId, progress'
                    });
          }

          const result = await progressCollection.updateOne(
            { userId, pathwayId, courseId },
            {
                        $set: {
                                      userId,
                                      pathwayId,
                                      courseId,
                                      progress: Math.min(100, Math.max(0, progress)),
                                      status: status || 'in-progress',
                                      lastUpdated: new Date()
                        }
            },
            { upsert: true }
                  );

          res.status(200).json({
                    success: true,
                    message: 'Progress saved successfully',
                    data: result
          });
      } else if (req.method === 'GET') {
              const { userId, pathwayId } = req.query;

          if (!userId || !pathwayId) {
                    return res.status(400).json({
                                success: false,
                                error: 'Missing required query parameters: userId, pathwayId'
                    });
          }

          const progress = await progressCollection.findOne({
                    userId,
                    pathwayId
          });

          res.status(200).json({
                    success: true,
                    progress: progress || {
                                userId,
                                pathwayId,
                                progress: 0,
                                status: 'not-started'
                    }
          });
      } else {
              res.status(405).json({
                        success: false,
                        error: 'Method not allowed'
              });
      }
  } catch (error) {
        console.error('Progress API error:', error);
        res.status(500).json({
                success: false,
                error: 'Internal server error: ' + error.message
        });
  } finally {
        await client.close();
  }
}
