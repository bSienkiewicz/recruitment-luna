import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  faChevronLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../layout/Header";
import useTemperatureStore from "../store/temperatures";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../components/ui/Spinner";
import SectionModuleGauge from "../components/SectionModuleGauge";
import SectionModuleChart from "../components/SectionModuleChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModuleModal from "../components/ui/ModuleModal";
import { useModule } from "../hooks/useFetch";
import ErrorDisplay from "../components/ErrorDisplay";

const ModuleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    module,
    safeTemperatureRanges,
    fetchModule,
    patchModule,
    isLoading,
    error
  } = useModule(id);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [recentTemperature, setRecentTemperature] = useState<number>(0);
  const recentReadings = useTemperatureStore((state) => state.recentReadings);
  const navigate = useNavigate();

  useEffect(() => {
    if (!module) return;
    const reading = recentReadings.find((reading) => reading.id === id);
    if (reading) {
      setRecentTemperature(reading.temperature);
    }
  }, [recentReadings, id, module]);

  useEffect(() => {
    fetchModule();
  }, [fetchModule]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!module || !id) {
    return <ErrorDisplay error="No module data available" />;
  }

  if (module && id) {
    return (
      <div className="flex flex-col h-full">
        <ModuleModal
          showModal={showModal}
          onSubmit={patchModule}
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
            <button
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
            </button>
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
