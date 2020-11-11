<template>
    <div class="landing-page-main">
        <div class="logo">
            <Planet class="planet" />
            <Logo class="title" />
        </div>
        <div class="discover-more">
            <Button title="ALPHA SIGNUP" @clicked="flipModal" buttonStyle="primary"></Button>

            <div class="social-media">
                <a href="https://twitter.com/dx_space">
                    <Twitter />
                </a>
                <a href="https://twitter.com/dx_space">
                    <Discord />
                </a>
            </div>
        </div>
        <my-canvas style="width: 100vw; height: 100vh;">
            <stars
                :x1="2 * 100"
                :x2="2 * 100 + 100 / 2"
                :y1="100"
                :y2="100 - 1"
                :background="'#020C3D'"
                :value="'22'"
            >
            </stars>
        </my-canvas>
    </div>
</template>

<script>
// @ is an alias to /src
import MyCanvas from '@/components/Canvas.vue';
import Logo from '@/assets/svg/logo.svg';
import Planet from '@/assets/svg/planet1.svg';
import stars from '@/components/Stars.vue';
import Button from '@/components/generics/Button.vue';
import Twitter from '@/assets/svg/twitter.svg';
import Discord from '@/assets/svg/discord-nav.svg';
import { mapActions } from 'vuex';

export default {
    name: 'LandingPage',
    components: {
        stars,
        MyCanvas,
        Button,
        Logo,
        Planet,
        Twitter,
        Discord
    },
    methods: {
        ...mapActions(['flipModal'])
    }
};
</script>

<style lang="scss">
.landing-page-main {
    height: 100%;
    width: 100%;
    position: relative;
    overflow-x: hidden;

    .signup {
        position: absolute;
        bottom: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        z-index: 3;
    }

    .discover-more {
        position: absolute;

        bottom: 50px;
        z-index: 4;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .social-media {
            width: 100%;
            z-index: 4;
            height: 50px;
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 1s;
            h4 {
                color: var(--light-pink);
                margin-bottom: 10px;
            }
            a {
                height: 100%;
                svg {
                    height: 100%;
                    transition: 0.5s;
                    fill: var(--pink-gradient);
                    margin-right: 20px;
                    &:hover {
                        transform: translateY(10px);
                        cursor: pointer;
                    }
                }
            }

            :last-child {
                svg {
                    margin: 0;
                }
            }
        }
    }

    .logo {
        position: absolute;
        display: flex;
        z-index: 1;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
        .title {
            position: absolute;
            height: 25vh;
        }
        .planet {
            height: 65vh;
            position: absolute;
        }
    }
}
</style>
