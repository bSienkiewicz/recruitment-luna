import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  faChevronLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../layout/Header";
import useTemperatureStore from "../store/temperatures";
import "react-datepicker/dist/react-datepicker.css";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/ui/Spinner";
import SectionModuleGauge from "../components/SectionModuleGauge";
import SectionModuleChart from "../components/SectionModuleChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModuleModal from "../components/ui/ModuleModal";

const ModuleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    module,
    safeTemperatureRanges,
    fetchModule,
    fetchHistoricalReadings,
    editModule,
  } = useFetch(id);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [recentTemperature, setRecentTemperature] = useState<number>(0);
  const recentReadings = useTemperatureStore((state) => state.recentReadings);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the most recent reading from socket
    const reading = recentReadings.find((reading) => reading.id === id);
    if (reading) {
      setRecentTemperature(reading.temperature);
    }
  }, [recentReadings, id]);

  useEffect(() => {
    fetchModule()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Failed to fetch module:", error);
      });
    setLoading(false);
  }, [fetchModule, fetchHistoricalReadings]);

  if (loading) {
    return <Spinner />;
  }

  if (module && id) {
    return (
      <div className="flex flex-col h-full">
        <ModuleModal
          showModal={showModal}
          onSubmit={editModule}
          handleShowModal={setShowModal}
          icon={faEdit}
          isEditMode={true}
          initialData={module}
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
              disabled: !module.available,
            }}
          />
          <div className="flex items-center mt-3 gap-3">
            <div
              className={`px-4 text-xs py-1 rounded-full ${
                module?.available ? "bg-green_main text-black" : "bg-gray-500"
              }`}
            >
              {module?.available ? "Online" : "Offline"}
            </div>
            <div
              className="cursor-pointer px-4 py-1 rounded-full text-xs border border-lighter_dark"
              onClick={() => {
                navigate("/");
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="cursor-pointer mr-2"
              />{" "}
              Back to modules
            </div>
          </div>
          <p className="text-sm mt-4 text-gray-400 line-clamp-2 mb-5">
            {module?.description}
          </p>
        </div>
        <div className="flex-1 lg:grid lg:grid-cols-8 flex flex-col grid-rows-[auto_1fr] gap-4">
          <SectionModuleGauge
            module={module}
            recentTemperature={recentTemperature}
            safeTemperatureRanges={safeTemperatureRanges}
          />
          <SectionModuleChart
            safeTemperatureRanges={safeTemperatureRanges}
            recentTemperature={recentTemperature}
            module={module}
            id={id}
          />
        </div>
      </div>
    );
  }
};

export default ModuleDetails;
