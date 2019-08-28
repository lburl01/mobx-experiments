import React from "react";
import { ThemeProvider } from "@material-ui/styles";

import theme from "../assets/theme";

import "./App.css";

import WishListView from "./WishListView";

function App({ wishList }) {
  return (
    <ThemeProvider theme={theme}>
      <WishListView wishList={wishList} />
    </ThemeProvider>
  );
}

export default App;
