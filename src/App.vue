<template>
    <div id="app">

        <section>
            <h1>Button</h1>
            <app-button color="blue">Click Me</app-button>
        </section>


        <section>
            <h1>List Table</h1>

            <list-table :headers="tableHeaders" :items="sortedTableData">
                <template scope="item">
                    <td>
                        {{ item.Name }}
                    </td>
                    <td>
                        {{ item.Description }}
                    </td>
                    <td>
                        {{ item.Amount }}
                    </td>
                    <td>
                        {{ item.Date }}
                    </td>
                </template>
            </list-table>
        </section>

    </div>
</template>


<script>
    import * as CONST from './app.constants';
    import DataTable from './components/DataTable/DataTable.vue';
    import AppButton from './components/AppButton.vue';
    import ListTable from './components/ListTable/ListTable.vue';
    import { mapState, mapGetters, mapActions } from 'vuex';


    export default {
        name: 'App',


        components: {
            AppButton,
            DataTable,
            ListTable
        },


        data() {
            return {
                tableHeaders: [
                    {
                        headerText: 'Name',
                        align:      'left',
                        isSortable: true,
                        fieldName:  CONST.DATA_TABLE.COLUMNS.NAME
                    },
                    {
                        headerText: 'Description',
                        isSortable: false,
                        fieldName:  CONST.DATA_TABLE.COLUMNS.DESCRIPTION
                    },
                    {
                        headerText: 'Amount ($)',
                        align:      'left',
                        width:      200,
                        isSortable: true,
                        fieldName:  CONST.DATA_TABLE.COLUMNS.AMOUNT
                    },
                    {
                        headerText: 'Date',
                        align:      'right',
                        isSortable: true,
                        fieldName:  CONST.DATA_TABLE.COLUMNS.DATE
                    }
                ]
            }
        },


        methods: {
            ...mapActions([
                'getInitialData',
                'instantiateFirebase'
            ]),
        },

        computed: {
            ...mapState([
                'tableLoading',
                'fbInstance',
                'data'
            ]),

            sortedTableData() {
                let tableList = [...this.data];

                // ----- sort the data by column name: -----
                switch (this.sortByColumn) {

                    case CONST.DATA_TABLE.COLUMNS.NAME:
                        tableList = tableList
                            .sort( (x, y) => {
                                const name1 = x[CONST.DATA_TABLE.COLUMNS.NAME].toUpperCase();
                                const name2 = y[CONST.DATA_TABLE.COLUMNS.NAME].toUpperCase();

                                if (name1 < name2) {
                                    return -1;
                                }
                                else {
                                    return 1;
                                }
                            });
                        break;

                    case CONST.DATA_TABLE.COLUMNS.AMOUNT:
                        tableList = tableList
                            .sort((x, y) => {
                                const amount1 = parseFloat(x[CONST.DATA_TABLE.COLUMNS.AMOUNT]);
                                const amount2 = parseFloat(y[CONST.DATA_TABLE.COLUMNS.AMOUNT]);

                                return amount1 - amount2;
                            });
                        break;

                    case CONST.DATA_TABLE.COLUMNS.DATE:
                        // because the date values are stored in ISO format, we can do a simple string sort:
                        tableList = tableList
                            .sort( (x, y) => {
                                const date1 = x[CONST.DATA_TABLE.COLUMNS.DATE].toUpperCase();
                                const date2 = y[CONST.DATA_TABLE.COLUMNS.DATE].toUpperCase();

                                if (date1 < date2) {
                                    return -1;
                                }
                                else {
                                    return 1;
                                }
                            });
                        break;

                    default:
                        tableList = this.data;
                        break;
                }

                // ----- reverse the list if sorting in 'descending' direction: -----
                if (this.sortDirection === CONST.DATA_TABLE.SORT_DESCENDING) {
                    tableList = tableList.reverse();
                }

                return tableList;
            }
        },


        created() {
            // ---------- get data: ----------
            // since Firebase connects to a websocket, and a user can only have 1 connection to FB,
            // we should only attempt connection if one hasn't already been established:
            if (this.fbInstance === null) {
                // establish Firebase connection then get initial data:
                this.instantiateFirebase()
                    .then(() => {
                        this.getInitialData();
                    });
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
