import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router";
import ym from "react-yandex-metrika";

export const usePageTrackingGoogle = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
};

export const usePageTrackingYandex = () => {
  const location = useLocation();

  useEffect(() => {
    ym("hit", location.pathname);
  }, [location]);
};
