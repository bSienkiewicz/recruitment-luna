import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { Module } from "../types";

const ModuleID = () => {
  const { id } = useParams<{ id: string }>();
  const [module, setModule] = useState<Module>();
  const navigate = useNavigate();

  const fetchModules = useCallback(async () => {
    if (!id) return;
    try {
      const data = await api.getModule(id);
      setModule(data);
    } catch (error: any) {
      // TODO: Handle 404 error
    }
  }, []);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return (
    <>
      <div>
      <h1 className="text-3xl font-medium">{module?.name}</h1>
        <p>{module?.description}</p>
        <p>{module?.targetTemperature}</p>
      </div>
    </>
  );
};

export default ModuleID;
