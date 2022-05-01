import { useState } from "react";
import Head from "next/head";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import { MongoClient } from "mongodb";

export default function Home({ pizzas, admin }) {
  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizzeria Don Juan</title>
        <meta name="description" content="Las Mejores pizzas de la ciudad" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {<AddButton setClose={setClose}/>}
      <PizzaList pizzas={pizzas} />
      {!close && <Add setClose={setClose}/>}
      <Footer/>
    </div>
  );
}

export async function getStaticProps(ctx) {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const DATABASE_NAME = "DonJuan";
  const DATABASE_PASSWORD = "fernando";

  const client = await MongoClient.connect(
    `mongodb+srv://manax:${DATABASE_PASSWORD}@donjuan.wm8z2.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
  );
  const db = client.db();
  const productsCollection = db.collection("products");
  const pizzas = await productsCollection.find().toArray();

  client.close();

  return {
    props: {
      pizzas: JSON.parse(JSON.stringify(pizzas)),
      admin,
    },
  };
}
