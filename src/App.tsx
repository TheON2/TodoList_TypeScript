import React from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import Main from "./layout/Main/Main";
import Detail from "./pages/Detail/Detail";
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/' element={<Main/>}/>
          <Route path='/:id' element={<Detail/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;