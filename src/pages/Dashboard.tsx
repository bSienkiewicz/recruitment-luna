import { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useTemperatureStore from "../store/temperatures";
import ModuleCard from "../components/ModuleCard";
import Header from "../layout/Header";
import { useFetch } from "../hooks/useFetch";
import ModuleModal from "../components/ui/ModuleModal";

function Dashboard() {
  const {
    modules,
    fetchModules,
    postModule,
  } = useFetch();
  const [showModal, setShowModal] = useState(false);
  const recentReadings = useTemperatureStore((state) => state.recentReadings);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return (
    <>
      <ModuleModal
        showModal={showModal}
        onSubmit={postModule}
        handleShowModal={setShowModal}
        icon={faPlus}
        isEditMode={false}
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
    </>
  );
}

export default Dashboard;
