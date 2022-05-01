import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";


const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Elige un Tamaño</h3>

        {pizza.category === "burger" ? (
          <div className={styles.sizes}>
            <div className={styles.size} onClick={() => handleSize(0)}>
              <Image src="/img/simple.png" layout="fill" alt="" />
              <span className={styles.number}>Simple</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(1)}>
              <Image src="/img/doble.png" layout="fill" alt="" />
              <span className={styles.number}>Doble</span>
            </div>
          </div>
        ) : pizza.category === "pizza" ? (
          <div className={styles.sizes}>
            <div className={styles.size} onClick={() => handleSize(0)}>
              <Image src="/img/media-pizza.png" layout="fill" alt="" />
              <span className={styles.number}>Media</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(1)}>
              <Image src="/img/size.png" layout="fill" alt="" />
              <span className={styles.number}>Grande</span>
            </div>
          </div>
        ) : pizza.category === "papas" ? (
          <div className={styles.sizes}>
            <div className={styles.size} onClick={() => handleSize(0)}>
              <Image src="/img/papas-chicas.png" layout="fill" alt="" />
              <span className={styles.number}>Chicas</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(1)}>
              <Image src="/img/papas-grandes.png" layout="fill" alt="" />
              <span className={styles.number}>Grandes</span>
            </div>
          </div>
        ) : (
          <div className={styles.uniqueSizes}>
            <div className={styles.uniqueSize}>
              <span className={styles.UniqueNumber}>Unico Tamaño</span>
            </div>
          </div>
        )}
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};


 export const getServerSideProps = async ({ params }) => {
  let baseUrl = "http://localhost:3000";
  if (baseUrl) {
    baseUrl = "https://donjuan-pizzeria.vercel.app/";
  }
  const res = await axios.get(`${baseUrl}/api/products/${params.id}`);
  
  return {
    props: { pizza: res.data },
  };
};



export default Product;
