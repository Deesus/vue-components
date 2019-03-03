<template>
    <td class="data-table-input-cell">
        <div :class="cssClassesForTableCellTextarea"
             v-html="sanitizedContent"
             ref="dataTableTextField"
             :contenteditable="isBeingEdited">
        </div>

        <div v-if="rowExpanded" class="data-table-input-cell__controls">
            <app-button v-if="!isBeingEdited" color="blue" @click.native.stop="handleEditButtonClick">
                Edit
            </app-button>
            <app-button v-if="isBeingEdited" color="gray" @click.native.stop="handleCancelButtonClick">Cancel</app-button>
            <app-button v-if="isBeingEdited" color="blue" @click.native.stop="handleSaveButtonClick">Save</app-button>
        </div>
    </td>
</template>


<script>
    import { EvaIcon } from 'vue-eva-icons';
    import AppButton from '../AppButton.vue';


    export default {
        name: 'DataTableCellInputCell',


        props: {
            id: {
                required: false
            },

            rowExpanded: {
                type: Boolean,
                required: true
            },

            isBeingEdited: {
                type: Boolean,
                required: true
            },

            content: {
                type: String,
                required: false
            }
        },


        components: {
            AppButton,
            [EvaIcon.name]: EvaIcon,
        },


        data() {
            return {
                originalContent: this.sanitizedContent
            };
        },


        methods: {
            handleSaveButtonClick(event) {
                if (this.isBeingEdited === true) {
                    // sanitize input before it is sent to the db:
                    const sanitizedText = this.$sanitize(this.$refs.dataTableTextField.innerHTML);

                    // emit to parent component:
                    this.$emit('eventTableCellContentUpdated', {
                        id:      this.id,
                        content: sanitizedText
                    });

                    this.$emit('editState', false);
                }
            },

            handleEditButtonClick(event) {
                this.$emit('editState', true);
            },

            handleCancelButtonClick(event) {
                this.$emit('editState', false);
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

            cssClassesForTableCellTextarea() {
                return {
                    'data-table-input-cell__textarea': true,
                    'data-table-input-cell__textarea--expanded': this.rowExpanded === true,
                    'data-table-input-cell__textarea--editing': (this.isBeingEdited === true) && (this.rowExpanded === true)
                }
            }
        }
    }
</script>


<style scoped lang="scss">
    @import "../../styles/base/constants";
    @import "../../styles/mixins/mixins";


    .data-table-input-cell {
        @include tableInputCellGeometry();

        border-top: $table-border;
        max-height: $table-row-height;
        vertical-align: top;

        &__textarea {
            border-radius: 2px;
            max-height: 34px;
            overflow: hidden;

            &--expanded {
                max-height: none;
            }

            &--editing {
                background-color: white;
                max-height: none;
                box-shadow: 0 0 0 2px inset dodgerblue;
            }
        }

        &__controls {
            text-align: right;
        }
    }
</style>
