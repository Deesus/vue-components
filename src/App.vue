<template>
    <div id="app">
        <data-table></data-table>
    </div>
</template>



<script>
    import DataTable from './components/DataTable';
    import * as CONST from './app.constants';


    export default {
        name: 'App',


        components: {
            DataTable
        },


        data() {
            return {
                headers: [
                    {
                        name:       CONST.DATA_TABLE.COLUMNS.NAME,
                        align:      'left',
                        isSortable: true,
                    },
                    {
                        name:       CONST.DATA_TABLE.COLUMNS.DESCRIPTION,
                        align:      'left',
                        isSortable: true,
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
    }
</style>
