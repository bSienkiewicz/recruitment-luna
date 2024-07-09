import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ModuleType {
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
  postNewModule?: (body: Partial<ModuleType>) => void;
  editModule?: (body: Partial<ModuleType>) => void;
  initialData?: ModuleType;
  icon?: IconProp;
}