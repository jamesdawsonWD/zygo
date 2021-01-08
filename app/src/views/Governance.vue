<template>
    <div class="governance">
        <div class="stats-info">
            <Box>
                <PriceView asset="Total Staked" price="274.9M" slot="boxContent" />
            </Box>
            <Box class="sig-token">
                <div class="panel" slot="boxContent">
                    <div class="sig-stats">
                        <PriceView asset="Signo (SIG)" price="11.36%" />
                        <span>Annual percentage rate (APR)</span>
                    </div>
                    <Button title="Stake" @clicked="openSigStake()" buttonStyle="primary"></Button>
                </div>
            </Box>
            <Box>
                <PriceView asset="Staking Ratio" price="14.26%" slot="boxContent" />
            </Box>
        </div>
        <PageTitle title="Polls" buttonName="Create Poll" />
        <div class="polls">
            <Poll
                @click.native="openModal(item)"
                class="poll"
                :class="{ 'first-pool': index == 1 }"
                v-for="(item, index) in examplePolls"
                :key="index"
                :title="item.title"
                :yesVotes="item.yes"
                :noVotes="item.no"
                :status="item.status"
                :finishDate="item.finishDate"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Box from '@/components/generics/Box.vue';
import { mapActions } from 'vuex';
import PriceView from '@/components/generics/PriceView.vue';
import Button from '@/components/generics/Button.vue';
import Poll from '@/components/generics/Poll.vue';
import PageTitle from '@/components/generics/PageTitle.vue';
export default {
    name: 'Stake',
    data() {
        const examplePolls = {
            1: {
                title: 'This is a fake question about some stuff',
                yes: 10000000,
                no: 30000000,
                status: 'In Progress',
                finishDate: '~13 days',
                link: 'https://github.com/',
                description:
                    'Proin rutrum mi ac lorem rhoncus, posuere accumsan magna bibendum. Praesent efficitur dolor non porta tincidunt.',
                votes: [
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0x6FC49837F5D4fc5aB3b4D89748F3457B4bD1da0C',
                        amount: 3000000,
                        cast: 'no'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0x6FC49837F5D4fc5aB3b4D89748F3457B4bD1da0C',
                        amount: 3000000,
                        cast: 'no'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0x6FC49837F5D4fc5aB3b4D89748F3457B4bD1da0C',
                        amount: 3000000,
                        cast: 'no'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0x6FC49837F5D4fc5aB3b4D89748F3457B4bD1da0C',
                        amount: 3000000,
                        cast: 'no'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0x6FC49837F5D4fc5aB3b4D89748F3457B4bD1da0C',
                        amount: 3000000,
                        cast: 'no'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    }
                ]
            },
            2: {
                title: 'More stuff less things! We are in need of the stuff now and forget about the things!',
                yes: 1000000,
                no: 10000000,
                status: 'Failed',
                finishDate: 'Ended',
                link: 'https://github.com/',
                description:
                    'Proin rutrum mi ac lorem rhoncus, posuere accumsan magna bibendum. Praesent efficitur dolor non porta tincidunt.',
                votes: [
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0x6FC49837F5D4fc5aB3b4D89748F3457B4bD1da0C',
                        amount: 3000000,
                        cast: 'no'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    }
                ]
            },
            3: {
                title: 'Bring back the things!',
                yes: 90000000,
                no: 1000000,
                status: 'Passed',
                finishDate: '13 days',
                link: 'https://github.com/',
                description:
                    'Proin rutrum mi ac lorem rhoncus, posuere accumsan magna bibendum. Praesent efficitur dolor non porta tincidunt.',
                votes: [
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    },
                    {
                        address: '0x6FC49837F5D4fc5aB3b4D89748F3457B4bD1da0C',
                        amount: 3000000,
                        cast: 'no'
                    },
                    {
                        address: '0xe946BeCd1276cd0Cb177b7c52200D6a03ee75037',
                        amount: 1000000,
                        cast: 'yes'
                    }
                ]
            }
        };
        return {
            examplePolls
        };
    },
    methods: {
        // depositAmount: function(deposit: Deposit) {
        //     this.deposit(deposit);
        // }
        ...mapActions(['UIM_openModal']),
        openSigStake() {
            this.UIM_openModal({
                show: true,
                content: 'sigStake'
            });
        },
        openModal(poll) {
            this.UIM_openModal({
                show: true,
                content: 'poll',
                data: {
                    id: Object.keys(poll)[0],
                    title: poll.title,
                    yes: poll.yes,
                    no: poll.no,
                    status: poll.status,
                    finishDate: poll.finishDate,
                    description: poll.description,
                    votes: poll.votes,
                    link: poll.link
                }
            });
        }
    },
    components: {
        // DepositForm,
        // Modal,
        Box,
        PriceView,
        Button,
        Poll,
        PageTitle
    }
};
</script>
<style lang="scss">
@import '@/styles';

.governance {
    position: relative;
    justify-content: center;
    width: auto;
    align-items: start;
    margin: 150px 300px 0 300px;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 50px;
    grid-column-gap: 100px;
    padding-bottom: 100px;
    .box {
        width: auto;
        margin: 0;
    }

    .polls {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 100px;
        grid-row-gap: 50px;
    }

    .stats-info {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-row-gap: 50px;
        grid-column-gap: 100px;

        .sig-token {
            grid-row: 1 / span 2;
            grid-column: 2 / span 2;
            height: 100%;

            .slots {
                height: 100%;
            }
            .panel {
                height: inherit;
                display: flex;
                justify-content: space-evenly;
                flex-direction: column;
                align-items: center;
                padding: 0;

                .sig-stats {
                    display: flex;
                    flex-direction: column;
                    height: 90px;
                    justify-content: space-between;

                    .title {
                        font-size: var(--lg-font);
                    }
                }
                span {
                    color: var(--main-secondary);
                    text-transform: uppercase;
                    font-size: var(--sm-font);
                    margin-top: 10px;
                    @include DS_Light;
                }
                button {
                    width: 100px;
                    margin: 0;
                }
                .priceView .title,
                .priceView .price {
                    text-align: center;
                }
            }
        }
    }
}
</style>
