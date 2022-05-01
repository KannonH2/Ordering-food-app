import axios from "axios";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";

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

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzas: res.data,
      admin,
    },
  };
};
