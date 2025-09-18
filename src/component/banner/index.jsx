import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";
import ContactForm from "../contactform";

const Banner = ({ bannerdata, contactFormRef }) => {
  return (
    <section className={styles.bannersec}>
      <div className="container ">
        <div className="row">
          <div className="col-xl-7 col-lg-6 col-12 pt-xl-5 pt-0">
            <div className={styles.bannertitle}>
              <Title
                title2={bannerdata?.heading?.title}
                spantitle={bannerdata?.heading?.titlebold}
                subtitle={bannerdata?.heading?.desc}
              />
            </div>

            <div
              className={`${styles.datetime} d-flex gap-2 align-items-center `}
            >
              <DynamicIcon name="clock" color="#fff" />
              <h6 className="m-0">{bannerdata?.heading?.time}</h6>
            </div>

            <div className={`${styles.bannerpoint} my-5`}>
              {bannerdata?.points?.map((data, i) => (
                <div
                  className={`d-flex gap-4 my-4 ${styles.pointwise}`}
                  key={i}
                >
                  <DynamicIcon name="gavel" color="#b20a0a" size={30} />
                  <h5>{data?.desc}</h5>
                </div>
              ))}
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-12">
            <div ref={contactFormRef}>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
