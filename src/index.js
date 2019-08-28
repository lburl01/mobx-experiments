import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import { WishList } from "./models/WishList";

const wishList = WishList.create({
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
});

ReactDOM.render(<App wishList={wishList} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
