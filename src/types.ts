export interface Module {
  id: string;
  name: string;
  description: string;
  available: boolean;
  targetTemperature: number;
}

export interface AddModuleModalProps {
  showModal: boolean;
  handleShowModal: (isShown: boolean) => void;
  postNewModule: (body: Partial<Module>) => void;
}