<template>
    <b-jumbotron class="mt-4">
        <b-collapse id="collapse-1" class="mb-3">
            <b-card-group deck>
                <b-card no-body header="Admin policy">
                    <b-list-group flush>
                        <b-list-group-item href="#">Delete user</b-list-group-item>
                        <b-list-group-item href="#">Create user</b-list-group-item>
                        <b-list-group-item href="#">Change role</b-list-group-item>
                        <b-list-group-item href="#">Connect to new robots</b-list-group-item>
                        <b-list-group-item href="#">All user policy</b-list-group-item>
                    </b-list-group>
                </b-card>

                <b-card no-body header="User policy">
                    <b-list-group flush>
                        <b-list-group-item href="#">View robots</b-list-group-item>
                        <b-list-group-item href="#">View robot status</b-list-group-item>
                        <b-list-group-item href="#">View robot missions</b-list-group-item>
                        <b-list-group-item href="#">Delete robots from admin panel</b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-card-group>
        </b-collapse>

        <h2><b-icon-person-plus-fill/> Register</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input id="Firstname" type="text" v-model="user.firstName" v-validate="'required'" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && veeErrors.has('firstName') }" />
                <div v-if="submitted && veeErrors.has('firstName')" class="invalid-feedback">{{ veeErrors.first('firstName') }}</div>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input id="Lastname" type="text" v-model="user.lastName" v-validate="'required'" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && veeErrors.has('lastName') }" />
                <div v-if="submitted && veeErrors.has('lastName')" class="invalid-feedback">{{ veeErrors.first('lastName') }}</div>
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input id="Username" type="text" v-model="user.username" v-validate="'required'" name="username" class="form-control" :class="{ 'is-invalid': submitted && veeErrors.has('username') }" />
                <div v-if="submitted && veeErrors.has('username')" class="invalid-feedback">{{ veeErrors.first('username') }}</div>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input id="Email" type="email" v-model="user.email" v-validate="'required'" name="email" class="form-control" :class="{ 'is-invalid': submitted && veeErrors.has('email') }" />
                <div v-if="submitted && veeErrors.has('username')" class="invalid-feedback">{{ veeErrors.first('email') }}</div>
            </div>
            <b-form-group id="Input-group-3" label="Role:" label-for="input-3">
                <b-form-select
                        id="Input-3"
                        v-model="user.role"
                        :options="roles"
                        required
                ></b-form-select>
            </b-form-group>
            <b-badge href="#" variant="info" v-b-toggle.collapse-1 class="mb-2">About policy</b-badge>

            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input id="Password" type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && veeErrors.has('password') }" />
                <div v-if="submitted && veeErrors.has('password')" class="invalid-feedback">{{ veeErrors.first('password') }}</div>
            </div>
            <div class="form-group">
                <button id="Submit" class="btn btn-primary" :disabled="status.registering">Register</button>
                <b-spinner label="Loading..." v-show="status.registering"></b-spinner>
            </div>
        </form>
    </b-jumbotron>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name : "Edit",
        data () {
            return {
                roles: [{ text: 'Select One', value: null }, 'Admin', 'User'],
                user: {
                    firstName: '',
                    lastName: '',
                    username: '',
                    email:'',
                    role:'',
                    password:''
                },
                submitted: false
            }
        },
        computed: {
            ...mapState('account', ['status'])
        },
        methods: {
            ...mapActions('account', ['register']),
            handleSubmit() {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.register(this.user);
                    }
                });
            }
        }
    };
</script>