import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/pages/home";
import { store } from "@/store";

describe("HomePage", () => {
  it("get home page", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <HomePage />
        </QueryClientProvider>,
      </Provider>
    );
    // TODO: fixme
    expect(screen.getByText("Loading...")).toBeDefined();
    // expect(screen.getByText("Home")).toBeDefined();
  });
});
