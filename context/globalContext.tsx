import { Calendar } from "nylas";
import { createContext, useContext, useState } from "react";

type GlobalContextProps = {
  brandName: string | null;
  calendar: Calendar;
  selectedMonthEvents: any;
  events: null | any;
  selectedDate: any;
  selectedDatesEvents: any;
  latestEvents: any;
  admin: any;
  upcomingEvents: any;
  user: any;
};

interface GlobalContextType {
  globalContext: GlobalContextProps | undefined;
  setGlobalContext: React.Dispatch<React.SetStateAction<GlobalContextProps>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({ children }) => {
  const [globalContext, setGlobalContext] = useState<
    GlobalContextProps | undefined
  >(undefined);

  return (
    <GlobalContext.Provider value={{ globalContext, setGlobalContext }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
