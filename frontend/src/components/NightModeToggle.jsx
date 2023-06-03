import { useTheme } from "../hooks/useTheme";

function NightModeToggle() {
  const { isNightMode, toggleMode } = useTheme();

  return (
    <div>
      <label>
        <input type="checkbox" onChange={toggleMode} />
      </label>
    </div>
  );
}

export default NightModeToggle;
