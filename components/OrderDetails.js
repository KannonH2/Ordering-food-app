import { useState } from "react";
import ReactWhatsapp from "react-whatsapp";
import styles from "../styles/OrderDetails.module.css";

const OrderDetails = ({
  total,
  productsDetail,
  createOrder,
  setOpen,
  setCash,
}) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");
  const [extraOption, setExtraOption] = useState("");

  const handleClick = () => {
    createOrder({
      customer,
      address,
      phone,
      comments,
      extraOption,
      total,
      productsDetail,
      method: 0,
    });
  };

  const handleDelivery = (e) => {
    setExtraOption(e.target.value);
  };

  const closeModal = () => {
    setOpen(false);
    setCash(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={closeModal} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>
          Al enviar el pedido se abrira una ventana de whatsapp
        </h1>
        <div className={styles.item}>
          <label className={styles.label}>Nombre y Apellido</label>
          <input
            required
            placeholder="Introduce tu Nombre y Apellido"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Número de Teléfono</label>
          <input
            required
            type="text"
            placeholder="+54 9 222 333 4444"
            className={styles.input}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Dirección</label>
          <textarea
            required={true}
            rows={2}
            placeholder="Introduce tu dirección"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Seleccione Metodo de Entrega</label>
          <select onChange={handleDelivery} required>
            <option value="">Selecciona una opción</option>
            <option value="Quisiera por Delivery">
              Quisiera por Delivery + $120
            </option>
            <option value="Retiro por el Local ">Retiro por el Local</option>
          </select>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Aclaraciones para el Pedido</label>
          <textarea
            rows={5}
            placeholder="Añadir alguna aclaraciones para el pedido (opcional)"
            type="text"
            className={styles.textarea}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <ReactWhatsapp
          onClick={handleClick}
          className={styles.button}
          number="54 9 221 524 8329"
          message={`Hola, como estan?. Me gustaria hacerte el pedido de estos productos:\n${
            productsDetail
              .map(
                (product) =>
                  `${product.quantity} - ${product.title} - $${product.price}` +
                  "\n"
              )
              .join("") + "\n"
          }Lo ${extraOption}\n Nombre: ${customer} \n Telefono: ${phone} \n Direccion: ${address} \n Total: $${total}`}
        >
          Enviar Pedido
        </ReactWhatsapp>
      </div>
    </div>
  );
};

export default OrderDetails;
