import Title from "@/common/Title";
import { DynamicIcon } from "lucide-react/dynamic";
import styles from "./styles.module.css";

const WhatLearn = ({ learndata }) => {
  return (
    <section className={styles.learnsec}>
      <div className="container">
        <div className="row  ">
          <div className="col-lg-6">
            <Title title1={"What"} spantitle={"You'll Learn ?"} />

            <div className="pt-4">
              {learndata?.map((data, i) => (
                <div
                  key={i}
                  className={`${styles.learnpt} d-flex gap-3 align-items-center my-4`}
                >
                  <DynamicIcon name="circle-check" size={25} color="#b20a0a" />
                  <h5>{data}</h5>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className={styles.learnimg}>
              <img src={"/assets/home/whatlearn.jpeg"} className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatLearn;
