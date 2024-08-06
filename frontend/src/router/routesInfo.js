/**
 * Author : Kabilesh Ravi Chandran
 */

import LandingPage from "../pages/LandingPage/LandingPage";
import ContactUs from "../pages/ContactUs/ContactUs";
import FAQ from "../pages/FAQ/FAQ";
import EventHistory from "../pages/EventHistory";
import Approvals from "../pages/Approvals";
import Support from "../pages/Support/Support";
import { CreateEventPage } from "../pages/CreateEvent/CreateEventPage";
import { EditEvent } from "../pages/EditEvent/EditEvent";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import ResetPassword from "../components/Authentication/ResetPassword";
import EventDetails from "../pages/EventDetails/EventDetails";
import BookingSuccess from "../pages/BookingSuccess/BookingSuccess";
import BookingFailure from "../pages/BookingFailure/BookingFailure";
import ViewEventDetails from "../pages/ViewEventDetails/ViewEventDetails";
import ProfilePage from "../pages/MyProfile/ProfilePage";
import Organizer from "../pages/Organizer/Organizer";
import ChatModal from "../pages/EventHistory/components/ChatModal/ChatModal";
import NewMessages from "../pages/NewMessages";

const routes = [
  {
    id: "landing-page",
    route: "/",
    component: <LandingPage />,
    roles: ["admin, user"]
  },
  {
    id: "contact",
    route: "/contact",
    component: <ContactUs />,
  },
  {
    id: "faq",
    route: "/faq",
    component: <FAQ />,
  },
  {
    id: "login",
    route: "/login",
    component: <Login />,
  },
  {
    id: "event-history",
    route: "/event-history",
    component: <EventHistory />,
  },
  {
    id: "signup",
    route: "/signup",
    component: <Signup />,
  },
  {
    id: "signup-admin",
    route: "/signup/admin",
    component: <Signup role={"ADMIN"} />,
  },
  {
    id: "resetPassword",
    route: "/resetPassword",
    component: <ResetPassword />,
  },
  {
    id: "createEvent",
    route: "/create-event",
    component: <CreateEventPage />,
  },
  { id: "approvals", route: "/approvals", component: <Approvals /> },
  { id: "support", route: "/support", component: <Support /> },
  {
    id: "editEvent",
    route: "/edit-event/:id",
    component: <EditEvent />,
  },
  {
    id: "event-detail-page",
    route: "/events/:id",
    component: <EventDetails />,
  },
  {
    id: "payment-success-page",
    route: "/payment/success/:id",
    component: <BookingSuccess />,
  },
  {
    id: "payment-failure-page",
    route: "/payment/failure/:id",
    component: <BookingFailure />,
  },
  {
    id: "organizer-event-details",
    route: "/view-event/:id",
    component: <ViewEventDetails />,
  },
  {
    id: "profile",
    route: "/profile",
    component: <ProfilePage />,
  },
  {
    id: "organizer",
    route: "/organizer/:id",
    component: <Organizer />,
  },
  {
    id: 'chat',
    route: "/chat/:id",
    component: <ChatModal />
  },
  {
    id: 'new-messages',
    route: '/new-messages',
    component: <NewMessages />
  }
];

export default routes;
