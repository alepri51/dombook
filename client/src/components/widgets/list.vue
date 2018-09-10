<template>
    <widget name="" wrap class="elevation-0 pa-2" align-center>
        <div slot="header">
            <h3>КОРПУСА {{ filter.length }}</h3>
        </div>

        <v-divider class="ma-1" slot="divider"/>

        <v-flex d-flex v-for="(item, inx) in filter" :key="inx" justify-center>
            
                <sui-card style="min-width: 250px; max-width: 350px;">
                    <!-- <sui-embed
                        icon="fas fa-film embed-icon"
                        id="90Omh7_I8vI"
                        :placeholder="`https://placeimg.com/300/${200 + item.id}/nature`"
                        source="youtube"
                        :iframe="{allowFullScreen: true }"
                    /> -->
                    <sui-image :src="`https://placeimg.com/300/${150 + item.id}/arch`" style="max-height: 150px;" />
                    
                    <a v-if="item.id % 5 === 0" class="ui red darken-2 ribbon label mb-2" style="position: absolute; left: -14px; top: 8px;">Горячее предложение</a>
                    <div v-if="item.name" class="ui secondary white--text mb-2" style="padding: 4px; position: absolute; width: 100%; left: 0px; top: 79px;">{{ item.name }}</div>

                    <sui-card-content style="overflow: hidden">

                        <sui-card-header>{{ `${item.id} ${item.project_name}` }}</sui-card-header>
                        <sui-card-meta>{{ `${item.developer.name === item.builder.name ? item.developer.name : `${item.developer.name} ${item.builder.name ? '(' + item.builder.name +')' : ''}`}` }}</sui-card-meta>
                        <sui-card-description style="overflow: auto; font-size: smaller" class="pr-1">
                            <div  v-for="(stat, key, inx) in item.statistics" :key="inx">
                                <span>{{ key }}</span>
                                <table class="ui definition table mt-0">
                                    <tbody>
                                        <tr v-for="(row, key, inx) in stat" :key="inx">
                                            <td class="pa-1">{{ key }}</td>
                                            <td class="pa-1">{{ row.square && `${row.square && row.square.min} - ${ row.square && row.square.max} m2` }}</td>
                                            <td class="pa-1">{{ row.price && `${row.price && (row.price.min / 1000000).toFixed(2)} - ${ row.price && (row.price.max / 1000000).toFixed(2)} млн` }}</td>
                                            <td class="pa-1" style="text-align: right">{{ `${row.count} шт` }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                            
                                <!-- <span>Апартаменты</span>
                                <table class="ui definition table mt-0">
                                    <tbody>
                                        <tr>
                                            <td class="pa-1">1-комн</td>
                                            <td class="pa-1">45 - 46м2</td>
                                            <td class="pa-1">10 - 11 млн</td>
                                            <td class="pa-1">12</td>
                                        </tr>
                                        <tr>
                                            <td class="pa-1">2-комн</td>
                                            <td class="pa-1">45 - 46м2</td>
                                            <td class="pa-1">10 - 11 млн</td>
                                            <td class="pa-1">12</td>
                                        </tr>
                                    </tbody>
                                </table> -->
                            </div>
                        </sui-card-description>
                    </sui-card-content>
                    <sui-card-content extra>
                        <sui-icon name="user" /> {{ item.statistics.count }} в продаже
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
