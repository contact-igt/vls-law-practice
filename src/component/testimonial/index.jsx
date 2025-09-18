import React, { useState } from "react";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";
import Title from "@/common/Title";

const Testimonial = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.testimonalsec}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Title title1={"Our Student"} spantitle={"Testimonals"} />
        </div>

        <div className={`${styles.testim0nalcard} mt-5`}>
          {isOpen ? (
            <div className={styles.testimonal_video}>
              <iframe
                src="https://www.youtube.com/embed/qaxU1MBhhGc?autoplay=1"
                title="Testimonial Video"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div
              className={styles.testimonal_thumbnail}
              onClick={() => setIsOpen(true)}
            >
              <div className={styles.playbtn}>
                <DynamicIcon name="play" color="#fff" size={40} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
