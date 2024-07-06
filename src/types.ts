import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface Module {
  id: string;
  name: string;
  description: string;
  available: boolean;
  targetTemperature: number;
}

export interface ModuleHistoryItem {
  timestamp: string;
  temperature: number;
}

export interface ModuleModalProps {
  showModal: boolean;
  handleShowModal: (isShown: boolean) => void;
  postNewModule?: (body: Partial<Module>) => void;
  editModule?: (body: Partial<Module>) => void;
  initialData?: Module;
  icon?: IconProp;
}