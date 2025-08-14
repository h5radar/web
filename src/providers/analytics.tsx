import { FC } from "react";
import { YMInitializer } from "react-yandex-metrika";

import { useGooglePageTracking, useYandexPageTracking } from "@/hooks/use-page-tracking";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const GooglePageTracking = () => {
  useGooglePageTracking();
  return null;
};
const YandexPageTracking = () => {
  useYandexPageTracking();
  return null;
};

const AnalyticsProvider: FC<AnalyticsProviderProps> = (props) => {
  const { children } = props;
  return (
    <>
      {import.meta.env.VITE_YANDEX_METRICA && (
        <>
          <YMInitializer accounts={[parseInt(import.meta.env.VITE_YANDEX_METRICA)]} />
          <YandexPageTracking />
        </>
      )}
      {import.meta.env.VITE_GOOGLE_ANALYTICS && <GooglePageTracking />}
      {children}
    </>
  );
};

export default AnalyticsProvider;
