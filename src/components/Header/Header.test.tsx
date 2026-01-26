import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import { CartProvider } from "../../context/CartContext";

const renderWithProviders = (initialEntries: string[] = ["/"]) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <CartProvider>
                <Header />
            </CartProvider>
        </MemoryRouter>
    );
};

describe("Header", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    describe("Logo", () => {
        it("renders logo with link to home", () => {
            renderWithProviders();

            const logo = screen.getByRole("link", { name: /mobile store/i });
            expect(logo).toHaveAttribute("href", "/");
        });
    });

    describe("Breadcrumbs", () => {
        it("shows Home on root path", () => {
            renderWithProviders();
            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByRole("listitem").textContent).toBe("Home");
        });

        it("shows Home and Product on product detail page (hides ID)", () => {
            renderWithProviders(["/product/123"]);

            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByText("Product")).toBeInTheDocument();
            expect(screen.queryByText("123")).not.toBeInTheDocument();
        });

        it("Home is a link on product page", () => {
            renderWithProviders(["/product/123"]);
            const homeLink = screen.getByRole("link", { name: "Home" });
            expect(homeLink).toHaveAttribute("href", "/");
        });

        it("Product is current page without link", () => {
            renderWithProviders(["/product/123"]);

            const productSpan = screen.getByText("Product");
            expect(productSpan).toHaveAttribute("aria-current", "page");
            expect(screen.queryByRole("link", { name: "Product" })).not.toBeInTheDocument();
        });
    });

    describe("Cart", () => {
        it("displays cart count of 0 by default", () => {
            renderWithProviders();

            expect(screen.getByText("0")).toBeInTheDocument();
        });

        it("displays stored cart count", () => {
            localStorage.setItem("cartCount", "3");
            renderWithProviders();

            expect(screen.getByText("3")).toBeInTheDocument();
        });

        it("has accessible aria-label", () => {
            localStorage.setItem("cartCount", "5");
            renderWithProviders();

            expect(
                screen.getByRole("status", { name: /shopping cart: 5 items/i })
            ).toBeInTheDocument();
        });
    });
});
