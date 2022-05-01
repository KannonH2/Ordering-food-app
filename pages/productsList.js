import React, { useState, useEffect } from "react";
import axios from "axios";
import PizzaCard from "../components/PizzaCard";
import styles from "../styles/ProductsList.module.css";
import Footer from "../components/Footer";
import { MongoClient } from "mongodb";

const productsList = ({ pizzas }) => {
  const [category, setCategory] = useState(null);

  const options = [
    { value: "all", label: "Todo" },
    { value: "pizza", label: "Pizzas" },
    { value: "burger", label: "Burgers" },
    { value: "milanesa", label: "Milanesas" },
    { value: "sandwich", label: "Sandwiches" },
    { value: "papas", label: "Papafritas" },
    { value: "bebida", label: "Bebidas" },
    { value: "postre", label: "Postres" },
  ];

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    setCategory("all");
  }, [pizzas]); // eslint-disable-line

  return (
    <>
      <div className={styles.container}>
        <span className={styles.selectText}>Seleccionar Categoria</span>
        <div className={styles.filter}>
          <select onChange={handleCategory}>
            <option value="all">Todo</option>
            <option value="pizza">Pizza</option>
            <option value="burger">Burger</option>
            <option value="milanesa">Milanesa</option>
            <option value="sandwich">Sandwich</option>
            <option value="papas">Papafritas</option>
            <option value="bebida">Bebida</option>
            <option value="postre">Postre</option>
          </select>
        </div>
      </div>
      <div className={styles.container}>
        {category === "burger"
          ? pizzas
              .filter((pizza) => pizza.category === "burger")
              .map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)
          : category === "pizza" &&
            pizzas
              .filter((pizza) => pizza.category === "pizza")
              .map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)}
        {category === "milanesa"
          ? pizzas
              .filter((pizza) => pizza.category === "milanesa")
              .map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)
          : category === "sandwich" &&
            pizzas
              .filter((pizza) => pizza.category === "sandwich")
              .map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)}
        {category === "papas"
          ? pizzas
              .filter((pizza) => pizza.category === "papas")
              .map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)
          : category === "bebida" &&
            pizzas
              .filter((pizza) => pizza.category === "bebida")
              .map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)}
        {category === "postre"
          ? pizzas
              .filter((pizza) => pizza.category === "postre")
              .map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)
          : category === "all" &&
            pizzas.map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)}
      </div>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
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
    },
  };
}

export default productsList;
