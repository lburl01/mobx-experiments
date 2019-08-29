import React from "react";
import ReactDOM from "react-dom";
import { onSnapshot } from "mobx-state-tree";

import App from "./components/App";
import { WishList } from "./models/WishList";
import * as serviceWorker from "./serviceWorker";

let initialState = {
  items: [
    {
      name: "New Camera",
      price: 833.33,
      image:
        "https://images.unsplash.com/photo-1566864222010-d45675442c31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80"
    },
    {
      name: "Circus Waffle Maker",
      price: 35
    }
  ]
};

if (localStorage.getItem("wishlistapp")) {
  initialState = JSON.parse(localStorage.getItem("wishlistapp"));
}

const wishList = WishList.create(initialState);

onSnapshot(wishList, snapshot => {
  const json = localStorage.setItem("wishlistapp", JSON.stringify(snapshot));
  // safeguard if we change our model a lot to make sure stored snapshot is valid
  if (WishList.is(json)) initialState = json;
});

ReactDOM.render(<App wishList={wishList} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
