import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
    it("renders with placeholder", () => {
        render(<SearchBar value="" onChange={() => { }} />);

        expect(
            screen.getByPlaceholderText(/search by brand or model/i)
        ).toBeInTheDocument();
    });

    it("calls onChange when typing", async () => {
        const handleChange = vi.fn();
        render(<SearchBar value="" onChange={handleChange} />);

        await userEvent.type(screen.getByRole("searchbox"), "iPhone");

        expect(handleChange).toHaveBeenCalled();
    });

    it("shows clear button when value is not empty", () => {
        render(<SearchBar value="test" onChange={() => { }} />);

        expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
    });

    it("hides clear button when value is empty", () => {
        render(<SearchBar value="" onChange={() => { }} />);

        expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
    });

    it("clears search when clear button is clicked", async () => {
        const handleChange = vi.fn();
        render(<SearchBar value="test" onChange={handleChange} />);

        await userEvent.click(screen.getByRole("button", { name: /clear/i }));

        expect(handleChange).toHaveBeenCalledWith("");
    });

    it("has accessible role search", () => {
        render(<SearchBar value="" onChange={() => { }} />);

        expect(screen.getByRole("search")).toBeInTheDocument();
    });
});
