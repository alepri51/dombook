<template>
    <div>
        <greeting/>
        <painpoint/>
    </div>
</template>

<script>
    import Layout from '../components/class_layout';

    export default {
        extends: Layout,
        components: {
            greeting: () => import('../components/greeting'),
            painpoint: () => import('../components/painpoint'),
        }
    }
</script>

<style scoped>

</style>
