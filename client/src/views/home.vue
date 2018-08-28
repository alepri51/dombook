<template>
    <widget v-if="auth.signed !== 0" name="home">
        <v-container fluid grid-list-lg fill-height>
            <v-layout row wrap>
                <v-flex v-for="item in 200" :key="item" >
                    <v-card color="blue-grey darken-2" class="white--text" :width="350">
                        <v-card-title primary-title >
                            <div class="headline">Unlimited music now</div>
                            <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat dark>Listen now</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </widget>
    <div v-else>
        ДОСТУП ЗАКРЫТ
    </div>
</template>

<script>
    import Layout from '../components/class_layout';

    export default {
        extends: Layout
    }
</script>

<style scoped>
    .container {
        position: relative;
        overflow: auto;
    }

    .layout {
        position: absolute;
    }

    .v-card {
        margin: auto;
    }
</style>
