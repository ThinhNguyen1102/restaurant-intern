import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${classes.card} ${
        props.classes ? classes["wrapper-100vh"] : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
