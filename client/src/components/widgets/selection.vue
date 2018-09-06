<template>
    <widget name="" class="elevation-0 pa-2">
        <div slot="header">
            <h3>ПАРАМЕТРЫ ПОИСКА</h3>
        </div>

        <div style="flex:1; position: absolute">
            <dropdown-filter class="pa-1" label="Бюджет" header="Бюджет покупки" filter-icon="fas fa-funnel-dollar" :items="languages" multi :display-count="2"/>
            <dropdown-filter class="pa-1" label="Комнатность" header="Количество комнат" stepper :items="rooms"/>
            <dropdown-filter class="pa-1" label="Тип лота" header="Что ищем ?" multi :items="lotTypes" :display-count="2"/>
            <dropdown-filter class="pa-1" label="Тип лота" header="Что ищем ?" :items="lotTypes" :display-count="2"/>

            <dropdown-filter class="pa-1" inline label="Сортировка" header="параметры сортировки" :items="lotTypes" :display-count="2"/>
            <!-- <dropdown-filter class="pa-1" label="Комнатность" header="Количество комнат" stepper :items="rooms"/>
            <dropdown-filter class="pa-1" label="Комнатность" header="Количество комнат" stepper :items="rooms"/>
            <dropdown-filter class="pa-1" label="Комнатность" header="Количество комнат" stepper :items="rooms"/> -->
        
        

            <!-- <div class="ui header">
                <i class="fas fa-user mr-2"></i>
            <div class="content">
                Сортировка
                <div class="ui inline dropdown">
                <div class="text">today</div>
                <i class="dropdown icon"></i>
                <div class="menu">
                    <div class="header">Adjust time span</div>
                    <div class="active item" data-text="today">Today</div>
                    <div class="item" data-text="this week">This Week</div>
                    <div class="item" data-text="this month">This Month</div>
                </div>
                </div>
            </div>
            </div> -->

            
        </div>

        

            <!-- <v-combobox
                v-model="current"
                :items="languages"
                label="Select a favorite activity or create a new one"
                multiple
            ></v-combobox>
        <div style="width:100%;">
            
            
            
             -->
   
    </widget>
</template>

<script>
    import Widget from './class_widget';
    import dropdownFilter from '../elements/filter'
    
    export default {
        extends: Widget,
        components: {
            dropdownFilter
        },
        data() {
            return {
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
