import { extraInfo } from "./ExtraInfoBox.css";

const ExtraInfoBox = ({ children }) => {
  return <div className={extraInfo}>{children}</div>;
};

export default ExtraInfoBox;
