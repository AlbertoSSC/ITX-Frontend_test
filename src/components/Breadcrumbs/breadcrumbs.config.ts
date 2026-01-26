type BreadcrumbConfig = {
    pattern: string;
    label: string;
};

export const BREADCRUMB_CONFIG: BreadcrumbConfig[] = [
    { pattern: "/", label: "Home" },
    { pattern: "/product/:id", label: "Product" },
];
