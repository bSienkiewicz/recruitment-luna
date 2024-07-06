import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "../../layout/Header";
import useTemperatureStore from "../../store/temperatures";
import "react-datepicker/dist/react-datepicker.css";
import { useModule } from "../../hooks/useModule";
import Spinner from "../../components/Spinner";
import EditModuleModal from "../../components/Modal_EditModule";
import SectionModuleGauge from "./components/SectionModuleGauge";
import SectionModuleChart from "./components/SectionModuleChart";

const ModuleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    module,
    readings,
    safeTemperatureRanges,
    fetchModule,
    fetchHistoricalReadings,
    editModule,
  } = useModule(id);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [recentTemperature, setRecentTemperature] = useState<number | null>(
    null
  );
  const recentReadings = useTemperatureStore((state) => state.recentReadings);
  
  useEffect(() => {
    // Get the most recent reading from socket
    const reading = recentReadings.find((reading) => reading.id === id);
    if (reading) {
      setRecentTemperature(reading.temperature);
    }
  }, [recentReadings, id]);

  useEffect(() => {
    fetchModule()
      .then(() => fetchHistoricalReadings("2021-10-01", "2021-10-02", "hourly"))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Failed to fetch module:", error);
      });
    setLoading(false);
  }, [fetchModule, fetchHistoricalReadings]);

  if (loading) {
    return <Spinner />;
  }

  if (module) {
    return (
      <div className="flex flex-col h-full">
        <EditModuleModal
          showModal={showModal}
          handleShowModal={setShowModal}
          editModule={editModule}
          initialData={module}
          icon={faEdit}
        />
        <div className="">
          <Header
            title={module?.name ?? ""}
            button={{
              text: "Edit",
              icon: faEdit,
              onClick: () => {
                setShowModal(true);
              },
            }}
          />
          <div
            className={`px-4 text-xs py-1 rounded-full mt-3 inline-block ${
              module?.available ? "bg-green_main text-black" : "bg-gray-500"
            }`}
          >
            {module?.available ? "Online" : "Offline"}
          </div>
          <p className="text-sm mt-4 text-gray-400 line-clamp-2 mb-5">
            {module?.description}
          </p>
        </div>
        <div className="flex-1 lg:grid lg:grid-cols-8 flex flex-col grid-rows-5 gap-4">
          <SectionModuleGauge module={module} recentTemperature={recentTemperature} safeTemperatureRanges={safeTemperatureRanges}/>
          <SectionModuleChart
            readings={readings}
            safeTemperatureRanges={safeTemperatureRanges}
          />
        </div>
      </div>
    );
  }
};

export default ModuleDetails;
