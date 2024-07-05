import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSocketConnection } from "./hooks/useSocketConnection";
import useTemperatureStore from "./store/temperatures";
import ModuleCard from "./components/ModuleCard";
import { api } from "./services/api";
import Modal from "./components/Modal";
import { Module, AddModuleModalProps } from "./types";

const AddModuleModal = ({
  showModal,
  handleShowModal,
  postNewModule,
}: AddModuleModalProps) => {
  const [moduleData, setModuleData] = useState({
    name: "",
    description: "",
    targetTemperature: 0
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
  }

  const handlePostNewModule = () => {
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
        <input
          type="text"
          name="name"
          maxLength={50}
          placeholder="Module name"
          className="border border-gray_border rounded-md p-2 mb-3"
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Module description"
          rows={4}
          maxLength={200}
          className="border border-gray_border rounded-md p-2 mb-3"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="targetTemperature"
          placeholder="Target temperature"
          min={1}
          max={90}
          step={0.1}
          className="border border-gray_border rounded-md p-2 mb-3"
          onChange={handleInputChange}
        />
        <button
          className="bg-green_main self-end rounded-md px-4 py-2 text-sm"
          onClick={handlePostNewModule}
        >
          Add module
        </button>
      </div>
    </Modal>
  );
};

function App() {
  const [modules, setModules] = useState<Module[]>([]);
  const [showModal, setShowModal] = useState(false);
  const recentReadings = useTemperatureStore((state) => state.recentReadings);

  useSocketConnection();

  const fetchModules = useCallback(async () => {
    try {
      const data = await api.getAllModules();
      setModules(data);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  }, []);

  const postNewModule = useCallback(
    async (body: any) => {
      console.log(body)
      try {
        await api.postModule(body);
        fetchModules();
      } catch (error) {
        console.error("Failed to post new module:", error);
      }
    },
    [fetchModules]
  );

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return (
    <div className="overflow-auto pt-10 relative">
      <AddModuleModal
        showModal={showModal}
        handleShowModal={setShowModal}
        postNewModule={postNewModule}
      />
      <div className="container mx-auto flex-col px-5">
        <div className="flex justify-between w-full">
          <h1 className="text-3xl font-medium">Your modules</h1>
          <button
            className="bg-white border border-gray_border rounded-full w-10 h-10 flex items-center justify-center hover:shadow-xl hover:shadow-neutral-400/20 transition-all"
            aria-label="Add new module"
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              latestReading={
                recentReadings.find((reading) => reading.id === module.id)
                  ?.temperature
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
