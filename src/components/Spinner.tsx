import { FaSpinner } from "react-icons/fa";
import { spinner } from "./Spinner.css";

const Spinner = () => {
  return <FaSpinner className={`fa-spin ${spinner}`} />;
};

export default Spinner;
