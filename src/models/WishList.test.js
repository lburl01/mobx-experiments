import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
import { reaction } from "mobx";

import { WishList, WishListItem } from "./WishList";

it("can create an instance of a model", () => {
  const item = WishListItem.create({
    name: "New Camera",
    price: 833.33
  });

  expect(item.price).toBe(833.33);
  expect(item.image).toBe("");
  item.changeName("Nikon Camera");
  expect(item.name).toBe("Nikon Camera");
});

it("can create a wishlist", () => {
  const list = WishList.create({
    items: [
      {
        name: "New Camera",
        price: 833.33
      }
    ]
  });
  expect(list.items.length).toBe(1);
  expect(list.items[0].price).toBe(833.33);
});

it("can add new items", () => {
  const list = WishList.create();
  const states = [];
  onSnapshot(list, snapshot => {
    states.push(snapshot);
  });

  list.add({
    name: "Waffle Maker",
    price: 25.0
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].name).toBe("Waffle Maker");
  list.items[0].changeName("Circus Waffle Maker");

  expect(getSnapshot(list)).toMatchSnapshot();
  expect(states).toMatchSnapshot();
});

it("can add new items with onPatch", () => {
  const list = WishList.create();
  const patches = [];
  onPatch(list, patch => {
    patches.push(patch);
  });

  list.add({
    name: "Waffle Maker",
    price: 25.0
  });

  list.items[0].changeName("Circus Waffle Maker");

  expect(patches).toMatchSnapshot();
});

it("can calculate the total price of a wishlist", () => {
  const list = WishList.create({
    items: [
      {
        name: "Waffle Maker",
        price: 25.0
      },
      {
        name: "New Camera",
        price: 833.33
      }
    ]
  });

  expect(list.totalPrice).toBe(858.33);

  let changed = 0;
  reaction(() => list.totalPrice, () => changed++);
  expect(changed).toBe(0);
  list.items[0].changeName("Test");
  expect(changed).toBe(0);
  list.items[0].changePrice(50);
  expect(changed).toBe(1);
});
