import { describe, it, expect } from "vitest";

import { buildBreadcrumbs } from "./breadcrumbs";

describe("buildBreadcrumbs", () => {
    it("returns correct breadcrumb for root path", () => {
        const result = buildBreadcrumbs("/");
        expect(result).toEqual([
            { label: "Home", path: "/", clickable: false },
        ]);
    });

    it("returns correct breadcrumbs for product detail page", () => {
        const result = buildBreadcrumbs("/product/1");
        expect(result).toEqual([
            { label: "Home", path: "/", clickable: true },
            { label: "Product", path: "/product/1", clickable: false },
        ]);
    });

    it("handles unknown routes by defaulting to Home", () => {
        const result = buildBreadcrumbs("/unknown-route");
        expect(result).toEqual([
            { label: "Home", path: "/", clickable: false },
        ]);
    });
});
