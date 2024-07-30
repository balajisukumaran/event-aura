import LandingPage from '../pages/LandingPage/LandingPage';
import ContactUs from '../pages/ContactUs/ContactUs';
import FAQ from '../pages/FAQ/FAQ';
import Login from "../components/Authentication/Login";
import Signup from '../components/Authentication/Signup';
import ResetPassword from '../components/Authentication/ResetPassword';
import EventDetails from '../pages/EventDetails/EventDetails';
import BookingSuccess from '../pages/BookingSuccess/BookingSuccess';
import BookingFailure from "../pages/BookingFailure/BookingFailure";

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
];

export default routes;
