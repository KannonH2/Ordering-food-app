// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../util/mongo";
import Products from "../../../models/Products";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const products = await Products.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ err });
    }
  }

  if (method === "POST") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json({ err: "Unauthorized" });
    }

    try {
      const product = await Products.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}
