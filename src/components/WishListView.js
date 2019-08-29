import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import WishListItemView from "./WishListItemView";
import WishListItemEntry from "./WishListItemEntry";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const WishListView = ({ wishList }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {wishList.items.map((item, idx) => (
            <Grid item key={idx}>
              <WishListItemView key={idx} item={item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Typography variant="h2">Total: ${wishList.totalPrice}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <WishListItemEntry wishList={wishList} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default observer(WishListView);
