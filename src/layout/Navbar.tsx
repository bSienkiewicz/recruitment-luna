const Navbar = () => {
  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      disabled: false,
    },
    {
      label: "Modules",
      href: "/modules",
      disabled: true,
    },
  ];
  return (
    <div className="h-16 border-b border-gray_border">
      <div className="container mx-auto flex items-center h-full">
        <p className="text-2xl font-bold">aquaponIQ.</p>
        <div className="flex justify-between flex-1 mx-12">
          <div className="navitems flex gap-12">
            {navItems.map((item, index) => (
              <a
                href={item.disabled ? "#" : item.href}
                className={
                  item.disabled
                    ? " text-gray-400 pointer-events-none cursor-not-allowed"
                    : ""
                }
                key={index}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="">szukajka</div>
        </div>
        <div className="rounded-full bg-green_main h-10 w-10 flex items-center justify-center">
          <p className="text-white text-xl">B</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
