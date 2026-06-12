import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const RegisterSticky = ({ scrollToContactForm }) => {
  // Countdown timer hidden — no confirmed date yet (restore when date is set)
  // const [time, setTime] = useState(15 * 60);
  //
  // useEffect(() => {
  //   if (time <= 0) return;
  //
  //   const interval = setInterval(() => {
  //     setTime((prevTime) => prevTime - 1);
  //   }, 1000);
  //
  //   return () => clearInterval(interval);
  // }, [time]);
  //
  // const minutes = Math.floor(time / 60);
  // const seconds = time % 60;

  return (
    <>
      <div className={styles.bottomfix}>
        <div className="container">
          <div className="row py-lg-3 py-2 align-items-center justify-content-center">
            <div className="col-lg-6 d-lg-block d-none">
              <div className={`${styles.meuntitle}`}>
                <h4>
                  Decoding of Practice — 2-Hour Masterclass. Enrollment is currently closed. Join the waitlist for early access.
                </h4>
                {/* Offer expiry countdown hidden — no confirmed date yet */}
                {/* <h6>
                  Offer Will Expire in -{" "}
                  <span>{`${minutes}:${
                    seconds < 10 ? `0${seconds}` : seconds
                  }`}</span>
                </h6> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="pricing d-flex justify-content-lg-end justify-content-center align-items-center gap-3 py-md-1 py-2">
                {/* Pricing hidden — waitlist mode (restore when payment is re-enabled) */}
                {/* <div>
                  <p className={styles.pricing}>
                    INR ₹99
                    <br />
                    <span>INR ₹499</span>{" "}
                  </p>
                  <p className={styles.mbinfo}>
                    (Offer end in{" "}
                    {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`} )
                  </p>
                </div> */}
                <div className={styles.pricebtn}>
                  <button
                    onClick={scrollToContactForm}
                    className="btn text-light"
                    style={{ cursor: "pointer", borderRadius: "20px" }}
                  >
                    Join the Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSticky;
