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

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");
  


  return {
    props: {
      products: productRes.data,
      orders: orderRes.data,
    },
  };
};

export default index