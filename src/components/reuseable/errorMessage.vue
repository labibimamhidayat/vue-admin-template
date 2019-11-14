<template>
    <div class="v-text-field__details">
        <div class="v-messages theme--light error--text" role="alert">
            <div class="v-messages__wrapper">
                <v-slide-y-transition>
                    <div class="v-messages__message" v-if="messageError">{{messageError}}</div>
                </v-slide-y-transition>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        messageError: {
            type: String,
            default: undefined,
        },
    },
};
</script>
