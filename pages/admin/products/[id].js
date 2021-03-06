import styles from "../../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { addProduct } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import Footer from "../../../components/Footer";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const updateData = () => {
    const data = {
      pizza,
      price,
      size,
      quantity,
      extras,
    };
    dispatch(addProduct(data));
  };


  const handleUpdate = async (e) => {
    const formData = new FormData();
    formData.append("title", pizza.title);
    formData.append("desc", pizza.desc);
    formData.append("category", pizza.category);
    formData.append("prices", JSON.stringify(pizza.prices));
    formData.append("extraOptions", JSON.stringify(pizza.extraOptions));
    try {
      const res = await axios.put("http://localhost:3000/api/products", formData);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };
  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
    console.log(difference);
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
    dispatch(addProduct({ ...pizza, extras, price, delivery, quantity }));
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
        <button 
          onClick={() => handleUpdate()}
        >edit</button>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>

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
          <div className={styles.sizes}>
            <div className={styles.size}>
              <span className={styles.number}>Unico Tama??o</span>
            </div>
          </div>
        )}
        <h3 className={styles.choose}>Elige que tipo de Entrega quieres</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double" className={styles.checkboxText}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `https://donjuan-pizzeria.vercel.app/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
