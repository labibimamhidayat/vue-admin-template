const mixins = {
    data: () => ({
        tableProperties: {
            limit: 5,
            offset: 0,
            totalItems: 0,
        },
        loadingTable: false,
        checkFirstInit: true,
    }),

    methods: {
        setTableProperties(properties) {
            this.tableProperties = { ...properties };
        },
        changePagination(page) {
            if (this.checkFirstInit) {
                this.checkFirstInit = false;
                return;
            }
            this.tableProperties = { ...this.tableProperties, ...this.changeProperties(page) };
            this.getDataByPagination();
        },
        changeProperties(page) {
            return {
                limit: page.itemsPerPage,
                offset: (page.page * page.itemsPerPage) - page.itemsPerPage,
            };
        },
    },
};

export default mixins;
