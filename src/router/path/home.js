import HomeLayout from '@/components/layouts/home.vue';

const path = {
    path: '/',
    name: 'HomeLayout',
    component: HomeLayout,
    meta: {
        needAuthentication: true,
    },
};

export default path;
