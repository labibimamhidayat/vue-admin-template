<template>
    <v-content style="height : 100%;">
        <v-container style="height : 100%;" fluid>
            <v-row v-if="$route.name != 'welcomePage'">
                <v-col>
                    <h1>{{$route.meta.title}}</h1>
                    <v-divider></v-divider>
                </v-col>
            </v-row>
           <slot></slot>
        </v-container>
    </v-content>
</template>
<style>
    .v-content__wrap {
        background: #d1e4e6;
    }
</style>
