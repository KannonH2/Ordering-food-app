import React from "react";
import { createPopper } from '@popperjs/core';
import styles from "../styles/Dropdown.module.css";

const Dropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              blueGray Dropdown
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                 styles.popover 
              }
            >
              <a
                href="#pablo"
                className={styles.dropdownItem}
                onClick={e => e.preventDefault()}
              >
                Action
              </a>
              <a
                href="#pablo"
                className={styles.dropdownItem}
                onClick={e => e.preventDefault()}
              >
                Another action
              </a>
              <a
                href="#pablo"
                className={styles.dropdownItem}
                onClick={e => e.preventDefault()}
              >
                Something else here
              </a>
              <div className={styles.separation} />
              <a
                href="#pablo"
                className={styles.dropdownItem}
                onClick={e => e.preventDefault()}
              >
                Seprated link
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;