import React from 'react'
import axios from 'axios'
import OrdersList from '../../../components/OrdersList.js'
import {MongoClient} from 'mongodb'

const index = ({ orders, products}) => {
  return (
    <div>
      <OrdersList orders={orders} products={products}/>
    </div>
  )
}

export async function getStaticProps() {
  const DATABASE_NAME = "DonJuan";
  const DATABASE_PASSWORD = "fernando";

  const client = await MongoClient.connect(
    `mongodb+srv://manax:${DATABASE_PASSWORD}@donjuan.wm8z2.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
  );
  const db = client.db();
  const productsCollection = db.collection("products");
  const pizzas = await productsCollection.find().toArray();

  const ordersCollection = db.collection("orders");
  const orders = await ordersCollection.find().toArray();

  client.close();

  return {
    props: {
      pizzas: JSON.parse(JSON.stringify(pizzas)),
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}

export default index