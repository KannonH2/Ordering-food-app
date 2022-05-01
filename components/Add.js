import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [category, setCategory] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/donjuanpizzeria/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        category,
        extraOptions,
        img: url,
      };

      await axios.post("https://donjuan-pizzeria.vercel.app/api/products", newProduct);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Añadir nuevo Producto</h1>
        <div className={styles.item}>
          <label className={styles.label}>Elegir Imagen</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Titulo</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Descripcion</label>
          <textarea
            className={styles.textarea}
            rows={9}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div className={styles.priceCategory}>
          <div className={styles.category}>
            <label className={styles.label}>Categoria</label>
            <select onChange={handleCategory} required>
              <option value="">Seleccionar</option>
              <option value="pizza">Pizza</option>
              <option value="burger">Burger</option>
              <option value="milanesa">Milanesa</option>
              <option value="sandwich">Sandwich</option>
              <option value="papas">Papafritas</option>
              <option value="bebida">Bebida</option>
              <option value="postre">Postre</option>
            </select>
          </div>
          {category === "pizza" ? (
            <>
              <label className={styles.priceLabel}>Precios</label>
              <div className={styles.priceContainer}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Media"
                  onChange={(e) => changePrice(e, 0)}
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Grande"
                  onChange={(e) => changePrice(e, 1)}
                />
              </div>
            </>
          ) : category === "burger" ? (
            <>
              <label className={styles.priceLabel}>Precios</label>
              <div className={styles.priceContainer}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Simple"
                  onChange={(e) => changePrice(e, 0)}
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Doble"
                  onChange={(e) => changePrice(e, 1)}
                />
              </div>
            </>
          ) : category === "papas" ? (
            <>
              <label className={styles.priceLabel}>Precios</label>
              <div className={styles.priceContainer}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Chicas"
                  onChange={(e) => changePrice(e, 0)}
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Grandes"
                  onChange={(e) => changePrice(e, 1)}
                />
              </div>
            </>
          ) : (
            <>
              <label className={styles.priceLabel}>Precios</label>
              <div className={styles.priceContainer}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Precio"
                  onChange={(e) => changePrice(e, 0)}
                />
              </div>
            </>
          )}
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Tipo de Entregas</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Tipo de Entrega"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Precio"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Agregar
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Crear Producto
        </button>
      </div>
    </div>
  );
};

export default Add;
