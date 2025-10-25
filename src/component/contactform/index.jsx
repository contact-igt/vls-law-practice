import Button from "@/common/Button";
import styles from "./styles.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Title from "@/common/Title";
import { HomePage } from "@/constants/Home";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AcademyRegisterQuery } from "@/hooks/useAcademyTrainingQuery";
import { Popup } from "@/common/Popup";

const ContactForm = () => {
  const router = useRouter();
  const { mutate: registerMutate } = AcademyRegisterQuery();
  const [isLoading, setisLoading] = useState(false);

  const Formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().matches(/^[a-zA-Z ]*$/, "Invalid name"),
      email: Yup.string()
        .required("Email required")
        .email("Enter Valid Email")
        .test((value) => {
          return value === value.toLocaleLowerCase();
        }),
      mobile: Yup.string()
        .required("Mobile required")
        .matches(/^[0-9]+$/, "Invalid Mobile No")
        .min(10, "Invalid Mobile No")
        .max(10, "Invalid Mobile No"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const resp = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: HomePage?.razorpay?.amount }), // rupees
      });

      const order = await resp.json();

      console.log("Order response:", order);

      if (!resp.ok) {
        console.error("Create order failed", order);
        router.replace("/error");
        setisLoading(false);
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: values?.name,
        order_id: order.id,
        description: `${HomePage?.razorpay?.title} (99 + 18% Tax = ₹117)`,
        handler: function (response) {
          if (response?.razorpay_payment_id) {
            setisLoading(true);

            const formData = {
              Name: values?.name,
              Email: values?.email,
              Mobile: `91${values?.mobile}`,
              Amount: order?.amount / 100,
              Razorpay_Transaction_Id: response?.razorpay_payment_id,
              Payment_Status: "Paid",
            };

            const apiPayload = {
              name: values?.name ? values?.name : "",
              email: values?.email,
              mobile: `91${values?.mobile}`,
              amount: order?.amount / 100,
              programm_date: "2025-11-08",
              razorpay_order_id: response.razorpay_order_id
                ? response.razorpay_order_id
                : "",
              razorpay_payment_id: response.razorpay_payment_id
                ? response.razorpay_payment_id
                : "",
              razorpay_signature: response.razorpay_signature
                ? response.razorpay_signature
                : "",
              payment_status: "paid",
              captured: response.captured ? response.captured : "",
              page_name: "decoding-of-law-practice",
            };

            registerMutate(
              { value: apiPayload },
              {
                onSuccess: () => {
                  resetForm();
                  afterRegisterSuccessufull(formData);
                },
              },
              {
                onError: () => {
                  setisLoading(false);
                  resetForm();
                  router.replace("/error");
                },
              }
            );

            const whatsappPayload = {
              phone: `91${values?.mobile}`,
              name: values?.name,
              amount: order?.amount / 100,
              programm_name: "2-hour Decoding of Practice masterclass",
              schedule: "Saturday, Nov 8, 2025 10:30 AM – 12:30 PM IST",
              platform: "Google Meet",
              link_date: "Friday, 7 Nov",
            };

            handleWhatsappMessage(
              whatsappPayload?.phone,
              whatsappPayload?.name,
              whatsappPayload?.amount,
              whatsappPayload?.programm_name,
              whatsappPayload?.schedule,
              whatsappPayload?.platform,
              whatsappPayload?.link_date
            );
          } else {
            router.replace("/error");
            setisLoading(false);
          }
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
    },
  });

  const handleWhatsappMessage = async (
    phone_value,
    name_value,
    amount_value,
    programm_name_value,
    schedule_value,
    platform_value,
    link_date_value
  ) => {
    const apiPayload = {
      phone: phone_value,
      name: name_value ? name_value : "Student",
      amount: amount_value,
      programm_name: programm_name_value,
      schedule: schedule_value,
      platform: platform_value,
      link_date: link_date_value,
    };

    try {
      const res = await fetch("/api/sendWhatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      let data;

      try {
        data = await res.json();
      } catch (jsonErr) {
        const text = await res.text();
        console.error("Server returned non-JSON response:", text);
        console.log("Server returned unexpected response. Check console.");
        return;
      }

      if (data.success) {
        console.log(`WhatsApp confirmation sent to ${phone_value}!`);
      } else {
        console.error("Error sending message:", data.error);
        console.log(
          "Error sending WhatsApp message. Check console for details."
        );
      }
    } catch (err) {
      console.error("Fetch error:", err);
      console.log("Server error. Please try again later.");
    }
  };

  const afterRegisterSuccessufull = (formData) => {
    setTimeout(() => {
      router.replace("/thank-you");
      localStorage.setItem("PaymentDeatls", JSON.stringify(formData));
      setisLoading(false);
    }, 5000);
  };

  const handleTogglecontactForm = () => {
    setisLoading(!isLoading);
  };

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
              class="form-control"
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
              class="form-control"
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
                class={`${styles.inputmobile} form-control `}
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
