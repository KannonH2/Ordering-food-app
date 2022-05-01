import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Link from "next/link";

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
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
