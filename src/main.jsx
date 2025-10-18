import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/authContext/AuthProvider";
import { router } from "./router/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";

const stripePromise = loadStripe(
  "pk_test_51S98A9DwOLOq3USEUg6Z3Kn4WOzwjeFVZz7h9ccXUrG5kyZ6SlSNB7dzmSavhT6us9MuRsmrves601fZs6m9v8pf00mRxTKv1C"
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <AuthProvider>
          <div className="poppins-regular">
            <RouterProvider router={router} />
          </div>
        </AuthProvider>
      </Elements>
    </QueryClientProvider>
  </StrictMode>
);
