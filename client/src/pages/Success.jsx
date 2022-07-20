import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currUser = user && JSON.parse(user).currentUser;
  const TOKEN = currUser?.accessToken;

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post("api/orders/", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        }, {
          headers: {
            token: `Bearer ${TOKEN}`
          }
        });
        console.log(res);
        setOrderId(res.data._id);
      } catch(err) {
        console.log(err);
       }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "teal",
        fontWeight: "bold",
        fontSize: "25px",
        backgroundColor: "grey",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 , }}>
        <Link to = "/" style={{textDecoration: 'none', color: 'teal', fontSize: '18px', fontWeight: 'bold'}}>
        CONTINUE SHOPPING (BUYNOW.)
        </Link>
        </button>
    </div>
  );
};

export default Success;