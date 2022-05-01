import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const DATABASE_NAME = "DonJuan";
  const DATABASE_PASSWORD = "fernando";

  if (req.method === "POST") {
    const client = await MongoClient.connect(
      `mongodb+srv://manax:${DATABASE_PASSWORD}@donjuan.wm8z2.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
    );
    const db = client.db();
    const productsCollection = db.collection("products");
    await productsCollection.insertOne(req.body);

    client.close();

    res.status(201).send({ Message: "Meal inserted" });
  }

  if (req.method === "GET") {
    const client = await MongoClient.connect(
      `mongodb+srv://manax:${
        DATABASE_PASSWORD
      }@donjuan.wm8z2.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
    );
    const db = client.db();

    const productsCollection = db.collection("products");
    const products = await productsCollection.find({}).toArray();

    client.close();

    res.status(200).send(products);
  }

};

export default handler;