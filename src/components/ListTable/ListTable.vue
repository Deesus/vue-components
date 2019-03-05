<template>
        <table class="list-table">

            <thead>
                <tr class="list-table__header-row">
                    <list-table-header-cell v-for="(header, index) in headers"
                                            :key="index"
                                            :align="header.align"
                                            :width="header.width"
                                            :header-text="header.headerText"
                                            :is-sortable="header.isSortable"
                                            :last-column-sorted-name="lastColumnSortedName"
                                            :sort-direction="sortDirection"
                                            @eventTableHeaderClick="handleSortByColumnClick"
                    />
                </tr>
            </thead>

            <tbody>
                <!--<template v-if="tableLoading">-->
                    <!--<list-table-row-no-data :headers="headers" />-->
                <!--</template>-->

                <template>
                    <tr v-for="(item, rowIndex) in sortedTableList" :key="`tr-${rowIndex}`">
                        <list-table-cell v-for="(header, headerIndex) in headers"
                                         :key="`td-${headerIndex}`"
                                         :content="item[header.fieldName]"
                        />
                    </tr>
                </template>
            </tbody>


            <list-table-footer />

        </table>
</template>


<script>
    import * as CONST from '../../app.constants';
    import { EvaIcon } from 'vue-eva-icons';
    import ListTableRowNoData from './ListTableRowNoData.vue'
    import ListTableHeaderCell from './ListTableHeaderCell.vue';
    import ListTableCell from './ListTableCell.vue';
    import ListTableFooter from './ListTableFooter.vue';



    export default {
        name: 'ListTable',


        props: {
            headers: {
                type: Array,
                required: true,
                validator: (arr) => {
                    return arr.length > 0;
                }
            },

            items: {
                required: true
            }
        },


        components: {
            ListTableHeaderCell,
            ListTableCell,
            ListTableFooter,
            ListTableRowNoData,
            [EvaIcon.name]: EvaIcon
        },


        data() {
            return {
                lastColumnSortedName: '',
                sortDirection: CONST.DATA_TABLE.SORT_NONE,
                sortByColumn: '',
                DATA_TABLE_COLUMNS: CONST.DATA_TABLE.COLUMNS,
            };
        },


        methods: {
            handleSortByColumnClick(columnName) {
                // if clicked column is same as previously clicked column, then toggle sort direction:
                if (this.lastColumnSortedName === columnName) {
                    this.sortDirection = this.toggleSortArrowDirection();
                }
                // if the clicked column is different than previous one, always ensure it is initially sorted ascending:
                else {
                    this.sortDirection = CONST.DATA_TABLE.SORT_ASCENDING;
                }

                // after asc/desc sort direction is determined, set the 'sort the column':
                // if the sort direction is 'NONE', then don't set the `sortByColumn` either, otherwise sort by the column name:
                if (this.sortDirection === CONST.DATA_TABLE.SORT_NONE) {
                    this.sortByColumn = '';
                }
                else {
                    this.sortByColumn = columnName;
                }

                // the sorted column now becomes the 'last sorted column':
                this.lastColumnSortedName = columnName;
            },

            toggleSortArrowDirection() {
                let newArrowDirection;

                switch (this.sortDirection) {
                    case CONST.DATA_TABLE.SORT_NONE:
                        newArrowDirection = CONST.DATA_TABLE.SORT_ASCENDING;
                        break;

                    case CONST.DATA_TABLE.SORT_ASCENDING:
                        newArrowDirection = CONST.DATA_TABLE.SORT_DESCENDING;
                        break;

                    case CONST.DATA_TABLE.SORT_DESCENDING:
                        newArrowDirection = CONST.DATA_TABLE.SORT_NONE;
                        break;

                    default:
                        newArrowDirection = CONST.DATA_TABLE.SORT_ASCENDING;
                        break;
                }

                return newArrowDirection;
            }
        },


        computed: {
            sortedTableList() {
                let tableList = [...this.items];

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
                        tableList = this.items;
                        break;
                }

                // ----- reverse the list if sorting in 'descending' direction: -----
                if (this.sortDirection === CONST.DATA_TABLE.SORT_DESCENDING) {
                    tableList = tableList.reverse();
                }

                return tableList;
            }
        }
    }
</script>


<style scoped lang="scss">
    @import "../../styles/base/constants";


    .list-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border: 0;
        margin-left: auto;
        margin-right: auto;

        // TODO: possibly need a separate component for 'header-row' and 'table-body-row'?
        &__header-row {
            background-color: $table-header-bg-color;
        }
    }
</style>
