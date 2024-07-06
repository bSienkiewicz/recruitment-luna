import React, { useState } from "react";
import { ModuleModalProps } from "../types";
import Modal from "./Modal";
import Input from "./Input";
import Textarea from "./Textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

const AddModuleModal = ({
  showModal,
  handleShowModal,
  postNewModule,
  icon,
}: ModuleModalProps) => {
  const [moduleData, setModuleData] = useState({
    name: "",
    description: "",
    targetTemperature: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "targetTemperature") {
      setModuleData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setModuleData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePostNewModule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postNewModule) return;
    if (
      e.currentTarget.name.valueOf() === "" ||
      e.currentTarget.description.value === "" ||
      e.currentTarget.targetTemperature.value == null ||
      typeof e.currentTarget.targetTemperature.value !== "number"
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    postNewModule(moduleData);
    handleShowModal(false);
  };

  return (
    <Modal isShown={showModal} onClose={() => handleShowModal(false)}>
      <div className="flex flex-col">
        <h2 className="text-2xl font-medium">Add new module</h2>
        <p className="text-sm mb-5 text-neutral-400">
          Insert the module details below:
        </p>
        <form className="flex flex-col" onSubmit={handlePostNewModule}>
          <Input
            type="text"
            name="name"
            maxLength={50}
            placeholder="Module name"
            className="border rounded-md p-2 mb-3"
            onChange={handleInputChange}
          />
          <Textarea
            name="description"
            placeholder="Module description"
            maxLength={200}
            className="border rounded-md p-2 mb-3"
            onChange={handleInputChange}
          />
          <Input
            type="number"
            name="targetTemperature"
            placeholder="Target temperature (°C)"
            min={5}
            max={90}
            step={0.1}
            className="border rounded-md p-2 mb-3"
            onChange={handleInputChange}
          />
          <button
            className="bg-green_main text-black rounded-md font-semibold px-4 py-2 self-end mt-5"
            type="submit"
          >
            {icon && <FontAwesomeIcon icon={icon} className="mr-2" />} Add
            module
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddModuleModal;
