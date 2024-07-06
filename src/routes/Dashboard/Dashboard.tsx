import { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useTemperatureStore from "../../store/temperatures";
import ModuleCard from "../../components/ModuleCard";
import Header from "../../layout/Header";
import AddModuleModal from "../../components/Modal_AddModule";
import { useModule } from "../../hooks/useModule";

function Dashboard() {
  const {
    modules,
    fetchModules,
    postModule,
  } = useModule();
  const [showModal, setShowModal] = useState(false);
  const recentReadings = useTemperatureStore((state) => state.recentReadings);


  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return (
    <div className="overflow-auto">
      <AddModuleModal
        showModal={showModal}
        handleShowModal={setShowModal}
        postNewModule={postModule}
        icon={faPlus}
      />

      <Header
        title={"Your modules"}
        button={{
          text: "Add module",
          icon: faPlus,
          onClick: () => setShowModal(true),
        }}
      />
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
  );
}

export default Dashboard;
