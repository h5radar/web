import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router";

export const HotkeyGlobal = () => {
  const navigate = useNavigate();

  useHotkeys("ctrl+shift+a, meta+shift+a", () => navigate("/account"), [navigate]);
  useHotkeys("ctrl+shift+r, meta+shift+r", () => navigate("/"), [navigate]);
  useHotkeys("ctrl+shift+l, meta+shift+l", () => navigate("/billing"), [navigate]);
  useHotkeys("ctrl+shift+o, meta+shift+o", () => navigate("/notifications"), [navigate]);
  return null;
};
