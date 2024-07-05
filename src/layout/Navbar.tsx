import SearchBar from "../components/SearchBar";

const Navbar = () => {
  return (
    <div className="h-16 border-b border-gray_border bg-gray_darker shadow-2xl shadow-black/5">
      <div className="container mx-auto flex items-center justify-between h-full px-5">
        <a href="/" className="relative">
          <p className="text-2xl font-bold relative z-10">aquaponIQ.</p>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-1 my-auto w-8 h-8 bg-green_main rounded-full blur-md animate-cycle"></div>
        </a>
        <div className="flex md:mx-12 items-center gap-12">
          <SearchBar />
          <div className="rounded-full bg-green_main h-10 w-10 flex items-center justify-center">
            <p className="text-white text-xl">B</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
