import LandingPage from '../pages/LandingPage/LandingPage';
import ContactUs from '../pages/ContactUs/ContactUs';
import FAQ from '../pages/FAQ/FAQ';
import Login from '../pages/Login/Login';
import {CreateEventPage} from "../pages/CreateEvent/CreateEventPage";
import { EditEvent } from '../pages/EditEvent/EditEvent';

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
    route: '.login',
    component: <Login />,
  },
  {
    id: 'createEvent',
    route: '/create-event',
    component: <CreateEventPage />,
  },
  {
    id: 'editEvent',
    route: '/edit-event',
    component: <EditEvent />,
  },
];

export default routes;
