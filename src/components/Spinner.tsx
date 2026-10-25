import { FaSpinner } from "react-icons/fa";
import * as styles from "./Spinner.css";

const Spinner = () => {
  return <FaSpinner className={`fa-spin ${styles.spinner}`} />;
};

export default Spinner;
