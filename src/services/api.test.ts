import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProducts, getProductById, addToCart, getCartCount } from "./api";

const mockProduct = {
    id: "1",
    brand: "Apple",
    model: "iPhone 14",
    price: "999",
    imgUrl: "https://example.com/iphone.jpg",
};

const mockProductDetail = {
    ...mockProduct,
    cpu: "A15 Bionic",
    ram: "6GB",
    os: "iOS 16",
    displayResolution: "2532x1170",
    battery: "3279 mAh",
    primaryCamera: ["12MP", "12MP"],
    secondaryCmera: "12MP",
    dimentions: "146.7 x 71.5 x 7.8 mm",
    weight: "172",
    colors: ["Black", "White"],
    internalMemory: ["128GB", "256GB"],
};

describe("API Service", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    describe("getProducts", () => {
        it("fetches products from API", async () => {
            vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
                json: () => Promise.resolve([mockProduct]),
            } as Response);

            const products = await getProducts();

            expect(products).toHaveLength(1);
            expect(products[0].brand).toBe("Apple");
        });

        it("returns cached products on second call without fetching again", async () => {
            const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
                json: () => Promise.resolve([mockProduct]),
            } as Response);

            const firstCall = await getProducts();
            const secondCall = await getProducts();

            expect(fetchSpy).toHaveBeenCalledTimes(1);
            expect(firstCall).toEqual(secondCall);
            expect(secondCall).toHaveLength(1);
            expect(secondCall[0].brand).toBe("Apple");
        });
    });

    describe("getProductById", () => {
        it("fetches product details from API", async () => {
            vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
                json: () => Promise.resolve(mockProductDetail),
            } as Response);

            const product = await getProductById("1");

            expect(product.brand).toBe("Apple");
            expect(product.colors).toContain("Black");
        });
    });

    describe("addToCart", () => {
        it("adds product to cart and updates localStorage", async () => {
            vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
                json: () => Promise.resolve({ count: 1 }),
            } as Response);

            const result = await addToCart({
                id: "1",
                colorCode: 1000,
                storageCode: 2000,
            });

            expect(result.count).toBe(1);
            expect(localStorage.getItem("cartCount")).toBe("1");
        });
    });

    describe("getCartCount", () => {
        it("returns 0 when cart is empty", () => {
            expect(getCartCount()).toBe(0);
        });

        it("returns stored count", () => {
            localStorage.setItem("cartCount", "5");
            expect(getCartCount()).toBe(5);
        });
    });
});
