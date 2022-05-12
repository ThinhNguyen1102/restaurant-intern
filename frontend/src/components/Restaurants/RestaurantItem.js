/* eslint-disable jsx-a11y/img-redundant-alt */
import { useCallback, useContext, useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./RestaurantItem.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useLocation, Navigate } from "react-router-dom";
import RestaurantItemDetail from "./RestaurantItemDetail";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const RestaurantItem = (props) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRedirectEdit, setIsRedirectEdit] = useState(false);

  const authCxt = useContext(AuthContext);

  const pathname = useLocation().pathname;

  useEffect(() => {
    if (pathname === "/restaurants") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [pathname]);

  const showDetaiHandler = () => {
    setIsShowDetail(true);
  };

  const onClose = () => {
    setIsShowDetail(false);
  };

  const onEditHandlerClick = () => {
    setIsRedirectEdit(true);
  };

  const deleteRestaranthandle = useCallback(() => {
    try {
      axios.delete(`http://localhost:8080/api/v1/restaurants/${props.id}`, {
        headers: {
          Authorization: `Bearer ${authCxt.token}`,
        },
      });
      props.onReload();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`col l-4 m-6 c-12 ${classes["wrapper-item"]}`}>
      {isRedirectEdit && (
        <Navigate to={`/add-restaurant/${props.id}`}></Navigate>
      )}
      <Card>
        <div className={classes["item-box"]}>
          {isAdmin && (
            <div
              className={classes["icon-box"]}
              onClick={deleteRestaranthandle}
            >
              <i className="fas fa-times"></i>
            </div>
          )}
          <h3>{props.name}</h3>
          <div className={classes.image}>
            <img
              crossOrigin="anonymous"
              src={`http://localhost:8080/${props.imageUrl}`}
              alt="image"
            />
          </div>
          <div className={isAdmin ? classes["button-box"] : ""}>
            <Button onClick={showDetaiHandler}>Detail</Button>
            {isAdmin && <Button onClick={onEditHandlerClick}>Edit</Button>}
          </div>
        </div>
      </Card>
      {isShowDetail && (
        <Modal onClose={onClose}>
          <RestaurantItemDetail
            onClose={onClose}
            name={props.name}
            address={props.address}
            introduction={props.introduction}
            imageUrl={props.imageUrl}
          />
        </Modal>
      )}
    </div>
  );
};

export default RestaurantItem;
