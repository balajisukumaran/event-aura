import axios from "axios";

const getAllEvents = async(organizerId) => {
  let res = await axios.get(`https://event-aura-yt4akn7xpq-uc.a.run.app/api/events/user`, {
    params: {
      userId: organizerId
    }
  });
  console.log(res);
};

export {
  getAllEvents,
};
