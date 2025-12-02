import { useEffect, useState } from "react";
import { getInitialTheme, applyTheme, saveTheme } from "../utils/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button className="btn" onClick={toggle} aria-label="Toggle theme">
      {theme === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
    </button>
  );
}
