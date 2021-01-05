<template>
    <div class="mapView">
        <Panels>
            <div slot="panelA">
                <Button
                    title="Create"
                    @clicked="
                        EMP_create({
                            numTokens: '11',
                            collateralAmount: '0.002',
                            tokenAddress: '0x65bbb1fec96f75002672195cf13c13e2a27cb415'
                        })
                    "
                    buttonStyle="primary"
                ></Button>
            </div>
        </Panels>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Button from '@/components/generics/Button.vue';
import Panels from '@/components/generics/PaneledBox.vue';

// import Button from '@/components/generics/Button.vue';
export default {
    name: 'MapView',
    computed: {
        ...mapGetters(['GS_getBoundaries'])
    },
    components: {
        // DepositForm,
        // Modal,
        Button,
        Panels
    },
    data(): void {
        return {
            mapView: 'quadrant',
            starPosition: {
                quadrant: 0,
                sector: 0,
                district: 0,
                star: 0
            }
        };
    },
    methods: {
        // depositAmount: function(deposit: Deposit) {
        //     this.deposit(deposit);
        // }
        ...mapActions(['EMP_create'])
    },

    async mounted() {
        // await this.bootstrapContracts();
        // await this.getBalance();
        // await this.getTsunoBalance();
        // await this.getDateUnlocked();
    }
};
</script>
<style lang="scss">
.mapView {
    height: 85vh;
    position: relative;
    overflow: hidden;

    .coordinates {
        position: absolute;
        height: 300px;
        width: auto;
        margin: 20px;
        background: #000208;
        color: var(--offset-white);
        border-radius: 20px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: start;
        flex-direction: column;
        font-size: 19pt;
        bottom: 0;
    }
    .map {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & .galaxy-svg {
        position: absolute;
        height: 90%;
        z-index: 0;
    }
    & .quadrant-map {
        & .quadrants {
            position: absolute;
            height: 90%;
            z-index: 1;
        }

        & .quadrants-highlights {
            position: absolute;
            height: 90%;
            z-index: 2;
            & path {
                visibility: hidden;
                fill: none;
                pointer-events: all;
            }

            & path:hover {
                visibility: visible;
                cursor: pointer;
            }
        }
    }

    & .sector-map {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        & .sectors {
            position: absolute;
            height: 90%;

            & path {
                fill: none;
                pointer-events: all;
            }

            & path:hover {
                visibility: visible;
                fill: white;
                cursor: pointer;
            }
        }
    }
    & .star-map {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        & .stars {
            position: absolute;
            height: 90%;

            & rect {
                fill: none;
                pointer-events: all;
            }

            & rect:hover {
                visibility: visible;
                fill: white;
                cursor: pointer;
            }
        }
    }
}
</style>
