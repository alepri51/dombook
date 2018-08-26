<template>
    <div>
        <greeting/>
        <painpoint/>
    </div>
</template>

<script>
    export default {
        components: {
            greeting: () => import('../components/greeting'),
            painpoint: () => import('../components/painpoint'),
        }
    }
</script>

<style scoped>

</style>
