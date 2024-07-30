import axios from "axios";
const userId = localStorage.getItem("userId");

const getAllEvents = async() => {
  let res = await axios.get(`http://localhost:8080/api/events/user`, {
    params: {
      userId
    }
  });
  return res.data;
};

const getAllOrders = async() => {
  let res = await axios.get(`http://localhost:8080/api/order/user`, {
    params: {
      userId
    }
  });
  return res.data;
};

const cancelOrder = async(orderId) => {
  let res = await axios.put(`http://localhost:8080/api/order/cancel/${orderId}`, {
  });
  return res.data;
}

export {
  getAllEvents,
  getAllOrders,
  cancelOrder,
};
