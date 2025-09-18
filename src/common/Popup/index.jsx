import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

export const Popup = ({ children, open, onClose }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.bg}>
      <div className={styles.wrapper} ref={wrapperRef}>
        {children}
      </div>
    </div>
  );
};