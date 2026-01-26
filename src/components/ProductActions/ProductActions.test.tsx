import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ProductActions } from "./ProductActions";
import { CartProvider } from "../../context/CartContext";

const mockProduct = {
    id: "1",
    brand: "Apple",
    model: "iPhone 14",
    price: "999",
    imgUrl: "https://example.com/iphone.jpg",
    cpu: "A15 Bionic",
    ram: "6GB",
    os: "iOS 16",
    displayResolution: "2532x1170",
    battery: "3279 mAh",
    primaryCamera: ["12MP", "12MP"],
    secondaryCmera: "12MP",
    dimentions: "146.7 x 71.5 x 7.8 mm",
    weight: "172",
    colors: ["Black", "White", "Blue"],
    internalMemory: ["128GB", "256GB", "512GB"],
    options: {
        colors: [
            { code: 1000, name: "Black" },
            { code: 1001, name: "White" },
            { code: 1002, name: "Blue" },
        ],
        storages: [
            { code: 2000, name: "128GB" },
            { code: 2001, name: "256GB" },
            { code: 2002, name: "512GB" },
        ],
    },
};

const renderWithProviders = (product = mockProduct) => {
    return render(
        <MemoryRouter>
            <CartProvider>
                <ProductActions product={product} />
            </CartProvider>
        </MemoryRouter>
    );
};

describe("ProductActions", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it("renders color and storage options", () => {
        renderWithProviders();

        expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/storage/i)).toBeInTheDocument();
    });

    it("displays all color options", () => {
        renderWithProviders();

        const colorSelect = screen.getByLabelText(/color/i);
        expect(colorSelect).toHaveValue("1000");

        const options = colorSelect.querySelectorAll("option");
        expect(options).toHaveLength(3);
    });

    it("displays all storage options", () => {
        renderWithProviders();

        const storageSelect = screen.getByLabelText(/storage/i);
        expect(storageSelect).toHaveValue("2000");

        const options = storageSelect.querySelectorAll("option");
        expect(options).toHaveLength(3);
    });

    it("allows changing color selection", async () => {
        renderWithProviders();

        const colorSelect = screen.getByLabelText(/color/i);
        await userEvent.selectOptions(colorSelect, "White");

        expect(colorSelect).toHaveValue("1001");
    });

    it("allows changing storage selection", async () => {
        renderWithProviders();

        const storageSelect = screen.getByLabelText(/storage/i);
        await userEvent.selectOptions(storageSelect, "256GB");

        expect(storageSelect).toHaveValue("2001");
    });

    it("adds product to cart when button is clicked", async () => {
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
            json: () => Promise.resolve({ count: 1 }),
        } as Response);

        renderWithProviders();

        const addButton = screen.getByRole("button", { name: /add to cart/i });
        await userEvent.click(addButton);

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalledWith(
                "https://itx-frontend-test.onrender.com/api/cart",
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify({
                        id: "1",
                        colorCode: 1000,
                        storageCode: 2000,
                    }),
                })
            );
        });
    });

    it("disables button after adding to cart", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
            json: () => Promise.resolve({ count: 1 }),
        } as Response);

        renderWithProviders();

        await userEvent.click(screen.getByRole("button", { name: /add to cart/i }));

        await waitFor(() => {
            expect(screen.getByRole("button", { name: /added to cart/i })).toBeDisabled();
        });
    });

    it("shows error message when add to cart fails", async () => {
        vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network error"));

        renderWithProviders();

        await userEvent.click(screen.getByRole("button", { name: /add to cart/i }));

        await waitFor(() => {
            expect(screen.getByRole("alert")).toBeInTheDocument();
        });
    });
});
