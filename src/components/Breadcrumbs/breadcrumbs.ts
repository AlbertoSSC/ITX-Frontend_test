import { matchPath } from "react-router-dom";

import { BREADCRUMB_CONFIG } from "./breadcrumbs.config";

type Breadcrumb = { label: string; path: string; clickable: boolean };

export const buildBreadcrumbs = (pathname: string): Breadcrumb[] => {
    const rootConfig = BREADCRUMB_CONFIG.find((r) => r.pattern === "/");
    const rootLabel = rootConfig?.label ?? "Home";
    const rootPath = rootConfig?.pattern ?? "/";

    const match = BREADCRUMB_CONFIG.find((r) => matchPath({ path: r.pattern }, pathname));

    if (!match || match.pattern === "/") {
        return [{ label: rootLabel, path: rootPath, clickable: false }];
    }

    const crumbs: Breadcrumb[] = [
        { label: rootLabel, path: "/", clickable: true },
    ];

    crumbs.push({ label: match.label, path: pathname, clickable: false });

    return crumbs;
};
