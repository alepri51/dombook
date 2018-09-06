<template>
    <widget name="" wrap class="elevation-0 pa-2" align-center>
        <div slot="header">
            <h3>КОРПУСА</h3>
        </div>

        <v-divider class="ma-1" slot="divider"/>

        <v-flex d-flex v-for="n in 40" :key="n" justify-center>
            
                <sui-card style="max-width: 200px">
                    <sui-embed
                        icon="fas fa-film embed-icon"
                        id="90Omh7_I8vI"
                        :placeholder="`https://placeimg.com/300/${200 + n}/nature`"
                        source="youtube"
                        :iframe="{allowFullScreen: true }"
                    />
                    <!-- <sui-image src="static/images/avatar/large/matthew.png" /> -->
                    <sui-card-content>
                        <a v-if="n % 5 === 0" class="ui red ribbon label mb-2">Горячее предложение</a>

                        <sui-card-header>Корпус восточный {{n}}</sui-card-header>
                        <sui-card-meta>ЖК "Домашний"</sui-card-meta>
                        <sui-card-description>
                            Matthew is an interior designer living in New York.
                            Экпозиция
                        </sui-card-description>
                    </sui-card-content>
                    <sui-card-content extra>
                        <sui-icon name="user" /> 75 в продеже
                        <span slot="right">сдача Q1 2019</span>
                    </sui-card-content>
                </sui-card>
            
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
