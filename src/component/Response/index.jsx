import Button from "@/common/Button";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

const Response = () => {
  const [userDetail, setuserDeatil] = useState();
  const { query } = useRouter();
  const issuccess = query.response === "thank-you";

  useEffect(() => {
    setuserDeatil(JSON.parse(localStorage.getItem("PaymentDeatls")));
  }, []);

  return (
    <section className={`pt-5 mt-5 ${styles.responseSection}`}>
      <div className="container">
        <div className={`text-center ${styles.responseIcon}`}>
          <Image
            src={
              issuccess
                ? "/assets/Response/success.png"
                : "/assets/Response/error.png"
            }
            alt="icon"
            width={120}
            height={120}
            priority
          />
        </div>

        <div className={`text-center ${styles.responseInfo}`}>
          <h5 className={issuccess ? styles.successText : styles.errorText}>
            {issuccess ? "Payment Successful" : "Payment Failed"}
          </h5>

          {issuccess ? (
            <>
              <p>
                Thank you! Your payment has been received successfully. Below
                are your transaction details:
              </p>

              {userDetail ? (
                <div className={styles.summaryBox}>
                  <p>
                    <strong>Name:</strong> {userDetail.Name || ""}
                  </p>
                  <p>
                    <strong>Email:</strong> {userDetail.Email || "-"}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {userDetail.Mobile || "-"}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{userDetail.Amount || "-"}
                  </p>
                  <p>
                    <strong>Transaction ID:</strong>{" "}
                    {userDetail?.Razorpay_Transaction_Id || "Not Available"}
                  </p>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <p>
              Oops! We couldn’t process your payment. Please try again or call
              us directly for support.
            </p>
          )}
        </div>

        {/* ✅ Buttons */}
        <div
          className={`d-md-flex justify-content-center gap-3 ${styles.responseCta}`}
        >
          <a href="/">
            <Button name={"Back to Home"} />
          </a>
          {!issuccess && (
            <a href="tel:+919500207811">
              <Button name={"Call Support"} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Response;
