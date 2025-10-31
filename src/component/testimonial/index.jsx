import React, { useState } from "react";
import styles from "./styles.module.css";
import Title from "@/common/Title";
import Slider from "react-slick";
import TestimonialCard from "@/common/TestimonialCard";
import { Popup } from "@/common/Popup";

const Testimonial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };
  const testimonialData = [
    {
      name:"Our Students",
      description:"Hi, I’m Akshara Privashini. I’ve been practicing in Ooty for the past two years. When I first came to Chennai, I was completely unsure about where to start — joining VLS Law Academy gave me the right direction and confidence to build my practice.",
      imgUrl: "/assets/home/testimonial_bg1.jpg",
      videoUrl:
        "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761892348/vls-testimonal3_ajrnrk.mp4",
    },
    {
       name:"Harjit Idia",
      description:"Hi, I’m Harjit Idia. Being part of VLS Law Academy’s Decoding of Practice course has been an incredible experience. I learned how to apply legal theory to real-world situations, and it’s truly boosted my confidence as a law student.",
      imgUrl: "/assets/home/testimonial_bg2.png",
      videoUrl:
        "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761891831/vls-testimoanl1_ddcvpb.mp4",
    },
  ];

  var settings = {
    dots: false,
    infinite: false,
    arrows: true,
    loop: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    speed: 500,
    centerMode: true,
    centerPadding: "0px",
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode:true,
                  centerPadding: "0px",
          infinite: false,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: false,
                     centerMode: true,
        centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
           centerMode: true,
        centerPadding: "0px",
          infinite: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
           centerMode: true,
        centerPadding: "0px",
          infinite: false,
        },
      },
    ],
  };

  return (
    <section className={styles.testimonalsec}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Title title1={"Our Student"} spantitle={"Testimonals"} />
        </div>

        <div className={styles.testimonialContainer}>
          <Slider
            // key={slidesToShow + (centerMode ? "c" : "")}
            {...settings}
            className={styles.sliderWrapper}
          >
            {testimonialData?.map((item, index) => (
              <TestimonialCard
                key={index}
                imageSrc={item?.imgUrl}
                openModal={() => openModal(item.videoUrl)}
                name={item?.name}
                testimonial={item?.description}
              />
            ))}
          </Slider>
        </div>
        <Popup open={isModalOpen} onClose={closeModal} variant="video">
          <button
            className={styles.closeButton}
            onClick={closeModal}
            style={{ float: "right", marginBottom: "10px" }}
          >
            ✖
          </button>

          {selectedVideo && (
            <video width="100%" height="500px" controls autoPlay>
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </Popup>
      </div>
    </section>
  );
};

export default Testimonial;
