import { DynamicIcon } from "lucide-react/dynamic";
import styles from "./styles.module.css";

const Button = ({ name, scrollToContactForm , icon, isLoading , type }) => {
  return (
    <div className={styles.btncmn}>
      <button  type={type ? type : "button"} onClick={scrollToContactForm} className={styles.commonbtn}>
        {icon && <DynamicIcon name={icon} />}
        {
          isLoading ? (<div class="spinner-border spinner-border-sm text-light" role="status"></div>) : name
        }
        
      </button>
    </div>
  );
};

export default Button;
