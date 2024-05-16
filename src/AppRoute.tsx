import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Landing } from "./Landing/Landing";
import { Home } from "./Landing/Home";
import AuthModule from "./auth/Auth.module";
import SecureRoute from "./auth/SecureRoute";
import { MagicDecoder } from "./Landing/components/magicDecoder";
import StoryToSnippet from "./Landing/components/storyToSnippet";

export const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />}>
                    <Route path="/auth/*" element={<AuthModule />} />
                    <Route element={<SecureRoute />}>
                        <Route path="/*" element={<Home />} />
                        <Route
                            path={"/magic-decoder"}
                            element={
                                <MagicDecoder />
                            }
                        />
                          <Route
                            path={"/story-to-syntex"}
                            element={
                                <StoryToSnippet />
                            }
                        />                      
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
