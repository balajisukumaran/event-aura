import LandingPage from '../pages/LandingPage/LandingPage';
import ContactUs from '../pages/ContactUs/ContactUs';
import FAQ from '../pages/FAQ/FAQ';
import Login from "../components/Authentication/Login";
import Signup from '../components/Authentication/Signup';
import ResetPassword from '../components/Authentication/ResetPassword';

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
    id: 'resetPassword',
    route: '/resetPassword',
    component: <ResetPassword />,
  },
];

export default routes;
