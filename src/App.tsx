import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./layout/Main/Main";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient: QueryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
