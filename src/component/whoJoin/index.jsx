import Title from "@/common/Title";
import { DynamicIcon } from "lucide-react/dynamic";
import styles from "./styles.module.css";
import Button from "@/common/Button";

const WhoJoin = ({ whojoindata, scrollToContactForm }) => {
  return (
    <section className={styles.whojoinsec}>
      <div className="container">
        <div className="row  ">
          <div className="col-lg-6">
            <div className={styles.learnimg}>
              <img src={"/assets/home/whojoin.jpeg"} className="img-fluid" />
            </div>
          </div>

          <div className="col-lg-6 mt-5 mt-lg-0">
            <Title title2={"Should Attend ?"} spantitle={"Who"} />

            <div className="py-4">
              {whojoindata?.map((data, i) => (
                <div
                  key={i}
                  className={`${styles.learnpt} d-flex gap-3 align-items-center my-4`}
                >
                  <DynamicIcon name="circle-check" size={25} color="#b20a0a" />
                  <h5>{data}</h5>
                </div>
              ))}
            </div>

            <Button
              name={"Attend Now"}
              scrollToContactForm={scrollToContactForm}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoJoin;
