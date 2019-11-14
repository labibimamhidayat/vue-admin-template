const children = () => import('@/components/views/core/childpage');
const viewPartners = () => import('@/components/views/partners/viewPartners');

const path = {
    path: 'partners',
    component: children,
    redirect: '/partners/',
    children: [
        {
            path: '/',
            name: 'viewPartners',
            component: viewPartners,
            meta: {
                title: 'Daftar Partner',
            },
        },
    ],
};

export default path;
