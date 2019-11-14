const data = {
    data() {
        return {
            timeout: null,
        };
    },
    methods: {
        debounce(cb, time = 500) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(cb, time);
        },
    },
};

export default data;
