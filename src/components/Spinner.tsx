import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full text-3xl">
      <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
    </div>
  );
};

export default Spinner;
