import welcomeHomePage from '@/router/path/nested-routes/welcomeHomePage.router';
import productPage from '@/router/path/nested-routes/productPage.router';
import partnerPage from '@/router/path/nested-routes/partnerPage.router';
import clientPage from '@/router/path/nested-routes/clientPage.router';

const homeLayouts = () => import(/* webpackChunkName: "homeLayouts-chunks" */'@/components/layouts/home.vue');

const path = {
    path: '/',
    component: homeLayouts,
    meta: {
        needAuthentication: true,
    },
    children: [
        productPage,
        welcomeHomePage,
        partnerPage,
        clientPage,
    ],
};

export default path;
