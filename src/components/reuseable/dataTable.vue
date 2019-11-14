<template>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="tableProperties.limit"
        :server-items-length="tableProperties.totalItems"
        class="elevation-1"
        loading-text="Silahkan Menunggu Beberapa Saat"
        :loading="loading"
        v-on="listeners"
    >
        <template v-if="isBodySlotSet" #body="{items}">
            <slot name="body" :items="items"></slot>
        </template>
    </v-data-table>
</template>
<script>
export default {
    name: 'dataTables',
    props: {
        headers: {
            type: Array,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        tableProperties: {
            type: Object,
            default: () => ({
                limit: 5,
                offset: 0,
                totalItems: 0,
            }),
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        listeners() {
            return { ...this.$listeners };
        },
        isBodySlotSet() {
            return !!this.$scopedSlots.body;
        },
    },
};
</script>
