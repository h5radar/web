import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { BrowserRouter, Route, Routes } from "react-router";
import { toast } from "sonner";

import { onSigninCallback, userManager } from "@/auth-config";

import HotkeysProvider from "@/providers/hotkeys";
import PrivateProvider from "@/providers/private";

// Include layout
import AccountLayout from "@/layouts/account";
import ApplicationLayout from "@/layouts/application";
import BillingLayout from "@/layouts/billing";
import LegalLayout from "@/layouts/legal";
import NotificationsLayout from "@/layouts/notifications";
import RadarLayout from "@/layouts/radar";

// Include root pages at alphabet
import AboutPage from "@/pages/about";
import AccountPage from "@/pages/account";
import AdaptersPage from "@/pages/adapters";
import AuthorsPage from "@/pages/authors/table";
import BiSystemsPage from "@/pages/bi-systems";
import BillingPage from "@/pages/billing";
import ChannelsPage from "@/pages/channels";
import CobwebsPage from "@/pages/cobwebs";
import CompliancesEditPage from "@/pages/compliances/edit";
import CompliancesNewPage from "@/pages/compliances/new";
import { CompliancesPage } from "@/pages/compliances/table";
import DomainsEditPage from "@/pages/domains/edit";
import DomainsNewPage from "@/pages/domains/new";
import { DomainsPage } from "@/pages/domains/table";
import HomePage from "@/pages/home";
import InvoicesPage from "@/pages/invoices";
import LicensesEditPage from "@/pages/licenses/edit";
import LicensesNewPage from "@/pages/licenses/new";
import { LicensesPage } from "@/pages/licenses/table";
import MaturitiesEditPage from "@/pages/maturities/edit";
import MaturitiesNewPage from "@/pages/maturities/new";
import { MaturitiesPage } from "@/pages/maturities/table";
import NotificationsPage from "@/pages/notifications";
import ParticipantsPage from "@/pages/participants";
import PiesPage from "@/pages/pies";
import PlatformsPage from "@/pages/platforms";
import EditPracticePage from "@/pages/practices/edit";
import NewPracticesPage from "@/pages/practices/new";
import { PracticesPage } from "@/pages/practices/table";
import ProductsCommunicationsPage from "@/pages/products/communications";
import ProductsContributionsPage from "@/pages/products/contributions";
import ProductsEditPage from "@/pages/products/edit";
import ProductsFinancesPage from "@/pages/products/finances";
import ProductsLicensesPage from "@/pages/products/licenses";
import ProductsNewPage from "@/pages/products/new";
import ProductsPracticesPage from "@/pages/products/practices";
import { ProductsPage } from "@/pages/products/table";
import ProductsTechnologiesPage from "@/pages/products/technologies";
import ProfilePage from "@/pages/profile";
import RadarsEditPage from "@/pages/radars/edit";
import RadarsNewPage from "@/pages/radars/new";
import RadarsShowPage from "@/pages/radars/show";
import RadarsPage from "@/pages/radars/table";
import RaysPage from "@/pages/rays";
import RepositoriesPage from "@/pages/repositories/table";
import TeamsPage from "@/pages/teams/table";
import TechnologiesEditPage from "@/pages/technologies/edit";
import TechnologiesNewPage from "@/pages/technologies/new";
import { TechnologiesPage } from "@/pages/technologies/table";
import WelcomePage from "@/pages/welcome";

import "@/index.css";

