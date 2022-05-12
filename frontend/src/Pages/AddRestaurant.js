import RestaurantFrom from "../components/Restaurants/RestaurantInput/RestaurantForm";

const AddRestaurant = (props) => {
  return <RestaurantFrom onReload={props.onReload} />;
};

export default AddRestaurant;
