<template>
    <v-content style="height : 100%;">
        <v-container style="height : 100%;" fluid>
            <v-card v-if="$route.name != 'welcomePage'">
                <v-row class="row-content">
                    <v-col>
                        <h1>{{$route.meta.title}}</h1>
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
                <slot></slot>
            </v-card>
            <slot v-else></slot>
        </v-container>
    </v-content>
</template>
<style>
    .v-content__wrap {
        background: #d1e4e6;
    }
    .v-content__wrap .row-content{
        margin-right: unset;
        margin-left: unset;
    }
</style>
