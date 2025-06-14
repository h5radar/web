import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router";
import { FC } from "react";
import { useAuth } from "react-oidc-context";


interface HotkeysProviderProps {
  children: React.ReactNode;
}

export const HotkeysProvider: FC<HotkeysProviderProps> = (props) => {
  const { children } = props;

  const auth = useAuth();
  const navigate = useNavigate();

  useHotkeys("ctrl+shift+u, meta+shift+u", () => auth.signoutRedirect(), [auth]);
  useHotkeys("ctrl+shift+c, meta+shift+c", () => navigate("/account"), [navigate]);
  useHotkeys("ctrl+shift+r, meta+shift+r", () => navigate("/"), [navigate]);
  useHotkeys("ctrl+shift+l, meta+shift+l", () => navigate("/billing"), [navigate]);
  useHotkeys("ctrl+shift+o, meta+shift+o", () => navigate("/notifications"), [navigate]);

  return <>{children}</>;
};

export default HotkeysProvider;
