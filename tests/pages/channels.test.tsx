import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import ChannelsPage from "@/pages/channels";

test("ChannelsPage", () => {
  render(<ChannelsPage />);
  expect(screen.getByText("Channels")).toBeDefined();
});
