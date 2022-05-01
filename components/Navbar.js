import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.itemCall}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32px" height="32px" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>Pedir Ahora!</div>
          <div className={styles.text}>221 579 6670</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Inicio</li>
          </Link>
          <div className={styles.imgLogo}>
            <Image src="/img/logo.png" alt="" width="320px" height="85px" />
          </div>
          <Link href="/productsList" passHref>
          <li className={styles.listItem}>Productos</li>
          </Link>
          {/* <li className={styles.listItem}>Menu</li> */}
          {/* <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li> */}
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
      <div className={styles.dropdownMenu}>
        <DropdownMenu.Root className={styles.dropDownRoot}>
          <DropdownMenu.Trigger className={styles.dropDownTrigger}>
            <AiOutlineMenu className={styles.iconMenu} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            allowPinchZoom="true"
            className={styles.dropDownContent}
          >
            <DropdownMenu.Item className={styles.dropDownItemCalls}>
              <div className={styles.dropDownItemCall}>
                <div className={styles.dropDowncallButton}>
                  <Image
                    src="/img/telephone.png"
                    alt=""
                    width="32px"
                    height="32px"
                  />
                </div>
                <div className={styles.dropDowntexts}>
                  <div className={styles.dropDowntext}>Pedir Ahora!</div>
                  <div className={styles.dropDowntext}>221 579 6670</div>
                </div>
              </div>
            </DropdownMenu.Item>
            <Link href="/" passHref>
              <DropdownMenu.Item className={styles.dropDownItem}>
                Inicio
              </DropdownMenu.Item>
            </Link>
            <Link href="/productsList" passHref>
              <DropdownMenu.Item className={styles.dropDownItem}>
                Productos
              </DropdownMenu.Item>
            </Link>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default Navbar;