/*
 * Create and configure query client. Default value for stale time is 0.
 * Here is stale time is equal 15 sec (= 1000 ms * 15).
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 15,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.errorMessage) {
        toast.error(query.meta.errorMessage.toString(), {
          description: error.message,
        });
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
        <QueryClientProvider client={queryClient}>
          <HotkeysProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateProvider>
                    <AccountLayout />
                  </PrivateProvider>
                }
              >
                <Route path="/account" element={<AccountPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="/" element={<ApplicationLayout />}>
                <Route path="/welcome" element={<WelcomePage />} />
              </Route>
              <Route
                path="/"
                element={
                  <PrivateProvider>
                    <BillingLayout />
                  </PrivateProvider>
                }
              >
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/invoices" element={<InvoicesPage />} />
              </Route>
              <Route
                path="/"
                element={
                  <PrivateProvider>
                    <NotificationsLayout />
                  </PrivateProvider>
                }
              >
                <Route path="/notifications" element={<NotificationsPage />} />
              </Route>
              <Route
                path="/"
                element={
                  <PrivateProvider>
                    <LegalLayout />
                  </PrivateProvider>
                }
              >
                <Route path="/about" element={<AboutPage />} />
              </Route>
              <Route
                path="/"
                element={
                  <PrivateProvider>
                    <RadarLayout />
                  </PrivateProvider>
                }
              >
                <Route index element={<HomePage />} />
                <Route path="/adapters" element={<AdaptersPage />} />
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/bi-systems" element={<BiSystemsPage />} />
                <Route path="/channels" element={<ChannelsPage />} />
                <Route path="/cobwebs" element={<CobwebsPage />} />
                <Route path="/compliances" element={<CompliancesPage />} />
                <Route path="/compliances/edit/:id" element={<CompliancesEditPage />} />
                <Route path="/compliances/new" element={<CompliancesNewPage />} />
                <Route path="/domains" element={<DomainsPage />} />
                <Route path="/domains/edit/:id" element={<DomainsEditPage />} />
                <Route path="/domains/new" element={<DomainsNewPage />} />
                <Route path="/licenses" element={<LicensesPage />} />
                <Route path="/licenses/edit/:id" element={<LicensesEditPage />} />
                <Route path="/licenses/new" element={<LicensesNewPage />} />
                <Route path="/maturities" element={<MaturitiesPage />} />
                <Route path="/maturities/edit/:id" element={<MaturitiesEditPage />} />
                <Route path="/maturities/new" element={<MaturitiesNewPage />} />
                <Route path="/participants" element={<ParticipantsPage />} />
                <Route path="/pies" element={<PiesPage />} />
                <Route path="/platforms" element={<PlatformsPage />} />
                <Route path="/practices" element={<PracticesPage />} />
                <Route path="/practices/edit/:id" element={<EditPracticePage />} />
                <Route path="/practices/new" element={<NewPracticesPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/edit/:id" element={<ProductsEditPage />} />
                <Route path="/products/new" element={<ProductsNewPage />} />
                <Route path="/products/show-communications/:id" element={<ProductsCommunicationsPage />} />
                <Route path="/products/show-contributions/:id" element={<ProductsContributionsPage />} />
                <Route path="/products/show-finances/:id" element={<ProductsFinancesPage />} />
                <Route path="/products/show-licenses/:id" element={<ProductsLicensesPage />} />
                <Route path="/products/show-practices/:id" element={<ProductsPracticesPage />} />
                <Route path="/products/show-technologies/:id" element={<ProductsTechnologiesPage />} />
                <Route path="/radars" element={<RadarsPage />} />
                <Route path="/radars/edit/:id" element={<RadarsEditPage />} />
                <Route path="/radars/new" element={<RadarsNewPage />} />
                <Route path="/radars/show/:id" element={<RadarsShowPage />} />
                <Route path="/rays" element={<RaysPage />} />
                <Route path="/repositories" element={<RepositoriesPage />} />
                <Route path="/segments" element={<DomainsPage />} />
                <Route path="/teams" element={<TeamsPage />} />
                <Route path="/technologies" element={<TechnologiesPage />} />
                <Route path="/technologies/edit/:id" element={<TechnologiesEditPage />} />
                <Route path="/technologies/new" element={<TechnologiesNewPage />} />
              </Route>
            </Routes>
          </HotkeysProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
