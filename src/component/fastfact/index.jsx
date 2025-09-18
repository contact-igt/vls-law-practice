import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";

const FastFact = ({ factdata }) => {
  return (
    <section className={styles.factsec}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Title title1={"Fast"} spantitle={"Facts"} />
        </div>

        <div className="row mt-5">
          <div className="col-lg-6">
            <div className={styles.factimg}>
              <img src={"/assets/home/fatsfact.jpeg"} className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="row">
              {factdata?.map((data, i) => (
                <div className="col-xxl-6 col-xl-12">
                  <div
                    className={`d-flex  my-3 gap-3 ${styles.factpointcard} `}
                  >
                    <div className={styles.cardimg}>
                      <DynamicIcon
                        name={data?.icon}
                        color="#b20a0a"
                        size={30}
                      />
                    </div>
                    <p>{data?.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FastFact;
