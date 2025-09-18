import { MetaTitle } from "@/common/Meta/MetaTitle";
import Banner from "@/component/banner";
import FastFact from "@/component/fastfact";
import Promise from "@/component/promise";
import { HomePage } from "@/constants/Home";
import { useEffect, useRef } from "react";
import Speaker from "@/component/speaker";
import FAQ from "@/component/faq";
import RegisterSticky from "@/common/RegisterSticky";
import WhoJoin from "@/component/whoJoin";
import WhyCourse from "@/component/whycourse";
import WhatLearn from "@/component/whatlearn";
import WhyVls from "@/component/whyvls";
import Testimonial from "@/component/testimonial";

const HomePageComponent = () => {
  const contactFormRef = useRef(null);

  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    localStorage.removeItem("PaymentDeatls");
  }, []);

  return (
    <>
      <MetaTitle />

      <Banner
        bannerdata={HomePage?.hero_banner}
        contactFormRef={contactFormRef}
      />

      <FastFact factdata={HomePage?.fast_fact} />

      <WhyCourse scrollToContactForm={scrollToContactForm} />

      <Promise
        promisedata={HomePage?.promise}
        scrollToContactForm={scrollToContactForm}
      />

      <WhatLearn learndata={HomePage?.what_learn} />

      <Speaker speakerdata={HomePage?.speaker} />

      <WhoJoin
        whojoindata={HomePage?.who_join}
        scrollToContactForm={scrollToContactForm}
      />

      <WhyVls
        whyvlsdata={HomePage?.whyvls}
        scrollToContactForm={scrollToContactForm}
      />

      <FAQ faqdata={HomePage?.faqs} />

      <RegisterSticky scrollToContactForm={scrollToContactForm} />

      <Testimonial />
    </>
  );
};

export default HomePageComponent;
