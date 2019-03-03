<template>
        <table class="data-table">

            <thead>
                <tr class="data-table__header-row">
                    <!-- sort icon's column header should be empty: -->
                    <data-table-header-cell :is-sortable="false" />

                    <data-table-header-cell v-for="(header, index) in headers"
                                            :key="index"
                                            :column-name="header.name"
                                            :is-sortable="header.isSortable"
                                            :last-column-sorted="lastColumnSorted"
                                            @eventTableHeaderClick="handleSortByColumnClick"
                    />
                </tr>
            </thead>


            <tbody>
                <template v-if="tableLoading">
                    <data-table-row-no-data :headers="headers" />
                </template>

                <template v-else>
                    <data-table-row v-for="entry in sortedTableList(sortByColumn, sortDirection)" :key="entry.ID" :entry="entry" />
                </template>
            </tbody>


            <data-table-footer />

        </table>
</template>


<script>
    import * as CONST from '../../app.constants';
    import { EvaIcon } from 'vue-eva-icons';
    import DataTableRow from './DataTableRow.vue';
    import DataTableRowNoData from './DataTableRowNoData.vue'
    import DataTableHeaderCell from './DataTableHeaderCell.vue';
    import DataTableFooter from './DataTableFooter.vue';
    import { mapState, mapGetters, mapActions } from 'vuex';


    export default {
        name: 'DataTable',


        props: {
            headers: {
                type: Array,
                required: true,
                validator: (arr) => {
                    return arr.length > 0;
                }
            }
        },


        components: {
            DataTableRow,
            DataTableHeaderCell,
            DataTableFooter,
            DataTableRowNoData,
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
            ...mapActions([
                'getInitialData',
                'instantiateFirebase',
                'updateEntryByKey'
            ]),

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
                if (this.sortDirection === CONST.DATA_TABLE.SORT_NONE)
                {
                    this.sortByColumn = '';
                }
                else {
                    this.sortByColumn = columnName;
                }

                // the sorted column now becomes the 'last sorted column':
                this.lastColumnSortedName = columnName;
            },

            handleTableCellDescriptionUpdated(entry) {
                this.updateEntryByKey({ key: entry.id, entryObj: { Description: entry.content } });
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
            ...mapState([
                'tableLoading'
            ]),

            ...mapGetters({
                sortedTableList: 'getSortedTableList'
            }),

            lastColumnSorted() {
                return {
                    columnName: this.lastColumnSortedName,
                    direction:  this.sortDirection
                };
            }
        },


        created() {
            // ---------- get data: ----------
            // establish Firebase connection then get initial data:
            this.instantiateFirebase()
                .then(() => {
                    this.getInitialData();
                });
        }
    }
</script>


<style scoped lang="scss">
    @import "../../styles/base/constants";


    .data-table {
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

        thead {
            border-left: 1px solid crimson;
            border-right: 1px solid crimson;
        }
    }
</style>
