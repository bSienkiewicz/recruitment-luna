import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSocketConnection } from "./hooks/useSocketConnection";
import useTemperatureStore from "./store/temperatures";
import ModuleCard from "./components/ModuleCard";
import { api } from "./services/api";

interface Module {
  id: string;
  name: string;
  description: string;
  available: boolean;
  targetTemperature: number;
}

function App() {
  const [modules, setModules] = useState<Module[]>([]);
  const recentReadings = useTemperatureStore((state) => state.recentReadings);

  useSocketConnection();

  const fetchModules = async () => {
    try {
      const data = await api.getAllModules();
      setModules(data);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div className="flex-1 w-full h-full overflow-auto pt-10">
      <div className="container mx-auto flex-col">
        <div className="flex justify-between w-full">
          <h1 className="text-3xl font-medium">Your modules</h1>
          <button
            className="bg-white border border-gray_border rounded-full w-10 h-10 flex items-center justify-center hover:shadow-xl hover:shadow-neutral-400/20 transition-all"
            aria-label="Add new module"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          {modules.map((module) => {
            const latestReading = recentReadings.find(
              (reading) => reading.id === module.id
            );
            return (
              <ModuleCard
                key={module.id}
                module={module}
                latestReading={latestReading?.temperature}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
