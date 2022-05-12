import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Fragment, useCallback, useEffect, useState } from "react";

import Navigation from "./components/Header/Navigation";
import About from "./Pages/About";
import AddRestaurant from "./Pages/AddRestaurant";
import Home from "./Pages/Home";
import Restaurants from "./Pages/Restaurants";
import Card from "./components/UI/Card";
import RestaurantList from "./components/Restaurants/RestaurantList";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isReFetch, setIsRefetch] = useState(null);

  const reFetchHandle = () => {
    setIsRefetch({});
  };

  const fetchRestaurantHandle = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/restaurants"
      );
      if (!response) {
        throw new Error("Something went wrong!");
      }

      const loadedRestaurants = response.data.result;
      setRestaurants(loadedRestaurants);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReFetch]);

  useEffect(() => {
    fetchRestaurantHandle();
  }, [fetchRestaurantHandle]);

  let content = (
    <Card>
      <p>Found no movies.</p>
    </Card>
  );

  if (restaurants.length > 0) {
    content = (
      <RestaurantList restaurants={restaurants} onReload={reFetchHandle} />
    );
  }

  if (error) {
    content = (
      <Card>
        <p>{error}</p>
      </Card>
    );
  }

  if (isLoading) {
    // eslint-disable-next-line no-unused-vars
    content = (
      <Card>
        <p>Loading...</p>
      </Card>
    );
  }

  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home>{content}</Home>} />
        <Route
          path="/restaurants"
          element={<Restaurants>{content}</Restaurants>}
        />
        <Route
          path="/add-restaurant"
          element={<AddRestaurant onReload={reFetchHandle} />}
        >
          <Route path=":restId" element={<AddRestaurant />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Fragment>
  );
}

export default App;
