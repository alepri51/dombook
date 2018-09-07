<template>
    <widget name="" class="elevation-0 pa-2">
        <div slot="header">
            <h3>ПАРАМЕТРЫ ПОИСКА</h3>
                    <vue-slider ref="slider" v-model="value" :min="0" :max="100" process-dragable :fixed="fixed"></vue-slider>
        </div>

        <div style="flex:1; position: absolute">
            <dropdown-filter class="pa-1" label="Бюджет" header="Бюджет покупки" filter-icon="fas fa-funnel-dollar" :items="languages" multi :display-count="2">
                <vue-slider slot="content" ref="slider" v-model="value" :min="0" :max="100" process-dragable :width="300" fixed></vue-slider>
            </dropdown-filter>

            <dropdown-filter class="pa-1" label="Комнатность" header="Количество комнат" stepper :items="rooms"/>
            <dropdown-filter class="pa-1" label="Тип лота" header="Что ищем ?" multi :items="lotTypes" :display-count="2"/>
            <dropdown-filter class="pa-1" label="Тип лота" header="Что ищем ?" :items="lotTypes" :display-count="2"/>

            <!-- <br> -->
            <div class="mt-2">
                <dropdown-filter class="secondary--text pa-1" multi inline label="Сортировка" header="параметры сортировки" filter-icon="fas fa-sort" :items="sort" :display-count="2"/>
                <dropdown-filter class="secondary--text pa-1" inline :selected-index="0" label="Сортировка" header="параметры сортировки" filter-icon="fas fa-sort" :items="sort"/>
            </div>
        </div>
    </widget>
</template>

<script>
    import Widget from './class_widget';
    import dropdownFilter from '../elements/filter';
    import vueSlider from 'vue-slider-component';
    
    export default {
        extends: Widget,
        components: {
            dropdownFilter,
            vueSlider
        },
        watch: {
            'value': function(val, old) {
                let n_min = val[0];
                let n_max = val[1];

                let o_min = old[0];
                let o_max = old[1];

                if(n_min === o_min && n_max === o_max) {
                    //this.fixed = n_max - n_min > 5
                }
                else {
                    let min = n_min - o_min;
                    let max = o_max - n_max;

                    this.fixed = (n_max + max) - (n_min - min) > 5;
                    //(min > 0 || max > 0) && (this.fixed = false);
                    //(min < 0 || max < 0) && (this.fixed = (n_max - max) - (n_min + min) > 5);
                    //let restrict = (max_changed - min_changed > 5); 
                    //this.fixed = restrict;
                }

                //debugger
                /* if(min_changed || max_changed) {
                    let restrict = (max - min > 5); 

                    this.fixed = restrict;
                } */
                //else this.fixed = false;
            }
        },
        data() {
            return {
                fixed: false,
                value: [
                    15,
                    20
                ],
                show: {
                    '1': false,
                    '2': false
                },
                current: null,
                languages: [
                    { key: 'Arabic', text: 'Arabic', value: 'Arabic' },
                    { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
                    { key: 'Danish', text: 'Danish', value: 'Danish' },
                    { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
                    { key: 'English', text: 'English', value: 'English' },
                    { key: 'French', text: 'French', value: 'French' },
                    { key: 'German', text: 'German', value: 'German' },
                    { key: 'Greek', text: 'Greek', value: 'Greek' },
                    { key: 'Hungarian', text: 'Hungarian', value: 'Hungarian' },
                    { key: 'Italian', text: 'Italian', value: 'Italian' },
                    { key: 'Japanese', text: 'Japanese', value: 'Japanese' },
                    { key: 'Korean', text: 'Korean', value: 'Korean' },
                    { key: 'Lithuanian', text: 'Lithuanian', value: 'Lithuanian' },
                    { key: 'Persian', text: 'Persian', value: 'Persian' },
                    { key: 'Polish', text: 'Polish', value: 'Polish' },
                    { key: 'Portuguese', text: 'Portuguese', value: 'Portuguese' },
                    { key: 'Russian', text: 'Russian', value: 'Russian' },
                    { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
                    { key: 'Swedish', text: 'Swedish', value: 'Swedish' },
                    { key: 'Turkish', text: 'Turkish', value: 'Turkish' },
                    { key: 'Vietnamese', text: 'Vietnamese', value: 'Vietnamese' },
                ],
                rooms: [
                    { text: 'Студия+' },
                    { text: '1+' },
                    { text: '2+' },
                    { text: '3+' },
                    { text: '4+' },
                    { text: 'СП+' },
                ],
                lotTypes: [
                    { text: 'Квартира' },
                    { text: 'Апартаменты' },
                    { text: 'Машиноместо' },
                    { text: 'Кладовая' }
                ],
                sort: [
                    { text: 'по дате' },
                    { text: 'по стоимости' },
                    { text: 'по площади' },
                    { text: 'по плюшкам' }
                ],

            };
        },
    }
</script>


<style scoped>
</style>
