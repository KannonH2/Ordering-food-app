import React, { useState, useEffect } from "react";
import styles from "../styles/OrderList.module.css";
import axios from "axios";
import Link from "next/link";
import dateFormat from 'dateformat';

const OrdersList = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [close, setClose] = useState(true);
  const status = ["preparing", "on the way", "delivered"];

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("https://donjuan-pizzeria.vercel.app/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "https://donjuan-pizzeria.vercel.app/api/orders/" + id
      );
      setOrderList(orderList.filter((order) => order._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
       <div className={styles.buttonContainer}>
        <Link href="/admin">
     <button className={styles.accessButtons}>Products</button>
        </Link>
        <Link href="/admin/orders">
     <button className={styles.accessButtons}>Orders</button>
        </Link>
     </div>
      <div className={styles.itemOrders}>
          <h1 className={styles.title}>Orders</h1>
        <table className={styles.tableOrders}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.thTitle1}>Fecha</th>
              <th className={styles.thTitle2}>Cliente</th>
              <th className={styles.thTitle2}>Telefono</th>
              <th className={styles.thTitle2}>Direccion</th>
              <th className={styles.thTitle3}>Productos</th>
              <th className={styles.thTitle7}>Aclaraciones</th>
              <th className={styles.thTitle4}>Total</th>
              <th className={styles.thTitle5}>Pago</th>
              <th className={styles.thTitle6}>Entrega</th>
              <th className={styles.thTitle6}>Estado</th>
              <th className={styles.thTitle7}>Accion</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td className={styles.orderId}>{dateFormat(order.createdAt, "dddd d mmmm, HH:mm")}</td>
                <td className={styles.orderTitle}>{order.customer}</td>
                <td className={styles.orderId}>{order.phone}</td>
                <td className={styles.orderTitle}>{order.address}</td>
                <td className={styles.orderDetail}>
                  {order.productsDetail.map((product) => (
                    <div>
                      {product.quantity} - {product.title}
                    </div>
                  ))}
                </td>
                <td className={styles.orderTotal}>{order.comments}</td>
                <td className={styles.orderTotal}>${order.total}</td>
                <td className={styles.orderStatus}>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td className={styles.orderStatus}>
                  {order.extraOption}
                </td>
                <td className={styles.status}>{status[order.status]}</td>
                <td className={styles.stageButtonContainer}>
                  <button
                    className={styles.stageButton}
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                  <button
                    className={styles.stageButton}
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
