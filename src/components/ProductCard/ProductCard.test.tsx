import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductCard } from "./ProductCard";

const mockProduct = {
    id: "1",
    brand: "Samsung",
    model: "Galaxy S24",
    price: "899",
    imgUrl: "https://example.com/samsung.jpg",
};

describe("ProductCard", () => {
    it("renders product information", () => {
        render(
            <MemoryRouter>
                <ProductCard product={mockProduct} />
            </MemoryRouter>
        );

        expect(screen.getByText("Samsung")).toBeInTheDocument();
        expect(screen.getByText("Galaxy S24")).toBeInTheDocument();
        expect(screen.getByText("899 €")).toBeInTheDocument();
    });

    it("renders product image with alt text", () => {
        render(
            <MemoryRouter>
                <ProductCard product={mockProduct} />
            </MemoryRouter>
        );

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("alt", "Samsung Galaxy S24");
        expect(img).toHaveAttribute("src", mockProduct.imgUrl);
    });

    it("links to product detail page", () => {
        render(
            <MemoryRouter>
                <ProductCard product={mockProduct} />
            </MemoryRouter>
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/product/1");
    });

    it("has accessible aria-label", () => {
        render(
            <MemoryRouter>
                <ProductCard product={mockProduct} />
            </MemoryRouter>
        );

        expect(
            screen.getByLabelText(/view samsung galaxy s24 - 899 euros/i)
        ).toBeInTheDocument();
    });
});
