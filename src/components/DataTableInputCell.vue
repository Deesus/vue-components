<template>
    <td class="data-table-input-cell">
        <div :class="cssClassesForTableCellContainer"
             @blur="handleTableCellBlur($event)"
             v-html="sanitizedContent"
             :contenteditable="editable"
        ></div>
    </td>
</template>


<script>
    export default {
        name: 'DataTableCellInputCell',

        props: {
            id: {
                required: false
            },

            editable: {
                type: Boolean,
                required: true
            },

            content: {
                type: String,
                required: false
            }
        },

        methods: {
            handleTableCellBlur(event) {
                if (this.editable === true) {
                    // sanitize input before it is sent to the db:
                    const sanitizedInput = this.$sanitize(event.target.innerHTML);

                    // emit to parent component:
                    this.$emit('eventTableCellContentUpdated', {
                        id:      this.id,
                        content: sanitizedInput
                    });
                }
            }
        },

        computed: {
            /**
             * Sanitizes data as it comes from the database into the view-model.
             * N.b. we also need to sanitize data before it is sent to the db,
             * but this function doesn't handle that.
             *
             * @returns {*}
             */
            sanitizedContent() {
                return this.$sanitize(this.content);
            },

            cssClassesForTableCellContainer() {
                return {
                    'data-table-input-cell__container': true,
                    'data-table-input-cell__container--expanded': this.editable === true
                };
            }
        }

    };
</script>


<style scoped lang="scss">
    @import "../styles/base/constants";
    @import "../styles/mixins/mixins";


    .data-table-input-cell {
        @include tableCellGeometry();

        border-top: $table-border;
        transition: 250ms background-color ease-in-out;
        max-height: $table-row-height;

        &--expanded {
            &__container {
                word-wrap: normal;
                overflow-wrap: normal;
            }
        }

        &__container {
            border: 0;
            max-height: $table-row-height - (2 * $table-padding-vertical);

            overflow: hidden;
            line-height: 2;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;

            &--expanded {
                word-wrap: normal;
                overflow-wrap: normal;
                max-height: none;

                &:focus {
                    outline: none;
                    box-shadow: 0 0 0 1px inset dodgerblue;
                }
            }
        }
    }
</style>
