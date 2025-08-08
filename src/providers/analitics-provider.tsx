import { FC } from "react";
import { YMInitializer } from "react-yandex-metrika";

import usePageTracking from "@/hooks/use-page-tracking";

interface AnaliticsProviderProps {
  children: React.ReactNode;
}

const PageTracking = () => {
  usePageTracking();
  return null;
};

const AnaliticsProvider: FC<AnaliticsProviderProps> = (props) => {
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
export default AnaliticsProvider;
