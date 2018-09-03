<template>
    <widget name="" class="elevation-0 pa-2">
        <div slot="header">
            <h3>ПАРАМЕТРЫ ПОИСКА</h3>
        </div>

        <div style="flex:1; position: absolute">
            <dropdown-filter class="pa-1" label="Бюджет" header="Бюджет покупки" filter-icon="fas fa-funnel-dollar" :items="languages" multi :display-count="2"/>
            <dropdown-filter class="pa-1" label="Комнатность" stepper :items="rooms">
                
            </dropdown-filter>
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
                    { text: 'СП+' },
                ],
            };
        },
    }
</script>


<style scoped>
</style>
