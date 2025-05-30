import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ChannelsPage from "@/pages/channels";

describe("ChannelsPage", () => {
  it("get channels page", () => {
    render(<ChannelsPage />);
    expect(screen.getByText("Channels")).toBeDefined();
  });
});
