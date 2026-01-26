import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CartProvider, useCart } from "./CartContext";

const TestComponent = () => {
    const { cartCount, addToCart } = useCart();
    return (
        <div>
            <span data-testid="count">{cartCount}</span>
            <button
                onClick={() =>
                    addToCart({ id: "1", colorCode: 0, storageCode: 0 })
                }
            >
                Add
            </button>
        </div>
    );
};

describe("CartContext", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it("provides initial cart count of 0", () => {
        render(
            <MemoryRouter>
                <CartProvider>
                    <TestComponent />
                </CartProvider>
            </MemoryRouter>
        );

        expect(screen.getByTestId("count")).toHaveTextContent("0");
    });

    it("updates cart count after adding item", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
            json: () => Promise.resolve({ count: 1 }),
        } as Response);

        render(
            <MemoryRouter>
                <CartProvider>
                    <TestComponent />
                </CartProvider>
            </MemoryRouter>
        );

        await userEvent.click(screen.getByRole("button", { name: /add/i }));

        await waitFor(() => {
            expect(screen.getByTestId("count")).toHaveTextContent("1");
        });
    });
});
