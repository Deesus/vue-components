<template>
    <div id="app">


        <section>
            <h1>Data Table</h1>
            <data-table :headers="tableHeaders" />
        </section>


        <section>
            <h1>Button</h1>
            <app-button color="blue">Click Me</app-button>
        </section>


    </div>
</template>


<script>
    import DataTable from './components/DataTable/DataTable.vue';
    import AppButton from './components/AppButton.vue';
    import * as CONST from './app.constants';


    export default {
        name: 'App',


        components: {
            DataTable,
            AppButton
        },


        data() {
            return {
                tableHeaders: [
                    {
                        name:       CONST.DATA_TABLE.COLUMNS.NAME,
                        align:      'left',
                        isSortable: true,
                    },
                    {
                        name:       CONST.DATA_TABLE.COLUMNS.DESCRIPTION,
                        isSortable: false,
                    },
                    {
                        name:       CONST.DATA_TABLE.COLUMNS.AMOUNT,
                        align:      'left',
                        width:      200,
                        isSortable: true,
                    },
                    {
                        name:       CONST.DATA_TABLE.COLUMNS.DATE,
                        align:      'right',
                        isSortable: true,
                    }
                ]
            }
        }
    }
</script>


<style scoped>
    #app {
        margin: 30px auto;
        max-width: 1400px;
    }
</style>
