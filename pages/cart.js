import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetails";
import Footer from "../components/Footer";
import {MongoClient} from 'mongodb';

const Cart = ({ pizzas }) => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  

  console.log(pizzas);

  const createOrder = async (data) => {
    const url = process.env.VERCEL_URL;
    try {
      const res = await axios.post(url, data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setOpen(true);
    setCash(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Producto</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </tbody>
            <tbody>
              {cart.products.map((product) => (
                <tr className={styles.tr} key={product._id}>
                  <td className={styles.imgTd} id={styles.border}>
                    <div className={styles.imgContainer}>
                      <Image
                        src={product.img}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                      />
                    </div>
                  </td>
                  <td className={styles.titleTd} id={styles.border}>
                    <span className={styles.name}>{product.title}</span>
                  </td>
                  <td id={styles.border}>
                    <span className={styles.price}>${product.price}</span>
                  </td>
                  <td id={styles.border}>
                    <span className={styles.quantity}>{product.quantity}</span>
                  </td>
                  <td>
                    <span className={styles.total}>
                      ${product.price * product.quantity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>TOTAL DEL CARRITO</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Descuento:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>${cart.total}
            </div>
            <button onClick={handleClick} className={styles.button}>
              HACER PEDIDO AHORA!
            </button>
          </div>
        </div>
        {cash && (
          <OrderDetail
            total={cart.total}
            productsDetail={cart.products.map((product) => ({
              title: product.title,
              price: product.price,
              quantity: product.quantity,
            }))}
            createOrder={createOrder}
            setOpen={setOpen}
            setCash={setCash}
          />
        )}
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

export default Cart;
