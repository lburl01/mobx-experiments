import React, { Component } from "react";
import { observer } from "mobx-react";
import { clone, applySnapshot, getSnapshot } from "mobx-state-tree";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

import placeholder from "../assets/nynne-schroder-4iOcciwDzRw-unsplash.jpg";
import WishListItemEdit from "./WishListItemEdit";

const styles = theme => ({
  card: {
    ...theme.card
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

    return (
      <Card className={classes.card}>
        {this.state.isEditing ? (
          this.renderEditable()
        ) : (
          <>
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
            <CardActions>
              <Button size="small" color="primary" onClick={this.onShowEdit}>
                <Icon>edit</Icon>
              </Button>
              <Button size="small" color="secondary" onClick={item.remove}>
                <Icon>delete</Icon>
              </Button>
            </CardActions>
          </>
        )}
      </Card>
    );
  }

  renderEditable = () => {
    return (
      <WishListItemEdit
        item={this.state.clone}
        renderActions={() => (
          <>
            <Button size="small" color="primary" onClick={this.onSave}>
              Save
            </Button>
            <Button size="small" color="secondary" onClick={this.onCancelEdit}>
              Cancel
            </Button>
          </>
        )}
      />
    );
  };

  onShowEdit = () => {
    this.setState({
      isEditing: true,
      clone: clone(this.props.item)
    });
  };

  onCancelEdit = () => {
    this.setState({ isEditing: false });
  };

  onSaveEdit = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone));
    this.setState({
      isEditing: false,
      clone: null
    });
  };
}

export default withStyles(styles)(observer(WishListItemView));
