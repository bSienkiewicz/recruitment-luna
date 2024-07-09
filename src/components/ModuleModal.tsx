import React, { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getValidationErrors } from "../utils/helpers";
import toast from "react-hot-toast";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface ModuleModalProps {
  showModal: boolean;
  handleShowModal: (show: boolean) => void;
  onSubmit: (moduleData: ModuleData) => void;
  initialData?: ModuleData;
  icon?: any;
  isEditMode: boolean;
}

interface ModuleData {
  name: string;
  description: string;
  targetTemperature: number;
}

const ModuleModal: React.FC<ModuleModalProps> = ({
  showModal,
  handleShowModal,
  onSubmit,
  initialData,
  icon,
  isEditMode,
}) => {
  const [moduleData, setModuleData] = useState<ModuleData>({
    name: "",
    description: "",
    targetTemperature: 0,
  });

  useEffect(() => {
    if (initialData) {
      setModuleData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModuleData((prev) => ({
      ...prev,
      [name]: name === "targetTemperature" ? parseFloat(value) || 0 : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = getValidationErrors(moduleData);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }
    onSubmit(moduleData);
    handleShowModal(false);
  };

  return (
    <Modal isShown={showModal} onClose={() => handleShowModal(false)}>
      <div className="flex flex-col">
        <h2 className="text-2xl font-medium">
          {isEditMode ? "Edit module" : "Add new module"}
          <button
            className="float-end cursor-pointer"
            onClick={() => handleShowModal(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </h2>
        <p className="text-sm mb-5 text-neutral-400">
          {isEditMode ? "Edit" : "Insert"} the module details below:
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            value={moduleData.name}
            maxLength={50}
            placeholder="Module name"
            className="border rounded-md p-2 mb-3"
            onChange={handleInputChange}
          />
          <Textarea
            name="description"
            value={moduleData.description}
            placeholder="Module description"
            maxLength={200}
            className="border rounded-md p-2 mb-3"
            onChange={handleInputChange}
          />
          <Input
            type="number"
            name="targetTemperature"
            value={moduleData.targetTemperature}
            placeholder="Target temperature (°C)"
            min={0}
            max={40}
            step={0.1}
            className="border rounded-md p-2 mb-3"
            onChange={handleInputChange}
          />
          <div className="flex justify-end gap-3 mt-5">
            <button
              className="button-black font-semibold px-4 py-2"
              onClick={() => handleShowModal(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-darker text-white border border-green_main hover:bg-dark_green_main transition-all rounded-md font-semibold px-4 py-2"
              type="submit"
            >
              {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
              {isEditMode ? "Update" : "Add"} module
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModuleModal;
