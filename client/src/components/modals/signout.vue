<template>
    <v-dialog v-model="visible" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <v-icon class="mr-1 primary--text shadow">fas fa-user-circle</v-icon>
                <span class="headline primary--text">Выход</span>
            </v-card-title>
            <v-card-text>
                <v-card-text>
                    Вы покидаете личный кабинет. Пожалуйста подтвердите Ваше решение
                </v-card-text>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="unimportant" flat @click.native="commit('HIDE_MODAL', { signout: void 0 })">Не выходить</v-btn>
                <v-btn dark color="secondary" @click.native="submit">Выйти</v-btn>
            </v-card-actions>

        </v-card>

    </v-dialog>
</template>

<script>
    import Modal from './class_modal';
    
    export default {
        extends: Modal,
        data: () => {
            return {
                //entity: 'signout'
            }
        },
        methods: {
            submit() {
                this.execute({ 
                    method: 'post', 
                    endpoint: 'signout.submit',
                    callback: () => {
                        
                        this.commit('HIDE_MODAL', { [this.entity]: void 0 });
                        
                        //this.$router.replace('landing');
                    }    
                });
            }
        }
    }    
</script>