import Button from "@/common/Button";
import styles from "./styles.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Title from "@/common/Title";
import { HomePage } from "@/constants/Home";
import { useRouter } from "next/router";
import { useState } from "react";
import { Popup } from "@/common/Popup";
import { AcademyRegisterQuery } from "@/hooks/useAcademyTrainingQuery";

// --------------------------------------
// UNIVERSAL RETRY FUNCTION
// --------------------------------------
async function retryRequest(fn, retries = 5, delay = 1500) {
  try {
    return await fn();
  } catch (err) {
    console.error(`Retry failed (${retries} left):`, err);

    if (retries <= 1) throw err;

    await new Promise((res) => setTimeout(res, delay));
    return retryRequest(fn, retries - 1, delay);
  }
}

const ContactForm = () => {
  const router = useRouter();
  const { mutate: registerMutate } = AcademyRegisterQuery();
  const [isLoading, setisLoading] = useState(false);

  // --------------------------------------
  // FORMIK & VALIDATION
  // --------------------------------------
  const Formik = useFormik({
    initialValues: { name: "", email: "", mobile: "" },

    validationSchema: Yup.object().shape({
      name: Yup.string().matches(/^[a-zA-Z ]*$/, "Invalid name"),
      email: Yup.string()
        .required("Email required")
        .email("Enter Valid Email")
        .test(
          "is-lowercase",
          "Email must be lowercase",
          (value) => !value || value === value.toLowerCase()
        ),
      mobile: Yup.string()
        .required("Mobile required")
        .matches(/^[0-9]+$/, "Invalid Mobile No")
        .min(10, "Invalid Mobile No")
        .max(10, "Invalid Mobile No"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        // --------------------------------------
        // 1) CREATE RAZORPAY ORDER
        // --------------------------------------
        const resp = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: HomePage?.razorpay?.amount }),
        });

        const order = await resp.json();

        if (!resp.ok) throw new Error("Create order failed");

        // --------------------------------------
        // 2) INITIATE PAYMENT
        // --------------------------------------
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: values?.name,
          order_id: order.id,
          description: `${HomePage?.razorpay?.title} (99 + 18% Tax = ₹117)`,

          handler: async (response) => {
            if (!response?.razorpay_payment_id) {
              router.replace("/error");
              return setisLoading(false);
            }

            setisLoading(true);

            // --------------------------------------
            // GET IP ADDRESS
            // --------------------------------------
            const ipData = await (
              await fetch("https://api.ipify.org?format=json")
            ).json();

            const formData = {
              Name: values?.name,
              Email: values?.email,
              Mobile: `+91${values?.mobile}`,
              Amount: order?.amount / 100,
              Razorpay_Transaction_Id: response?.razorpay_payment_id,
              Payment_Status: "Paid",
            };

            // --------------------------------------
            // API PAYLOAD
            // --------------------------------------
            const apiPayload = {
              name: values?.name,
              email: values?.email,
              mobile: `+91${values?.mobile}`,
              amount: order?.amount / 100,
              programm_date: "2025-12-14",
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              payment_status: "paid",
              captured: response.captured || "",
              page_name: "decoding-of-law-practice",
              ip_address: ipData.ip,
              utm_source: localStorage.getItem("utm_source"),
              utm_medium: localStorage.getItem("utm_medium"),
              utm_campaign: localStorage.getItem("utm_campaign"),
              utm_term: localStorage.getItem("utm_term"),
              utm_content: localStorage.getItem("utm_content"),
            };

            // --------------------------------------
            // 3) REGISTER LEAD (RETRY)
            // --------------------------------------
            await retryRequest(
              () =>
                new Promise((resolve, reject) => {
                  registerMutate(
                    { value: apiPayload },
                    {
                      onSuccess: resolve,
                      onError: reject,
                    }
                  );
                }),
              5,
              1500
            );

            // --------------------------------------
            // 4) SEND WHATSAPP MESSAGE (RETRY)
            // --------------------------------------
            await retryRequest(async () => {
              const res = await fetch("/api/sendWhatsapp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  phone: `91${values?.mobile}`,
                  name: values?.name,
                  amount: 99,
                  programm_name: "2-hour Decoding of Practice masterclass",
                  schedule: "Sunday, Dec 14, 2025 10:30 AM – 12:30 PM IST",
                  platform: "Google Meet",
                  link_date: "Saturday, 13 Dec",
                }),
              });

              const data = await res.json();

              if (!data.success) throw new Error("WhatsApp API failed");
            });

            // --------------------------------------
            // 5) GOOGLE SHEET ENTRY (RETRY)
            // --------------------------------------
            const params = new URLSearchParams();
            Object.keys(apiPayload).forEach((key) =>
              params.append(key, apiPayload[key] ?? "")
            );

            await retryRequest(async () => {
              const res = await fetch(
                "https://script.google.com/macros/s/AKfycbxobI0C2E-HTczBbbsyWSKNq5U5mXJn6WTBGjHOn48ppKaDTqtKzo7vyHGqpP0OEdmiDg/exec",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: params.toString(),
                }
              );
              if (!res.ok) throw new Error("Sheet failed");
            });

            // --------------------------------------
            // 6) FINAL SUCCESS FLOW
            // --------------------------------------
            localStorage.setItem("PaymentDetails", JSON.stringify(formData));
            await new Promise((res) => setTimeout(res, 2000));

            setisLoading(false);
            router.replace("/thank-you");
          },

          prefill: {
            name: values?.name,
            email: values?.email,
            contact: values?.mobile,
          },
          theme: { color: "#b20a0a" },
        };

        const razor = new window.Razorpay(options);

        razor.on("payment.failed", function () {
          router.replace("/error");
          setisLoading(false);
        });

        razor.open();
        resetForm();
      } catch (err) {
        console.error("Fatal error:", err);
        router.replace("/error");
      }
    },
  });

  return (
   <>
      <div className={styles?.formcardbottom} id="contact_form">
        <form
          id="contactForm"
          className="contact-form"
          onSubmit={Formik.handleSubmit}
        >
          <div className={styles.formtitle}>
            <Title
              title1={"Register"}
              spantitle={"Now"}
              subtitle={`( Get Your Legal — Career Roadmap )`}
            />
          </div>
          <div className={styles.inputgrp}>
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              {...Formik.getFieldProps("name")}
            />
            {Formik.touched.name && Formik.errors.name && (
              <small>{Formik.errors.name}</small>
            )}
          </div>

          <div className={styles.inputgrp}>
            <label>
              Email<span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...Formik.getFieldProps("email")}
            />
            {Formik.touched.email && Formik.errors.email && (
              <small>{Formik.errors.email}</small>
            )}
          </div>

          <div className={styles.inputgrp}>
            <label>
              Mobile<span>*</span>
            </label>
            <div className="position-relative">
              <input
                type="text"
                className={`${styles.inputmobile} form-control `}
                placeholder="Mobile"
                {...Formik.getFieldProps("mobile")}
              />
              <input
                className={`${styles.inputmobilecode} form-control position-absolute`}
                readOnly
                value={"+91"}
              />
            </div>
            {Formik.touched.mobile && Formik.errors.mobile && (
              <small>{Formik.errors.mobile}</small>
            )}
          </div>

          <div className="mt-5 d-md-flex justify-content-center ">
            <Button name={"SUBMIT"} isLoading={isLoading} type={"submit"} />
          </div>
        </form>
      </div>

      <Popup
        open={isLoading}
        onClose={() => {
          handleTogglecontactForm();
        }}
      >
        <div className={styles.loadingPopup}>
          <h4>⚠️ Do Not Close or Refresh</h4>
          <p>
            Your payment has been received. We are completing your registration.
            Please stay on this page until the process is complete.
          </p>
          <h6>⏳ Processing... Please wait.</h6>
        </div>
      </Popup>
    </>
  );
};

export default ContactForm;
