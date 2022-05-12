/* eslint-disable jsx-a11y/img-redundant-alt */
import classes from "./RestaurantItemDetail.module.css";

import Button from "../UI/Button";
import Card from "../UI/Card";

const RestaurantItemDetail = (props) => {
  return (
    <Card>
      <div className={classes["item-box"]}>
        <div className={classes.image}>
          <img
            crossOrigin="anonymous"
            src={`http://localhost:8080/${props.imageUrl}`}
            alt="image"
          />
        </div>
        <h3>{props.name}</h3>
        <h4>{props.address}</h4>
        <div>
          <p>{props.introduction}</p>
        </div>
        <div>
          <Button onClick={props.onClose}>Cancel</Button>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantItemDetail;
