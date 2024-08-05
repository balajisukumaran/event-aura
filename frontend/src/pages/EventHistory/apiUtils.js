/**
 * Authors : Kabilesh Ravi Chandran
 */

import axios from "axios";
const userId = localStorage.getItem("userId");

const getAllEvents = async () => {
  let res = await axios.get(
    `https://event-aura-yt4akn7xpq-uc.a.run.app/api/events/user`,
    {
      params: {
        userId,
      },
    }
  );
  return res.data;
};

const getAllOrders = async () => {
  let res = await axios.get(
    `https://event-aura-yt4akn7xpq-uc.a.run.app/api/order/user`,
    {
      params: {
        userId,
      },
    }
  );
  return res.data;
};

const cancelOrder = async (orderId) => {
  let res = await axios.put(
    `https://event-aura-yt4akn7xpq-uc.a.run.app/api/order/cancel/${orderId}`,
    {}
  );
  return res.data;
};

export { getAllEvents, getAllOrders, cancelOrder };
