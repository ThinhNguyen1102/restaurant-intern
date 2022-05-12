import "../UI/grid.css";
import RestaurantItem from "./RestaurantItem";

const RestaurantList = (props) => {
  return (
    <div className="grid wide">
      <div className="row">
        {props.restaurants.map((item) => {
          return (
            <RestaurantItem
              key={item.id}
              id={item.id}
              name={item.name}
              address={item.address}
              introduction={item.introduction}
              imageUrl={item.imageUrl}
              onReload={props.onReload}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantList;
