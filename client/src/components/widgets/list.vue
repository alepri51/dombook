<template>
    <widget name="" row wrap class="elevation-0">
        <div slot="header">
            КОРТПУСА
        </div>

        <v-flex v-for="n in 40" :key="n" style="max-width: 250px">
            <v-card color="blue-grey darken-2" class="white--text" :width="200" hover>
                <sui-card>
                    <sui-embed
                        icon="fas fa-film embed-icon"
                        id="90Omh7_I8vI"
                        :placeholder="`https://placeimg.com/300/${200 + n}/nature`"
                        source="youtube"
                        :iframe="{allowFullScreen: true }"
                    />
                    <!-- <sui-image src="static/images/avatar/large/matthew.png" /> -->
                    <sui-card-content>
                    <sui-card-header>Matt Giampietro</sui-card-header>
                    <sui-card-meta>Friends</sui-card-meta>
                    <sui-card-description>
                        Matthew is an interior designer living in New York.
                    </sui-card-description>
                    </sui-card-content>
                    <sui-card-content extra>
                    <sui-icon name="user" /> 75 Friends
                    <span slot="right">Joined in 2013</span>
                    </sui-card-content>
                </sui-card>
            </v-card>
        </v-flex>
    </widget>
</template>

<script>
    import Widget from './class_widget';
    
    export default {
        extends: Widget
        
    }
</script>


<style scoped>
    
</style>
