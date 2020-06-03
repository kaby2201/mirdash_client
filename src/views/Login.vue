<template>
    <div id="main-form">
        <b-form @submit.prevent="handleSubmit">
            <h1 class="h3 mb-3 font-weight-normal">Welcome back!</h1>
            <!-- Username label and input -->
            <b-form-group label="Username" label-for="Username">
                <b-form-input
                        id="Username"
                        v-model="username"
                        type="text"
                        required
                        placeholder="Enter your username"
                        :class="{ 'is-invalid': submitted && !username }"
                ></b-form-input>
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </b-form-group>

            <!-- Password label and input -->
            <b-form-group label="Password" label-for="Password">
                <b-form-input
                        id="Password"
                        v-model="password"
                        autocomplete="true"
                        type="password"
                        value="Password1."
                        required
                        placeholder="Enter your password"
                        :class="{ 'is-invalid': submitted && !password }"
                ></b-form-input>
            </b-form-group>
            <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>

            <!-- show loading -->
            <b-spinner label="Loading..." v-show="status.loggingIn"></b-spinner>
            <b-button block type="submit" variant="primary" id="Submit">Login</b-button>
        </b-form>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        computed: {
            ...mapState('account', ['status'])
        },
        created(){
            // reset login status
            this.logout();
        },
        methods: {
            ...mapActions('account', ['login', 'logout']),
            handleSubmit () {
                this.submitted = true;
                const { username, password } = this;
                if (username && password) {
                    this.login({ username, password })
                }
            }
        }
    }
</script>
<style scoped>
    form {
        width: 100%;
        max-width: 330px;
        margin: 20px auto;
    }
    #main-form{
        color: aliceblue;
        margin: 65px auto;
        background: #2b2b2b;
        width: 450px;
        border-radius: 4px;
        padding: 21px;
    }
</style>
