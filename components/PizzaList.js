import styles from "../styles/PizzaList.module.css";
import Image from "next/image";

const PizzaList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>LAS MEJORES PIZZAS Y HAMBURGESAS DE LA CIUDAD</h1>
      <p className={styles.desc}>
        Lo que nos apasiona es la pizza, es por eso que nuestra pizzeria
        está dedicada a ofrecerte las mejores pizzas y hamburguesas de la ciudad.
      </p>
      <div className={styles.wrapper}>
        <div className={styles.pizzaContainer}>
          <Image src="/img/pizza.jpg" alt="" width="500" height="500" className={styles.image}/>
          <h1 className={styles.pizzaTitle}>Napo</h1>
          <p className={styles.pizzaDesc}>Pizza Napo</p>
        </div>
        <div className={styles.pizzaContainer}>
          <Image src="/img/mila.jpg" alt="" width="500" height="500" className={styles.image}/>
          <h1 className={styles.pizzaTitle}>Mila</h1>
          <p className={styles.pizzaDesc}>Mila Panceta y Huevo</p>
        </div>
        <div className={styles.pizzaContainer}>
          <Image src="/img/burger.jpg" alt="" width="500" height="500" className={styles.image}/>
          <h1 className={styles.pizzaTitle}>Burger</h1>
          <p className={styles.pizzaDesc}>Burger Clásica</p>
        </div>
      </div>
    </div>
  );
};

export default PizzaList;
