// import { useState } from "react";
// import styles from "../styles/Add.module.css";
// import axios from "axios";

// const UpdateProduct = ({ setClose, products, pizza}) => {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState(null);
//   const [desc, setDesc] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [prices, setPrices] = useState([]);
//   const [extraOptions, setExtraOptions] = useState([]);
//   const [extra, setExtra] = useState(null);

//   console.log(pizza);
  


//   const changePrice = (e, index) => {
//     const currentPrices = prices;
//     currentPrices[index] = e.target.value;
//     setPrices(currentPrices);
//   };

//   const handleExtraInput = (e) => {
//     setExtra({ ...extra, [e.target.name]: e.target.value });
//   };

//   const handleExtra = (e) => {
//     setExtraOptions((prev) => [...prev, extra]);
//   };

//   const handleCategory = (e) => {
//     setCategory(e.target.value);
//   };


//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append("desc", desc);
//     formData.append("category", category);
//     formData.append("prices", JSON.stringify(prices));
//     formData.append("extraOptions", JSON.stringify(extraOptions));

//     try {
//       const res = await axios.put("http://localhost:3000/api/products", formData);
//       setClose(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // const handleCreate = async () => {
//   //   const data = new FormData();
//   //   data.append("file", file);
//   //   data.append("upload_preset", "uploads");
//   //   try {
//   //     const uploadRes = await axios.post(
//   //       "https://api.cloudinary.com/v1_1/donjuanpizzeria/image/upload",
//   //       data
//   //     );

//   //     const { url } = uploadRes.data;
//   //     const newProduct = {
//   //       title,
//   //       desc,
//   //       prices,
//   //       category,
//   //       extraOptions,
//   //       img: url,
//   //     };

//   //     await axios.post("http://localhost:3000/api/products", newProduct);
//   //     setClose(true);
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // };
 


//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <span onClick={() => setClose(true)} className={styles.close}>
//           X
//         </span>
//         <h1>Añadir nuevo Producto</h1>
//         <div className={styles.item}>
//           <label className={styles.label}>Elegir Imagen</label>
//           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//         </div>
//         <div className={styles.item}>
//           <label className={styles.label}>Titulo</label>
//           <input
//             className={styles.input}
//             type="text"
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//         </div>
//         <div className={styles.item}>
//           <label className={styles.label}>Descripcion</label>
//           <textarea
//             className={styles.textarea}
//             rows={9}
//             type="text"
//             onChange={(e) => setDesc(e.target.value)}
//             value={products.desc}
//             placeholder={products.desc}
//             required
//           />
//         </div>
//         <div className={styles.priceCategory}>
//           <div className={styles.category}>
//             <label className={styles.label}>Categoria</label>
//             <select onChange={handleCategory} required>
//               <option value="">Seleccionar</option>
//               <option value="pizza">Pizza</option>
//               <option value="burger">Burger</option>
//               <option value="milanesa">Milanesa</option>
//               <option value="sandwich">Sandwich</option>
//               <option value="papas">Papafritas</option>
//               <option value="bebida">Bebida</option>
//               <option value="postre">Postre</option>
//             </select>
//           </div>
//           {category === "pizza" ? (
//             <>
//               <label className={styles.priceLabel}>Precios</label>
//               <div className={styles.priceContainer}>
//                 <input
//                   className={`${styles.input} ${styles.inputSm}`}
//                   type="number"
//                   placeholder="Media"
//                   onChange={(e) => changePrice(e, 0)}
//                 />
//                 <input
//                   className={`${styles.input} ${styles.inputSm}`}
//                   type="number"
//                   placeholder="Grande"
//                   onChange={(e) => changePrice(e, 1)}
//                 />
//               </div>
//             </>
//           ) : category === "burger" ? (
//             <>
//               <label className={styles.priceLabel}>Precios</label>
//               <div className={styles.priceContainer}>
//                 <input
//                   className={`${styles.input} ${styles.inputSm}`}
//                   type="number"
//                   placeholder="Simple"
//                   onChange={(e) => changePrice(e, 0)}
//                 />
//                 <input
//                   className={`${styles.input} ${styles.inputSm}`}
//                   type="number"
//                   placeholder="Doble"
//                   onChange={(e) => changePrice(e, 1)}
//                 />
//               </div>
//             </>
//           ) : category === "papas" ? (
//             <>
//               <label className={styles.priceLabel}>Precios</label>
//               <div className={styles.priceContainer}>
//                 <input
//                   className={`${styles.input} ${styles.inputSm}`}
//                   type="number"
//                   placeholder="Chicas"
//                   onChange={(e) => changePrice(e, 0)}
//                 />
//                 <input
//                   className={`${styles.input} ${styles.inputSm}`}
//                   type="number"
//                   placeholder="Grandes"
//                   onChange={(e) => changePrice(e, 1)}
//                 />
//               </div>
//             </>
//           ) : (
//             <>
//               <label className={styles.priceLabel}>Precios</label>
//               <div className={styles.priceContainer}>
//                 <input
//                   className={`${styles.input} ${styles.inputSm}`}
//                   type="number"
//                   placeholder="Precio"
//                   onChange={(e) => changePrice(e, 0)}
//                 />
//               </div>
//             </>
//           )}
//         </div>
//         <div className={styles.item}>
//           <label className={styles.label}>Tipo de Entregas</label>
//           <div className={styles.extra}>
//             <input
//               className={`${styles.input} ${styles.inputSm}`}
//               type="text"
//               placeholder="Tipo de Entrega"
//               name="text"
//               onChange={handleExtraInput}
//             />
//             <input
//               className={`${styles.input} ${styles.inputSm}`}
//               type="number"
//               placeholder="Precio"
//               name="price"
//               onChange={handleExtraInput}
//             />
//             <button className={styles.extraButton} onClick={handleExtra}>
//               Agregar
//             </button>
//           </div>
//           <div className={styles.extraItems}>
//             {extraOptions.map((option) => (
//               <span key={option.text} className={styles.extraItem}>
//                 {option.text}
//               </span>
//             ))}
//           </div>
//         </div>
//         <button className={styles.addButton} onClick={handleUpdate}>
//           Actualizar Producto
//         </button>
//       </div>
//     </div>
//   );
// };

// export const getServerSideProps = async (ctx) => {
//   const myCookie = ctx.req?.cookies || "";
//   let admin = false;

//   if (myCookie.token === process.env.TOKEN) {
//     admin = true;
//   }

//   const res = await axios.get("http://localhost:3000/api/products");
//   return {
//     props: {
//       pizza: res.data,
//       admin,
//     },
//   };
// };

// export default UpdateProduct;

import React, {useState, useEffect} from "react";
import axios from "axios";

import PizzaCard from "../components/PizzaCard";
import styles from "../styles/productsList.module.css";
import Footer from "../components/Footer";

const UpdateProduct = ({ pizzas }) => {
  const [category, setCategory] = useState(null);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    setCategory("all");
  }, [pizzas]); 

  console.log(pizzas);

  return (
    <>
      <div className={styles.container}>
        <span className={styles.selectText}>Seleccionar Categoria</span>
        <div className={styles.filter}>
          <select onChange={handleCategory} required>
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
            pizzas
              .map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)}
      </div>
      <Footer/>
    </>
  );
};

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

export default UpdateProduct;
