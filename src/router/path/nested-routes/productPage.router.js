const children = () => import('@/components/views/core/childpage');
const viewProducts = () => import('@/components/views/products/viewProducts');

const path = {
    path: 'products',
    component: children,
    redirect: '/products/',
    children: [
        {
            path: '/',
            name: 'viewProducts',
            component: viewProducts,
            meta: {
                title: 'List Of Products',
            },
        },
    ],
};

export default path;
