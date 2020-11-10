<template>
    <form class="alpha-signup-form" @submit.prevent="processForm" method="post">
        <div v-if="!showSuccess" class="form-row">
            <label for="name">What should we call you? *</label>
            <h4>{{ errors.name }}</h4>
        </div>
        <input v-if="!showSuccess" id="name" placeholder="Vitalik" v-model="name" type="text" name="name" />

        <div v-if="!showSuccess" class="form-row two-halfs">
            <label for="email">What is your email? *</label>
            <h4>{{ errors.email }}</h4>
        </div>
        <input
            v-if="!showSuccess"
            id="email"
            placeholder="vitalik@eth.com"
            v-model="email"
            type="email"
            name="email"
        />

        <div v-if="!showSuccess" class="form-row">
            <label for="address">Wallet Address</label>
            <h4>{{ errors.address }}</h4>
        </div>
        <div v-if="!showSuccess" class="form-row">
            <div class="input-info">
                <h3>
                    We will be air-dropping many different tokens to our first early adopters. Where should we
                    deliver them?
                </h3>
            </div>
            <input id="address" placeholder="0x..." v-model="address" type="address" name="address" />
        </div>
        <input v-if="!showSuccess" class="submit" type="submit" value="Submit" />
        <div v-if="showSuccess" class="success">
            <h1>Signup Successful!</h1>
            <lottie-animation
                v-if="showSuccess"
                path="lottie/645-success.json"
                :loop="false"
                :height="300"
                :width="300"
                :speed="0.5"
            />
        </div>
    </form>
</template>
<script>
import { mapActions } from 'vuex';
import Web3 from 'web3';
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue';
export default {
    data: function() {
        return {
            errors: {
                address: '',
                email: '',
                name: ''
            },
            name: '',
            email: '',
            address: '',
            showSuccess: false
        };
    },
    components: {
        LottieAnimation
    },
    methods: {
        ...mapActions(['sendSignUpEmail']),

        processForm: function(e) {
            this.resetErrors();
            if (this.name == '') {
                this.errors.name = 'Name is a required field.';
            }
            if (this.email == '') {
                this.errors.email = 'Email is a required field.';
            }

            if (this.address != '' && !Web3.utils.isAddress(this.address)) {
                this.errors.address = 'Not a valid address';
            }

            if (this.checkErrors(this.errors)) {
                this.sendSignUpEmail({
                    name: this.name,
                    email: this.email,
                    address: this.address
                }).then(() => {
                    this.showSuccess = true;
                });
            }
        },
        resetErrors: function() {
            this.errors.address = '';
            this.errors.email = '';
            this.errors.name = '';
        },
        validEmail: function(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        checkErrors: function(errors) {
            const values = Object.values(errors);

            for (const value of values) {
                if (value != '') return false;
            }

            return true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.alpha-signup-form {
    .submit {
        margin-top: 150px;
    }

    .success {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h1 {
            text-align: center;
        }
    }
}
</style>
