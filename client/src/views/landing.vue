<template>
    <widget row justify-center>
        <div slot="header" style="text-align: center">
                <h3 class="display-1 product-title mt-1"><span class="primary--text">ДОМ</span><span class="secondary--text">book</span> новостройки московского региона</h3>
                <p class="mt-3">Самая полная и актуальная информационная платформа.</p> 
        </div>

        <v-divider slot="divider"/>
        
        <v-flex xs2>
            <!-- <v-card dark color="primary">
                <v-card-text>one</v-card-text>
            </v-card> -->
        </v-flex>
        <v-flex>
            <greeting />
            <scroll/>
            <scroll/>
        </v-flex>
        <v-flex xs2>
            <!-- <v-card dark color="accent">
                <v-card-text>three</v-card-text>
            </v-card> -->
        </v-flex>

    </widget>
</template>

<script>
    import Layout from '../components/class_layout';

    export default {
        extends: Layout,
        components: {
            navigation: () => import('../components/navigation.vue'),
            greeting: () => import('../components/greeting'),
            scroll: () => import('../components/widgets/scroll'),
        }
    }
</script>

<style scoped>

</style>
