import React, { Component } from "react";
import { observer } from "mobx-react";
import { withStyles } from "@material-ui/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class WishListItemEdit extends Component {
  render() {
    const { classes, item, renderActions } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <CardContent>
          <TextField
            id="outlined-name"
            label="Name"
            value={item.name || ""}
            onChange={this.onNameChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="price"
            label="Price"
            value={item.price}
            onChange={this.onPriceChange}
            margin="normal"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
          <TextField
            id="image"
            label="Image URL"
            value={item.image}
            onChange={this.onImageChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </CardContent>
        <CardActions>{renderActions()}</CardActions>
      </form>
    );
  }

  onNameChange = event => {
    this.props.item.changeName(event.target.value);
  };

  onPriceChange = event => {
    const price = parseInt(event.target.value);
    if (!isNaN(price)) this.props.item.changePrice(price);
  };

  onImageChange = event => {
    this.props.item.changeImage(event.target.value);
  };
}

export default withStyles(styles)(observer(WishListItemEdit));
