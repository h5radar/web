import { FC } from "react";
import { YMInitializer } from "react-yandex-metrika";

import usePageTracking from "@/hooks/use-page-tracking";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const PageTracking = () => {
  usePageTracking();
  return null;
};

const AnalyticsProvider: FC<AnalyticsProviderProps> = (props) => {
  const { children } = props;
  return (
    <>
      {import.meta.env.VITE_YANDEX_METRICA && (
        <YMInitializer accounts={[parseInt(import.meta.env.VITE_YANDEX_METRICA)]} />
      )}
      {import.meta.env.VITE_GOOGLE_ANALYTICS && <PageTracking />}
      {children}
    </>
  );
};
export default AnalyticsProvider;
