import { MongoClient } from "mongodb";
// api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const dbPassword = process.env.PASSWORD;
    if (!dbPassword) {
      res.status(500).json({
        message: "Database password not set in environment variables.",
      });
      return;
    }

    const client = await MongoClient.connect(
      `mongodb+srv://omjjamnekar:${dbPassword}@react-learning.2psxwhb.mongodb.net/meetup?retryWrites=true&w=majority&appName=React-learning`
    );

    const db = client.db();
    const meetupCollection = db.collection("meetup");

    const result = await meetupCollection.insertOne(data);
    console.log(result);

    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
