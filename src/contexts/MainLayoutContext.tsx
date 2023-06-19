import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from "react";
import useDebounceValue from "hooks/useDebounceValue";
import { Doctor } from "types/Doctor";

interface IMainLayoutContext {
  searchTerm: string;
  debouncedSearchTerm: string;
  selectedDoctor?: Doctor;
  isModalVisible: boolean;
  setSearchTerm?: Dispatch<SetStateAction<string>>;
  setSelectedDoctor?: Dispatch<SetStateAction<Doctor | undefined>>;
  setModalVisible?: Dispatch<SetStateAction<boolean>>;
  resetContextData: () => void;
}

const mainLayoutContext = createContext<IMainLayoutContext>({
  searchTerm: "",
  debouncedSearchTerm: "",
  selectedDoctor: undefined,
  isModalVisible: false,
  resetContextData: () => ({})
});

const MainLayoutContext = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [isModalVisible, setModalVisible] = useState(false);
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);

  const resetContextData = useCallback(() => {
    setSearchTerm("");
    setSelectedDoctor(undefined);
    setModalVisible(false);
  }, []);

  return (
    <mainLayoutContext.Provider
      value={{
        searchTerm,
        selectedDoctor,
        isModalVisible,
        debouncedSearchTerm,
        setSearchTerm,
        setSelectedDoctor,
        setModalVisible,
        resetContextData
      }}
    >
      {children}
    </mainLayoutContext.Provider>
  );
};

export default MainLayoutContext;

export function useMainLayoutContext() {
  return useContext(mainLayoutContext);
}
