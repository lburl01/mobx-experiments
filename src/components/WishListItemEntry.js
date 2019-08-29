import React, { Component } from "react";
import { observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";

import WishListItemEdit from "./WishListItemEdit";

import { WishListItem } from "../models/WishList";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  card: {
    ...theme.card
  }
});

class WishListItemEntry extends Component {
  constructor() {
    super();
    this.state = {
      entry: WishListItem.create({
        name: "",
        price: 0
      })
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subtitle1">Add Gift Idea</Typography>
          <WishListItemEdit
            item={this.state.entry}
            renderActions={() => (
              <Button size="small" color="primary" onClick={this.onAdd}>
                <Icon>add</Icon>
              </Button>
            )}
          />
        </CardContent>
      </Card>
    );
  }

  onAdd = () => {
    this.props.wishList.add(this.state.entry);
    this.setState({
      entry: WishListItem.create({ name: "", price: 0 })
    });
  };
}

export default withStyles(styles)(observer(WishListItemEntry));
