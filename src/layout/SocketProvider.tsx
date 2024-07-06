import { useSocketConnection } from "../hooks/useSocketConnection";

const AppProvider = ({ children }: any) => {
  useSocketConnection();
  return (
    <>
      {children}
    </>
  );
};

export default AppProvider;
