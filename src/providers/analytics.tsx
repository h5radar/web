import { FC } from "react";
import { YMInitializer } from "react-yandex-metrika";

import { usePageTrackingGoogle, usePageTrackingYandex } from "@/hooks/use-page-tracking";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const PageTrackingGoogle = () => {
  usePageTrackingGoogle();
  return null;
};
const PageTrackingYandex = () => {
  usePageTrackingYandex();
  return null;
};

const AnalyticsProvider: FC<AnalyticsProviderProps> = (props) => {
  const { children } = props;
  return (
    <>
      {import.meta.env.VITE_YANDEX_METRICA && (
        <>
          <YMInitializer accounts={[parseInt(import.meta.env.VITE_YANDEX_METRICA)]} />
          <PageTrackingYandex />
        </>
      )}
      {import.meta.env.VITE_GOOGLE_ANALYTICS && <PageTrackingGoogle />}
      {children}
    </>
  );
};
export default AnalyticsProvider;
