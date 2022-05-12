import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div
      className={`${classes["form-input"]} ${
        props.postItem ? classes["post-item"] : ""
      }`}
    >
      <label htmlFor={props.name}>{props.title}</label>
      <input
        name={props.name}
        id={props.name}
        type={props.type}
        defaultValue={props.defaultValue}
        spellCheck="false"
        autoComplete="false"
      />
    </div>
  );
};

export default Input;
