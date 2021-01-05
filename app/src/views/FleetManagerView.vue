<template>
    <div class="dashboard" v-if="UIM_IsLoading == false">
        <!--    // <div class="utility-bar">
        //     <div class="solar-balance">
        //         <Solar class="img" />
        //         <h1>{{ SOLAR_getBalance }}</h1>
        //     </div>
        //     <div class="sat-balance"></div>
        //     <div class="fhr-balance">
        //         <Planet class="img" />
        //         <h1>{{ FHR_getBalance.length }}</h1>
        //     </div>
        // </div>
        // <div v-if="false" class="button-menu">
        //     <Button
        //         title="Mint Solar"
        //         @clicked="TREASURY_testMintSolar({ to: Address, amount: 1000 })"
        //         buttonStyle="primary"
        //     ></Button>
        //     <Button
        //         title="Mint Sat"
        //         @clicked="TREASURY_testSendSats({ ids, amounts })"
        //         buttonStyle="primary"
        //     ></Button>

        // </div>
        // <h2 class="section-heading">Planets: (PLNTS)</h2>
        -->
        <Button
            title="Clain Rewards"
            @clicked="GO_testFhrDiscovery({ systemType: 15 })"
            buttonStyle="primary"
        ></Button>
        <div class="grid planets">
            <article
                v-for="(item, index) in ST_getAll"
                :key="index"
                :class="{ deactive: item == 0 }"
                @click="planetSelected(index)"
            >
                <h3>{{ item.symbol }}</h3>
                <h2>{{ item.name }}</h2>
            </article>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Button from '@/components/generics/Button.vue';
export default {
    name: 'FleetManagerView',
    components: {
        Button
    },
    data(): void {
        return {
            ids: [0, 1, 2, 3, 7],
            amounts: [1, 3, 2, 5, 1]
        };
    },
    computed: {
        ...mapGetters(['Address', 'UIM_IsLoading', 'ST_getAll'])
    },
    methods: {
        // ...mapActions([
        //     'UIM_setIsLoading',
        //     'SAT_getSatBalanceOfBatch',
        //     'SOLAR_retrieveBalance',
        //     'TREASURY_testMintSolar',
        //     'TREASURY_testSendSats',
        //     'GO_testFhrDiscovery',
        //     'FHR_retrieveBalance',
        //     'GS_retrievetokenIdToYield',
        //     'UIM_openModal'
        // ]),
        planetSelected(id: number): void {
            this.UIM_openModal({
                show: true,
                type: 'deploy-planet',
                content: 'This planet has not yet been deployed!',
                data: {
                    tokenId: id
                }
            });
        }
    }
};
</script>

<style lang="scss">
.dashboard {
    height: 100vh;
    width: 100vw;

    .utility-bar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        & > * {
            margin-right: 40px;
        }

        & .solar-balance .img {
            height: 150px;
        }
        & .fhr-balance .img {
            height: 150px;
        }
    }

    .button-menu {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 100px;
    }
    .section-heading {
        margin-top: 45px;
    }
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
    }

    & .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, auto);
        grid-gap: 50px;
        justify-content: center;
        align-items: center;
        margin: 50px;
        & article {
            height: 450px;
            width: 100%;
            max-width: 700px;
            background: var(--foreground-color);
            border-radius: 30px;
            margin: auto;
            padding: 30px;
            transition: 0.3s;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            -webkit-box-shadow: 9px 14px 22px -6px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 9px 14px 22px -6px rgba(0, 0, 0, 0.75);
            box-shadow: 9px 14px 22px -6px rgba(0, 0, 0, 0.75);
            & > .img {
                width: 100%;
            }
            & > .stats {
                display: flex;
                justify-content: space-between;
                margin-top: 15px;
                padding: 8px;

                & h4 {
                    color: var(--main-font) !important;
                }
            }
            & > h3,
            h2 {
                color: var(--main-font) !important;
            }
            &:hover {
                cursor: pointer;
                transform: translateY(-10px);
            }
        }
    }
    & .planets > article {
        height: 250px;
    }
}
</style>
