<template>
    <v-app :style="cssProps">
        <div class="loader-overlay" v-if="$store.state.loading">
            <div style="" class="spinner spinner--circle-4"></div>
        </div>

        <!-- <navigation :menu="$store.state.menu"/> -->

        <v-content >
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <component :is="$store.state.view"></component>
                </keep-alive>
            </transition>
        </v-content>
        
        <!-- <signin/>
        <signup/>
        <signout/> -->

        <v-snackbar
            @input="$store.commit('HIDE_SNACKBAR')"
            :value="$store.state.snackbar.visible"
            :color="$store.state.snackbar.color"
            :timeout="$store.state.snackbar.timeout"
            :multi-line="false"
            :vertical="$store.state.snackbar.vertical"
            >
            {{ $store.state.snackbar.text }}
            <v-btn
                dark
                flat
                @click="$store.commit('HIDE_SNACKBAR')"
            >
                {{ $store.state.snackbar.caption }}
            </v-btn>
        </v-snackbar>

        <!-- <news/>
        <manual/> -->
    </v-app>
</template>

<script>
    export default {
        //extends: Base,
        name: 'App',
        components: {
            navigation: () => import('./components/navigation'),
            /* news: () => import('./components/modals/news'),
            manual: () => import('./components/modals/manual') */
        },
        computed: {
            cssProps() {
                //debugger
                return {
                    '--scroll-background': this.$colors.shades.transparent,
                    '--scroll-color': this.$vuetify.theme.scrollColor,
                    '--embed-icon-color': this.$colors.shades.white,
                    '--editor-button-color': this.$vuetify.theme.secondary,
                    '--primary-color': this.$vuetify.theme.primary,
                    '--secondary-color': this.$vuetify.theme.secondary,
                    '--accent-color': this.$vuetify.theme.accent
                }
            }
        },
    }
</script>

<style scoped>
    .v-content {
        height: 100vh; /* SET THIS FUCKING HEIGHT !!! */
    }

    .loader-overlay::before {
        background-color: #212121;
    }
    .loader-overlay {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 999;
    }

    .spinner {
        position: fixed;
        z-index: 999;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 60px;
        height: 60px;
        box-sizing: border-box;
        /*position: relative;*/
        border: 3px solid transparent;
        border-top-color: #f7484e;
        border-radius: 50%;
        animation: circle-4-spin 2s linear infinite;
    }
    .spinner:before, .spinner:after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        border: 3px solid transparent;
        border-radius: 50%;
    }

    .spinner:before {
        border-top-color: #f8b334;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        animation: circle-4-spin 3s linear infinite;
    }

    .spinner:after {
        border-top-color: #41b883;
        top: 6px;
        left: 6px;
        right: 6px;
        bottom: 6px;
        animation: spin 4s linear infinite;
    }

    @keyframes circle-4-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    /* body {
        font-family: 'Roboto Condensed'!important;
    }
    .application, .application .display-2 {
        font-family: 'Roboto Condensed'!important;
    } */
/*
    .brand-logo {
        font-family: 'Roboto Condensed', serif;
        font-size: 36px!important;
        font-weight: bold!important;
        color: #2c3e50;
    }
    .brand-spacer {
        margin-left: -10px!important;
    }
    .brand-icon {
        margin-top: -3px;
    }
    .accented-text {
        font-family: 'Roboto Condensed', sans-serif;
    }
    .product-title {
        font-family: 'Roboto Condensed', sans-serif;
        font-weight: bold!important;
        color: #2c3e50;
    }
    p {
        font-family: 'Roboto Condensed', sans-serif;
    }
    .hero-text-header {
        font-family: 'Roboto Condensed', serif;
    }
    .hero-text-sub {
        font-family: 'Roboto Condensed', sans-serif;
    }
    .brand-text {
        font-weight: bold;
    } */

</style>
