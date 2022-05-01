import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageItem}>
        <Image src="/img/bg.png" layout="fill" alt="" priority={false}  />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            TE ESPERAMOS PARA PROBAR LAS MEJORES PIZZAS Y HAMBURGESAS
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>PASA POR NUESTO LOCAL</h1>
          <p className={styles.text}>
            Calle 11 N°1245 (58 y 59)
            <br /> La Plata, 1900
            <br /> (221) 579-6670
          </p>
          <h1 className={styles.titleRedes}>NUESTRAS REDES</h1>
          <p className={styles.textRedes}>
            <a
              href="https://www.instagram.com/donjuanpizzeria/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instaContainer}
            >
              <Image
                src="/img/instagram.png"
                alt=""
                priority={false}
                width="20"
                height="20"
                
              />
              <span className={styles.instaName}>@donjuanpizzeria</span>
            </a>
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>HORARIOS</h1>
          <p className={styles.text}>
            LUNES A SABADO
            <br /> 12:00 – 14:30
            <br /> 19:00 – 23:30
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
