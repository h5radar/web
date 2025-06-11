import React from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

import { NavItem } from "@/types/nav-item";

import { CommandMenu } from "@/components/command-menu";

import { SearchContext } from "@/contexts/search";

interface SearchProviderProps {
  children: React.ReactNode;
  navItemList: NavItem[];
}

export function SearchProvider({ children, navItemList }: SearchProviderProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    const downAccount = (e: KeyboardEvent) => {
      if ((e.key === "a" || e.key === "A") && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        navigate("/account");
      }
    };
    document.addEventListener("keydown", downAccount);
    return () => document.removeEventListener("keydown", downAccount);
  }, [navigate]);

  React.useEffect(() => {
    const downRadar = (e: KeyboardEvent) => {
      if ((e.key === "r" || e.key === "R") && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        navigate("/");
      }
    };
    document.addEventListener("keydown", downRadar);
    return () => document.removeEventListener("keydown", downRadar);
  }, [navigate]);

  React.useEffect(() => {
    const downRadar = (e: KeyboardEvent) => {
      if ((e.key === "l" || e.key === "L") && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        navigate("/billing");
      }
    };
    document.addEventListener("keydown", downRadar);
    return () => document.removeEventListener("keydown", downRadar);
  }, [navigate]);

  React.useEffect(() => {
    const downRadar = (e: KeyboardEvent) => {
      if ((e.key === "o" || e.key === "O") && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        navigate("/notifications");
      }
    };
    document.addEventListener("keydown", downRadar);
    return () => document.removeEventListener("keydown", downRadar);
  }, [navigate]);

  React.useEffect(() => {
    const downRadar = (e: KeyboardEvent) => {
      if ((e.key === "u" || e.key === "U") && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        auth.signoutRedirect();
      }
    };
    document.addEventListener("keydown", downRadar);
    return () => document.removeEventListener("keydown", downRadar);
  }, [auth]);

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      <CommandMenu navItemList={navItemList} />
      {children}
    </SearchContext.Provider>
  );
}
