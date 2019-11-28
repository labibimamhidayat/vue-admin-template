<template>
    <v-menu
        v-bind="attrs"
    >
        <template v-if="isActivatorSlotSet" v-slot:activator="{ on }">
            <slot name="activator" :on="on"></slot>
        </template>
        <template>
            <slot></slot>
        </template>
    </v-menu>
</template>
<script>
export default {
    name: 'dropdownMenu',
    computed: {
        attrs() {
            return { ...this.$attrs };
        },
        isActivatorSlotSet() {
            return !!this.$scopedSlots.activator;
        },
    },
};
</script>
