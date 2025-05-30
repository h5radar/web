import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ParticipantsPage from "@/pages/participants";

describe("ParticipantsPage", () => {
  it("get participants page", () => {
    render(<ParticipantsPage />);
    expect(screen.getByText("Participants")).toBeDefined();
  });
});
