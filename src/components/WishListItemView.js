import React, { Component } from "react";
import { observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

import placeholder from "../assets/nynne-schroder-4iOcciwDzRw-unsplash.jpg";
import WishListItemEdit from "./WishListItemEdit";

const styles = theme => ({
  card: {
    width: 240
  },
  media: {
    height: 240
  }
});

class WishListItemView extends Component {
  constructor() {
    super();
    this.state = { isEditing: false };
  }

  render() {
    const { classes, item } = this.props;

    return this.state.isEditing ? (
      this.renderEditable()
    ) : (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.image || placeholder}
            title={`${item.name} image`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h5">
              {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {item.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={this.onToggleEdit}>
            <Icon>edit</Icon>
          </Button>
        </CardActions>
      </Card>
    );
  }

  onToggleEdit = () => {
    this.setState({ isEditing: true });
  };

  renderEditable = () => {
    return (
      <WishListItemEdit
        item={this.props.item}
        onSave={() => this.setState({ isEditing: false })}
      />
    );
  };
}

export default withStyles(styles)(observer(WishListItemView));
