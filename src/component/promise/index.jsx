import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";
import Button from "@/common/Button";

const Promise = ({ promisedata  , scrollToContactForm}) => {
  return (
    <section className={styles.promisesec}>
      <div className="container">
        <div className="d-flex justify-content-center text-center">
          <Title
            title1={"You Got The Degree "}
            spantitle={"Now What ?"}
            subtitle={
              "You studied the law. But when it comes to drafting, filings, or handling your first client—do you feel unsure where to start?"
            }
          />
        </div>

        <div className="row my-5">
          <div className="col-lg-6">
            <div className={styles.problemcard}>
              <h4>The Gap</h4>
              {promisedata?.problem?.map((data, i) => (
                <div
                  className={`d-flex gap-3 my-4 align-items-center  ${styles.pc}`}
                  key={i}
                >
                  <DynamicIcon name="circle-x" color="red" size={25} />
                  <h5 className="m-0">{data}</h5>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className={styles.promisecard}>
              <h4>The Fix in (2 Hours)</h4>
              {promisedata?.promise?.map((data, i) => (
                <div
                  className={`d-flex gap-3 my-4  align-items-center ${styles.pc}`}
                  key={i}
                >
                  <DynamicIcon name="circle-check" color="green" size={25} />
                  <h5 className="m-0">{data}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="d-md-flex justify-content-center">
          <Button name={"Fix Now"}  scrollToContactForm={scrollToContactForm}/>
        </div>
      </div>
    </section>
  );
};

export default Promise;
