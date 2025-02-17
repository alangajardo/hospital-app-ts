import React from "react";

export interface IProtectedRoutes {
    children: React.ReactNode;
    allowRoles: string[];
}