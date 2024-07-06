import { useNavigate } from "react-router-dom";
import SearchBar from "../components/ui/SearchBar";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-16 shadow-2xl shadow-black/5">
      <div className="container mx-auto flex items-center justify-between h-full px-5">
        <div onClick={()=> navigate("/")} className="relative cursor-pointer select-none h-full flex items-center">
          <p className="text-2xl font-bold relative z-10">hydroponIQ.</p>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-1 my-auto w-8 h-8 bg-green_main rounded-full blur-md animate-cycle"></div>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar />
          <div className="rounded-full bg-green_main h-8 w-8 flex items-center justify-center">
            <p className="text-white">B</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
