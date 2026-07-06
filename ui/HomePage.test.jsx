import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { MemoryRouter } from "react-router-dom";
import { expect } from "vitest";


beforeEach(() => {
    render(
        <SettingsProvider>
            <RouterProvider router = {router}/>
        </SettingsProvider>
    )
})

test("MyBank is on screen", async () => {
    expect(await screen.findByText("MyBank")).toBeInTheDocument();
});

test("Home Link is on the screen", () => {
    expect(screen.getByText("Home")).toBeInTheDocument();
});

test('Trigger Settings click event', async () => {
    const settings = screen.getByText("Settings");
    fireEvent.click(settings);
    expect(screen.getByText("Settings")).toBeInTheDocument();
})