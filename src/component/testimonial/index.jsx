import React, { useState } from "react";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";
import Title from "@/common/Title";
import Slider from "react-slick";

const Testimonial = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const testimonialData = [
    {
      imgUrl: "/assets/home/testimonial_bg1.jpg",
      videoUrl:
        "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761892348/vls-testimonal3_ajrnrk.mp4",
    },
    {
      imgUrl: "/assets/home/testimonial_bg2.png",
      videoUrl:
        "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761891831/vls-testimoanl1_ddcvpb.mp4",
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    arrows:true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    centerMode:true,
    // centerPadding:"20px",
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerPadding: "15px" },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerPadding: "0px" },
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
          <Slider {...settings}>
            {testimonialData.map((testimonial, index) => (
              <div key={index} className={`${styles.testim0nalcard} mt-5 px-2`}>
                {openIndex === index ? (
                  <div className={styles.testimonal_video}>
                    <video
                      src={testimonial.videoUrl}
                      controls
                      autoPlay
                      playsInline
                    />
                  </div>
                ) : (
                  <div
                    className={styles.testimonal_thumbnail}
                    onClick={() => setOpenIndex(index)}
                    style={{
                      backgroundImage: `url(${testimonial.imgUrl})`,
                    }}
                  >
                    <div className={styles.playbtn}>
                      <DynamicIcon name="play" color="#fff" size={40} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
