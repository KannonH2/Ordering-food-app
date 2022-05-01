import React from 'react'
import axios from 'axios'
import OrdersList from '../../../components/OrdersList.js'
import { connectToDatabase } from "../../../util/mongodb";

const index = ({ orders, products}) => {
  return (
    <div>
      <OrdersList orders={orders} products={products}/>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  //const productRes = await axios.get("http://localhost:3000/api/products");
  //const orderRes = await axios.get("http://localhost:3000/api/orders");
  
  const {db} = await connectToDatabase();
  const productRes = db.collection("products");
  const orderRes = db.collection("orders");
  const products = await productRes.find({}, {_id:0}).toArray();
  const orders = await orderRes.find({}, {_id:0}).toArray();
  

  return {
    props: {
      products:JSON.parse(JSON.stringify(products)),
      orders:JSON.parse(JSON.stringify(orders)),
    },
  };
};

export default index