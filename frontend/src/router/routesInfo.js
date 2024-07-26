import LandingPage from '../pages/LandingPage/LandingPage';
import ContactUs from '../pages/ContactUs/ContactUs';
import FAQ from '../pages/FAQ/FAQ';
import Login from '../pages/Login/Login';
import EventHistory from '../pages/EventHistory';

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
    id: 'event-history',
    route: '/event-history',
    component: <EventHistory />,
  },
];

export default routes;
