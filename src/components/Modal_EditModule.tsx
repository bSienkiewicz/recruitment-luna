import React, { useEffect, useState } from 'react'
import { Module, ModuleModalProps } from '../types';
import Modal from './Modal';
import Input from './Input';
import Textarea from './Textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditModuleModal: React.FC<ModuleModalProps> = ({
  showModal,
  handleShowModal,
  editModule,
  initialData,
  icon
}) => {
  const [moduleData, setModuleData] = useState<Partial<Module>>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    targetTemperature: initialData?.targetTemperature || 0,
  });

  useEffect(() => {
    if (initialData) {
      setModuleData({
        name: initialData.name,
        description: initialData.description,
        targetTemperature: initialData.targetTemperature,
      });
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModuleData((prev) => ({
      ...prev,
      [name]: name === "targetTemperature" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!editModule) return;
    e.preventDefault();
    editModule(moduleData);
    handleShowModal(false);
  };

  return (
    <Modal isShown={showModal} onClose={() => handleShowModal(false)}>
      <div className="flex flex-col">
        <h2 className="text-2xl font-medium">Edit module</h2>
        <p className="text-sm mb-5 text-neutral-400">
          Edit the module details below:
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
            {icon && <FontAwesomeIcon icon={icon} className="mr-2" />} Update module
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditModuleModal