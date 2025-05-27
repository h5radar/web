import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import ParticipantsPage from "@/pages/participants";

test("ParticipantsPage", () => {
  render(<ParticipantsPage />);
  expect(screen.getByText("Participants")).toBeDefined();
});
