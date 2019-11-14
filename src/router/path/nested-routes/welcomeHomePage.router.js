const welcome = () => import(/* webpackChunkName: "welcome-chunks" */'@/components/views/welcome/welcome');

const path = {
    path: '/',
    name: 'welcomePage',
    component: welcome,
};

export default path;
