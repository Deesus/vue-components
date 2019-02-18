<template>
    <td class="data-table-cell">
        <slot>{{ content }}</slot>
    </td>
</template>


<script>
    export default {
        name: 'DataTableCell',

        props: {
            id: {
                required: false
            },

            content: {
                type: String,
                required: false
            }
        }
    };
</script>


<style scoped lang="scss">
    @import "../styles/base/constants";
    @import "../styles/blocks/expand-row-icon";
    @import "../styles/mixins/mixins";


    .data-table-cell {
        @include tableCellGeometry();

        border-top: $table-border;
        transition: 250ms background-color ease-in-out;
        vertical-align: top;
    }
</style>
