<template>
    <button :class="cssClassesForButton" type="button"><slot /></button>
</template>


<script>
    export default {
        name: 'AppButton',


        props: {
            color: {
                type: String,
                required: true,
                validator: (val) => {
                    // must be either one of the following colors:
                    return ['blue', 'gray', 'green', 'red'].indexOf(val) !== -1;
                }
            }
        },


        computed: {
            cssClassesForButton() {
                return {
                    'app-button':        true,
                    'app-button--blue':  this.color === 'blue',
                    'app-button--gray':  this.color === 'gray',
                    'app-button--green': this.color === 'green',
                    'app-button--red':   this.color === 'red'
                };
            }
        }
    }
</script>


<style scoped lang="scss">
    @import "../styles/base/constants";
    @import "../styles/mixins/mixins";


    .app-button {
        border-radius: $border-radius-default;
        background: white;
        padding: 8px 16px;

        & + & {
            margin-left: 8px;
        }

        &--blue {
            @include appButtonColor(#58a7ff);
        }

        &--gray {
            color: $font-color-muted;
            border: none;
            background-color: transparent;
        }

        &--green {
            @include appButtonColor(#40ff5e);
        }

        &--red {
            @include appButtonColor(#ff3232);
        }
    }
</style>
