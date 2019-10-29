<template>
    <v-row class="home-row">
        <v-col>
            <div class="welcome-page">
                <span class="display-3 font-weight-light">{{title}}</span>
                <span class="display-4">{{titleSecond}}</span>
                <h2>{{titleThrid}}</h2>
            </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data: () => ({
        title: 'Welcome To',
        titleSecond: 'Admin Template Panel',
        titleThrid: 'How was your day?',
    }),
};
</script>
<style>
    .home-row{
        height: 100%;
        background: url('../../../assets/background/undraw_product_tour_foyt.svg');
        background-size: 45%;
        background-repeat: no-repeat;
        background-position: right bottom;
    }
    .welcome-page{
        padding:50px;
        display: flex;
        flex-direction: column;
    }
</style>
