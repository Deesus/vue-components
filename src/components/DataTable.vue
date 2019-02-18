<template>

    <div class="data-table">
        <table>
            <thead>
            <tr class="data-table__header-row">
                <data-table-header-cell :is-sortable="false" />

                <data-table-header-cell :column-name="DATA_TABLE_COLUMNS.NAME"
                                        :is-sortable="true"
                                        :last-column-sorted="lastColumnSorted"
                                        @eventTableHeaderClick="handleSortByColumnClick"
                />
                <data-table-header-cell :column-name="DATA_TABLE_COLUMNS.DESCRIPTION"
                                        :is-sortable="false"
                                        :last-column-sorted="lastColumnSorted"
                />
                <data-table-header-cell :column-name="DATA_TABLE_COLUMNS.AMOUNT"
                                        :is-sortable="true"
                                        :last-column-sorted="lastColumnSorted"
                                        @eventTableHeaderClick="handleSortByColumnClick"
                />
                <data-table-header-cell :column-name="DATA_TABLE_COLUMNS.DATE"
                                        :is-sortable="true"
                                        :last-column-sorted="lastColumnSorted"
                                        @eventTableHeaderClick="handleSortByColumnClick"
                />
            </tr>
            </thead>

            <tbody>
                <data-table-row v-for="entry in $store.state.data" :key="entry.ID" :entry="entry" />
            </tbody>
        </table>

        <div class="data-table__footer"></div>
    </div>

</template>


<script>
    import * as CONST from '../app.constants';
    import * as ACTION from '../store/types.actions';
    import { EvaIcon } from 'vue-eva-icons';
    import DataTableRow from './DataTableRow.vue';
    import DataTableHeaderCell from './DataTableHeaderCell.vue';


    export default {
        name: 'DataTable',

        components: {
            DataTableRow,
            DataTableHeaderCell,
            [EvaIcon.name]: EvaIcon
        },

        data() {
            return {
                errored: false,
                loading: true,
                lastColumnSortedName: '',
                lastColumnSortedDirection: CONST.FIREBASE.SORT_ASCENDING,
                DATA_TABLE_COLUMNS: CONST.DATA_TABLE_COLUMNS
            };
        },

        methods: {
            handleSortByColumnClick(columnName) {
                // if clicked column is same as previously clicked column, then toggle sort direction:
                if (this.lastColumnSortedName === columnName) {
                    this.lastColumnSortedDirection = this.lastColumnSortedDirection === CONST.FIREBASE.SORT_ASCENDING ?
                                                     CONST.FIREBASE.SORT_DESCENDING : CONST.FIREBASE.SORT_ASCENDING;
                }
                // if the clicked column is different than previous one, always ensure it is ascending:
                else {
                    this.lastColumnSortedDirection = CONST.FIREBASE.SORT_ASCENDING;
                }

                // after asc/desc sort direction is determined, sort the column:
                if (this.lastColumnSortedDirection === CONST.FIREBASE.SORT_DESCENDING) {
                    this.$store.dispatch(ACTION.SORT_BY_COLUMN, { columnName: columnName, direction: CONST.FIREBASE.SORT_DESCENDING });
                }
                else {
                    this.$store.dispatch(ACTION.SORT_BY_COLUMN, { columnName: columnName, direction: CONST.FIREBASE.SORT_ASCENDING });
                }


                // the sorted column now becomes the 'last sorted column':
                this.lastColumnSortedName = columnName;
            },

            handleTableCellDescriptionUpdated(entry) {
                this.$store.dispatch(ACTION.UPDATE_ENTRY_BY_KEY, { key: entry.id, entryObj: {Description: entry.content} });
            }
        },

        computed: {
            lastColumnSorted() {
                return {
                    columnName: this.lastColumnSortedName,
                    direction:  this.lastColumnSortedDirection
                };
            }
        },

        created() {
            // ---------- get data: ----------
            this.$store
                // establish Firebase connection:
                .dispatch(ACTION.INSTANTIATE_FIREBASE)

                // get initial data:
                .then( () => {
                    this.$store.dispatch(ACTION.GET_INITIAL_DATA);
                });
        }
    }
</script>


<style scoped lang="scss">
    @import "../styles/base/constants";


    .data-table {
        max-width: 1200px;
        width: 100%;

        table {
            border-collapse: collapse;
            border-spacing: 0;
            border: 0;
        }

        // TODO: possibly need a separate component for 'header-row' and 'table-body-row'?
        &__header-row {
            background-color: #f9f8fe;
        }

        &__data-row {
            &:hover td {
                border-top: $table-border-hover;
                border-bottom: $table-border-hover;
                background-color: #e7ecff;
            }
        }
    }
</style>
