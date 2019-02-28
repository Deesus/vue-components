<template>
    <tr class="data-table-row">
        <data-table-cell>
            <eva-icon :class="cssClassesForExpandRowIcon" fill="#353535" name="chevron-right" @click="handleExpandRowIconClick" />
        </data-table-cell>
        <data-table-cell :content="entry.Name"/>
        <data-table-input-cell :id="entry.ID"
                               :rowExpanded="rowExpanded"
                               :isBeingEdited="isBeingEdited"
                               :content="entry.Description"
                               v-on:editState="handleEditStateEmitted"
                               v-on:eventTableCellContentUpdated="handleTableCellDescriptionUpdated" />
        <data-table-cell :content="entry.Amount | formatDollarAmount"/>
        <data-table-cell :content="entry.Date | formatDateFromISO"/>
    </tr>
</template>


<script>
    import * as ACTION from '../store/types.actions';
    import { formatDateFromISO, formatDollarAmount } from '../utils/utils';
    import DataTableCell from './DataTableCell.vue';
    import DataTableInputCell from './DataTableInputCell.vue';
    import { EvaIcon } from 'vue-eva-icons';
    import "../styles/app.scss";


    export default {
        name: 'DataTableRow',


        props: {
            entry: {
                type: Object,
                required: true
            }
        },


        components: {
            DataTableCell,
            DataTableInputCell,
            [EvaIcon.name]: EvaIcon
        },


        data() {
            return {
                rowExpanded: false,
                isBeingEdited: false,
            };
        },


        methods: {
            handleTableCellDescriptionUpdated(entry) {
                this.$store.dispatch(ACTION.UPDATE_ENTRY_BY_KEY, { key: entry.id, entryObj: {Description: entry.content} });
            },

            handleExpandRowIconClick() {
                this.rowExpanded = !this.rowExpanded;

                // if row is collapsed, then it cannot be in edit state:
                if (this.rowExpanded === false) {
                    this.isBeingEdited = false;
                }
            },

            handleEditStateEmitted(val) {
                this.isBeingEdited = val;
            }
        },


        computed: {
            cssClassesForExpandRowIcon() {
                return {
                    'expand-row-icon': true,
                    'expand-row-icon--expanded': this.rowExpanded === true
                }
            }
        },


        filters: {
            formatDateFromISO,
            formatDollarAmount
        },


        mounted() {
            this.$on('editState', (val) => {
                console.log(val);
                this.isBeingEdited = val;
            });
        }
    }
</script>


<style scoped lang="scss">
    @import "../styles/base/constants";


    .data-table-row {

        &:hover td {
            border-top: $table-border-hover;
            border-bottom: $table-border-hover;
            background-color: rgba(231, 236, 255, 0.13);

            &:first-of-type {
                border-left: $table-border-hover;
            }

            &:last-of-type {
                border-right: $table-border-hover;
            }
        }
    }
</style>
