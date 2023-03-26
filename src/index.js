

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { ChakraProvider } from '@chakra-ui/react'
import './globals.css'

import { SoftUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
      <SoftUIControllerProvider>
      <ChakraProvider>
          <App />
      </ChakraProvider>
      </SoftUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
