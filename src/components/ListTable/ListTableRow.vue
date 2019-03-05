<template>
    <tr class="list-table-row">
        <list-table-cell :content="entry.Name"/>
        <list-table-cell :content="entry.Amount | formatDollarAmount"/>
        <list-table-cell :content="entry.Date | formatDateFromISO"/>
    </tr>
</template>


<script>
    import * as ACTION from '../../store/types.actions';
    import { formatDateFromISO, formatDollarAmount } from '../../utils/utils';
    import ListTableCell from './ListTableCell.vue';
    import { EvaIcon } from 'vue-eva-icons';
    import "../../styles/app.scss";


    export default {
        name: 'ListTableRow',


        props: {
            entry: {
                type: Object,
                required: true
            }
        },


        components: {
            ListTableCell,
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
    @import "../../styles/base/constants";


    .list-table-row {

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
