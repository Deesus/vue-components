<template>
    <div id="app">

        <section>
            <h1>Data Table</h1>

            <data-table :headers="tableHeaders" />
        </section>


    </div>
</template>


<script>
    import DataTable from './components/DataTable/DataTable.vue';
    import * as CONST from './app.constants';


    export default {
        name: 'App',


        components: {
            DataTable
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
                        align:      'left',
                        isSortable: false,
                    },
                    {
                        name:       CONST.DATA_TABLE.COLUMNS.AMOUNT,
                        align:      'left',
                        isSortable: true,
                    },
                    {
                        name:       CONST.DATA_TABLE.COLUMNS.DATE,
                        align:      'left',
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
