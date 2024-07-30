import LandingPage from '../pages/LandingPage/LandingPage';
import ContactUs from '../pages/ContactUs/ContactUs';
import FAQ from '../pages/FAQ/FAQ';
<<<<<<< HEAD
import Login from "../components/Authentication/Login";
import Signup from '../components/Authentication/Signup';
import ResetPassword from '../components/Authentication/ResetPassword';
=======
import Login from '../pages/Login/Login';
import {CreateEventPage} from "../pages/CreateEvent/CreateEventPage";
import { EditEvent } from '../pages/EditEvent/EditEvent';
>>>>>>> develop
import EventDetails from '../pages/EventDetails/EventDetails';
import BookingSuccess from '../pages/BookingSuccess/BookingSuccess';
import BookingFailure from "../pages/BookingFailure/BookingFailure";
import ViewEventDetails from '../pages/ViewEventDetails/ViewEventDetails';
import ProfilePage from '../pages/MyProfile/ProfilePage';

const routes = [
  {
    id: 'landing-page',
    route: '/',
    component: <LandingPage />,
  },
  {
    id: 'contact',
    route: '/contact',
    component: <ContactUs />,
  },
  {
    id: 'faq',
    route: '/faq',
    component: <FAQ />,
  },
  {
    id: 'login',
    route: '/login',
    component: <Login />,
  },
  {
    id: 'signup',
    route: '/signup',
    component: <Signup />,
  },
  {
    id: 'signup',
    route: '/signup/admin',
    component: <Signup role={"ADMIN"} />,
  },
  {
    id: 'resetPassword',
    route: '/resetPassword',
    component: <ResetPassword />,
  },
  {
    id: 'createEvent',
    route: '/create-event',
    component: <CreateEventPage />,
  },
  {
    id: 'editEvent',
    route: '/edit-event/:id',
    component: <EditEvent />
  },
  {
    id: 'event-detail-page',
    route: '/events/:id',
    component: <EventDetails />,
  },
  {
    id: 'payment-success-page',
    route: '/payment/success/:id',
    component: <BookingSuccess />,
  },
  {
    id: 'payment-failure-page',
    route: '/payment/failure/:id',
    component: <BookingFailure />,
  },
  {
    id: 'organizer-event-details',
    route: '/view-event/:id',
    component: <ViewEventDetails />,
  },{
    id: 'profile',
    route: '/profile',
    component: <ProfilePage />,
  },
];

export default routes;
