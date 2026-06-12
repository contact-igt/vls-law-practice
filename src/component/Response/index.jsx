import Button from "@/common/Button";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

const Response = () => {
  const [userDetail, setuserDeatil] = useState();
  const { query } = useRouter();
  const issuccess = query.response === "thank-you";

  // useEffect(() => {
  //   setuserDeatil(JSON.parse(localStorage.getItem("PaymentDetails")));
  // }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedData = localStorage.getItem("PaymentDetails");

      if (storedData) {
        setuserDeatil(JSON.parse(storedData));
      } else {
        setuserDeatil(null); // or {}
      }
    } catch (error) {
      console.error("Invalid PaymentDetails in localStorage", error);
      localStorage.removeItem("PaymentDetails");
      setuserDeatil(null);
    }
  }, []);

  console.log("ccc", userDetail?.name);
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
          {/* Payment success/failure heading — commented out for waitlist mode */}
          {/* <h5 className={issuccess ? styles.successText : styles.errorText}>
            {issuccess ? "Payment Successful" : "Payment Failed"}
          </h5> */}

          {issuccess ? (
            <>
              {/* Payment confirmation content — commented out for waitlist mode
              <p>
                Thank you! Your payment has been received successfully. Below
                are your transaction details:
              </p>

              {userDetail ? (
                <div className={styles.summaryBox}>
                  <p>
                    <strong>Name:</strong> {userDetail?.name || ""}
                  </p>
                  <p>
                    <strong>Email:</strong> {userDetail?.email || "-"}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {userDetail?.mobile || "-"}
                  </p>
                  <p>
                    <strong>Amount:</strong> {userDetail?.amount || "-"}
                  </p>
                  <p>
                    <strong>Transaction ID:</strong>{" "}
                    {userDetail?.razorpay_payment_id || "Not Available"}
                  </p>
                </div>
              ) : (
                ""
              )}
              */}

              {/* Waitlist confirmation UI */}
              <div className={styles.summaryBox}>
                <h3 className={styles.successText}>
                  {`You're on the waitlist! 🎉`}
                </h3>
                <p className="mt-3" style={{ fontSize: "1.1rem" }}>
                  {`We'll notify you as soon as the masterclass date is confirmed. Keep an eye on your inbox.`}
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                                   <a
                    href="/"
                    className={`d-flex align-items-center justify-content-center gap-2 text-decoration-none`}
                    style={{ borderRadius: "100px", fontWeight: "600", backgroundColor: "#6c757d", color: "#fff", fontSize: "16px", padding: "16px 30px", width: "250px" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/></svg>
                    Back to Home
                  </a>
                  <a
                    href="https://chat.whatsapp.com/DL9aDFSNpXXFFDvwvEl5Ic"
                    target="_blank"
                    rel="noreferrer"
                    className={`d-flex align-items-center justify-content-center gap-2 text-decoration-none`}
                    style={{ borderRadius: "100px", fontWeight: "600", backgroundColor: "#b20a0a", color: "#fff", fontSize: "16px", padding: "18px 40px", whiteSpace: "nowrap" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
                    Join Our Community
                  </a>
                </div>
              </div>
            </>
          ) : (
            <p>
              {`Oops! We couldn't process your request. Please try again or call us directly for support.`}
            </p>
          )}
        </div>

        {!issuccess && (
          <div
            className={`d-flex flex-md-row flex-column justify-content-center gap-3 ${styles.responseCta}`}
          >
            <Button name={"Back to Home"} link={"/"} icon={"arrow-left"} />
            <Button
              name={"Call Support"}
              link={"tel:+919500207811"}
              icon={"phone"}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Response;