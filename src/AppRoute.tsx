import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Landing } from "./Landing/Landing";
import { Home } from "./Landing/Home";

export const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />}>
                    <Route path="/home/*" element={<Home />} />
                    <Route
                        path={"/"}
                        element={
                            <Navigate
                                to={"/home/story-to-syntex"}
                                replace
                            />
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
