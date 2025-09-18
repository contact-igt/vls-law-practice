import Title from "@/common/Title";
import styles from "./styles.module.css";

const FAQ = ({ faqdata }) => {
  return (
    <section className={styles.faqsec}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Title
            title1={"Frequently"}
            spantitle={"Asked"}
            title2={"Questions ?"}
          />
        </div>

        <div className="accordion mt-5" id="faqAccordion">
          {faqdata.map((item) => (
            <div className="accordion-item" key={item.id}>
              <h2 className="accordion-header" id={`heading${item.id}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${item.id}`}
                  aria-expanded="false"
                  aria-controls={`collapse${item.id}`}
                >
                  {item.question}
                </button>
              </h2>
              <div
                id={`collapse${item.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${item.id}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
