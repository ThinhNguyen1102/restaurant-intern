import Button from "../../UI/Button";
import { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";

import Card from "../../UI/Card";
import classes from "./RestaurantFrom.module.css";
import Input from "../../UI/Input";
import AuthContext from "../../../store/auth-context";

const RestaurantFrom = (props) => {
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddFinished, setIsAddFinished] = useState(false);
  const param = useParams();
  const restId = param.restId;

  const authCxt = useContext(AuthContext);

  useEffect(() => {
    if (restId) {
      setRestaurantId(restId);
    } else {
      setIsEdit(false);
    }
  }, [restId]);

  const fetchRestaurantHandle = useCallback(async () => {
    if (!restaurantId) {
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${authCxt.token}`,
          },
        }
      );
      if (!response) {
        throw new Error("Something went wrong!");
      }
      setRestaurant(response.data.result);
      setIsEdit(true);
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  useEffect(() => {
    fetchRestaurantHandle();
  }, [fetchRestaurantHandle]);

  const postRestaurantHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      if (isEdit) {
        if (!formData.get("image").name) {
          formData.set("image", restaurant.imageUrl);
        }
        try {
          const response = await axios.put(
            `http://localhost:8080/api/v1/restaurants/${restaurantId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${authCxt.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (!response) {
            throw new Error("Something went wrong!");
          }
          setIsAddFinished(true);
          props.onReload();
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const response = await axios.post(
            `http://localhost:8080/api/v1/restaurants`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${authCxt.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (!response) {
            throw new Error("Something went wrong!");
          }
          setIsAddFinished(true);
          props.onReload();
        } catch (err) {
          console.log(err);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEdit, restaurantId]
  );

  return (
    <div className={classes["form-wrapper"]}>
      {isAddFinished && <Navigate to={`/`} state={{ reload: true }}></Navigate>}
      <Card>
        <form
          className={classes["form-control"]}
          onSubmit={postRestaurantHandler}
        >
          <Input
            title="Name"
            name="name"
            type="text"
            defaultValue={isEdit ? restaurant.name : ""}
            postItem={true}
          />
          <Input
            title="Address"
            name="address"
            type="text"
            defaultValue={isEdit ? restaurant.address : ""}
            postItem={true}
          />
          <div className={classes["form-input"]}>
            <label>Restaurant info</label>
            <textarea
              name="introduction"
              spellCheck="false"
              type="text"
              defaultValue={isEdit ? restaurant.introduction : ""}
            />
          </div>
          <div className={classes["form-input"]}>
            <label>Image</label>
            <input
              name="image"
              spellCheck="false"
              type="file"
              // defaultValue={isEdit ? restaurant.imageUrl : ""}
            />
          </div>
          <div className={classes["btn-box"]}>
            <Button type="submit">
              {isEdit ? "Update Restaurant" : "Add Restaurant"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RestaurantFrom;
