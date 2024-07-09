interface ToggleButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, isActive, onClick }) => (
  <button
    className={`button-black px-4 py-1 text-xs cursor-pointer transition-all select-none ${
      isActive ? "bg-green_main/50" : ""
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default ToggleButton;