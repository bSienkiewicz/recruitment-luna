import { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useTemperatureStore from "../store/temperatures";
import ModuleCard from "../components/ModuleCard";
import Header from "../layout/Header";
import { useModules } from "../hooks/useFetch";
import ModuleModal from "../components/ModuleModal";
import ErrorDisplay from "../components/ErrorDisplay";
import Loading from "../components/Loading";
import SEO from "../components/SEO";

function Dashboard() {
  const {
    error,
    isLoading,
    modules,
    fetchModules,
    postModule,
  } = useModules();
  const [showModal, setShowModal] = useState(false);
  const recentReadings = useTemperatureStore((state) => state.recentReadings);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return (
    <>
      <SEO title="hydroponIQ." description="hydroponIQ dashboard" />
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
        error={error}
        isLoading={isLoading}
      />

      {isLoading && <Loading fullSize={false} />}
      {error && <ErrorDisplay error={error} showHomeButton={false} />}

      {modules && !error && (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
        {modules.map((module, idx) => (
          <ModuleCard
            idx={idx}
            key={module.id}
            module={module}
            latestReading={
              recentReadings.find((reading) => reading.id === module.id)
                ?.temperature
            }
          />
        ))}
      </div>
      )}
    </>
  );
}

export default Dashboard;
