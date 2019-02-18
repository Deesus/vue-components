<template>
    <tr class="data-table-row">
        <data-table-cell>
            <eva-icon :class="cssClassesForExpandRowIcon" fill="#353535" name="chevron-right" @click="handleExpandRowIconClick" />
        </data-table-cell>
        <data-table-cell :content="entry.Name"/>
        <data-table-input-cell :id="entry.ID"
                               :editable="isExpanded"
                               :content="entry.Description"
                               v-on:eventTableCellContentUpdated="handleTableCellDescriptionUpdated"/>
        <data-table-cell :content="entry.Amount | formatDollarAmount"/>
        <data-table-cell :content="entry.Date | formatDateFromISO"/>
    </tr>
</template>


<script>
    import * as CONST from '../app.constants';
    import * as ACTION from '../store/types.actions';
    import { formatDateFromISO, formatDollarAmount } from '../utils/utils';
    import DataTableCell from './DataTableCell.vue';
    import DataTableInputCell from './DataTableInputCell.vue';
    import { EvaIcon } from 'vue-eva-icons';


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
                isExpanded: false
            };
        },


        methods: {
            handleTableCellDescriptionUpdated(entry) {
                this.$store.dispatch(ACTION.UPDATE_ENTRY_BY_KEY, { key: entry.id, entryObj: {Description: entry.content} });
            },

            handleExpandRowIconClick() {
                this.isExpanded = !this.isExpanded;
            }
        },


        computed: {
            cssClassesForExpandRowIcon() {
                return {
                    'expand-row-icon': true,
                    'expand-row-icon--expanded': this.isExpanded === true
                }
            }
        },


        filters: {
            formatDateFromISO,
            formatDollarAmount
        },
    }
</script>


<style scoped lang="scss">
    @import "../styles/base/constants";


    .data-table-row {

        &:hover td {
            border-top: $table-border-hover;
            border-bottom: $table-border-hover;
            background-color: #e7ecff;
        }

        &--expanded {

        }
    }
</style>
