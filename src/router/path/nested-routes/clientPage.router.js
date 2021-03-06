const children = () => import('@/components/views/core/childpage');
const viewClients = () => import('@/components/views/clients/viewClients');

const path = {
    path: 'clients',
    component: children,
    redirect: '/clients/',
    children: [
        {
            path: '/',
            name: 'viewClients',
            component: viewClients,
            meta: {
                title: 'List Of Clients',
            },
        },
    ],
};

export default path;
