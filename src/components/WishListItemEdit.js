import React, { Component } from "react";
import { observer } from "mobx-react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  card: {
    maxWidth: 240
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

class WishListItemEdit extends Component {
  render() {
    const { classes, item } = this.props;
    return (
      <Card className={classes.card}>
        <form className={classes.container} noValidate autoComplete="off">
          <CardActionArea>
            <CardContent>
              <TextField
                id="outlined-name"
                label="Name"
                className={classes.textField}
                value={item.name || ""}
                onChange={this.onNameChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="price"
                label="Price"
                value={item.price}
                className={classes.textField}
                onChange={this.onPriceChange}
                margin="normal"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.props.onSave}>
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
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
