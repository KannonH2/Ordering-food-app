import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Link from "next/link";
import {MongoClient} from 'mongodb'

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [close, setClose] = useState(true);

  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Link href="/admin">
     <button className={styles.accessButtons}>Productos</button>
        </Link>
        <Link href="/admin/orders">
     <button className={styles.accessButtons}>Ordenes</button>
        </Link>
     </div>
      <div className={styles.itemProducts}>
        <h1 className={styles.title}>Productos</h1>
        <table className={styles.tableProducts}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.thTitle1}>Imagen</th>
              <th className={styles.thTitle2}>Descripcion</th>
              <th className={styles.thTitle3}>Titulo</th>
              <th className={styles.thTitle4}>Precio</th>
              <th className={styles.thTitle5}>Accion</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td className={styles.imageContainer}>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td className={styles.productId}>
                  {product.desc}
                </td>
                <td className={styles.productTitle}>{product.title}</td>
                <td className={styles.productPrice}>${product.prices[0]}</td>
                <td className={styles.stageButtonContainer}>
                  <Link
                    href="/admin/products/[id]"
                    as={`/admin/products/${product._id}`}
                  >
                    <button className={styles.stageButton}>Editar</button>
                  </Link>
                  <button
                    className={styles.stageButton}
                    onClick={() => handleDelete(product._id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {!close && <UpdateProduct setClose={setClose} products={products} />}
    </div>
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
  const products = await productsCollection.find().toArray();

  const ordersCollection = db.collection("orders");
  const orders = await ordersCollection.find().toArray();

  client.close();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}

export default Index;
