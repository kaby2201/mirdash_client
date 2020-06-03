<template>
    <b-jumbotron class="mt-4" id="test-users-list" >
        <h2>
            <b-icon-people-fill/>
            Manage Users
        </h2>
        <b-table
                striped
                hover
                :fields="fields"
                :items="users">
            <template v-slot:cell(Edit)="data">
                <b-button-group class="mx-1">
                    <b-button variant="info" @click="loadUser(data.item)">
                        <b-icon-person-lines-fill/>
                        Edit
                    </b-button>
                    <b-button variant="warning" :id="`test-delete-user${data.item.username}`"
                              v-if="account.user.id !== data.item.id"
                              @click="delete_user(data.item.id)">
                        <b-icon-person-dash/>
                        Delete
                    </b-button>
                </b-button-group>
            </template>
        </b-table>

        <b-modal v-model="modalShow" header-bg-variant="dark" header-text-variant="light" @ok="handleOk">
            <template v-slot:modal-title>
                <b-icon-person-bounding-box/>
                {{user.firstName}} {{user.lastName}} profile card
            </template>
            <div>
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group
                            id="input-edit-email-group"
                            label="Email address:"
                            label-for="input-edit-email"
                            description="Enter new email"
                    >
                        <b-form-input
                                id="input-edit-email"
                                v-model="form.email"
                                type="email"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                            id="input-edit-username-group"
                            label="Username:"
                            label-for="input-edit-username"
                    >
                        <b-form-input
                                id="input-edit-username"
                                v-model="form.username"
                                type="text"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                            id="input-edit-firstname-group"
                            label="Firstname:"
                            label-for="input-edit-firstname"
                    >
                        <b-form-input
                                id="input-edit-firstname"
                                v-model="form.firstname"
                                type="text"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                            id="input-edit-lastname-group"
                            label="Lastname:"
                            label-for="input-edit-lastname"
                    >
                        <b-form-input
                                id="input-edit-lastname"
                                v-model="form.lastname"
                                type="text"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                            id="input-edit-oldpassword-group"
                            label="Old password:"
                            label-for="input-edit-oldpassword"
                    >
                        <b-form-input
                                id="input-edit-oldpassword"
                                v-model="form.oldpassword"
                                type="password"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                            id="input-edit-newpassword-group"
                            label="New password:"
                            label-for="input-edit-newpassword"
                    >
                        <b-form-input
                                id="input-edit-newpassword"
                                v-model="form.newpassword"
                                type="password"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                            id="input-edit-newpassword-confim-group"
                            label="Confirm new password:"
                            label-for="input-edit-newpassword-confirm"
                            :description="confirmnewpasswordstate === false ? 'these password are not equal' : ''"
                    >
                        <b-form-input
                                id="input-edit-newpassword-confirm"
                                v-model="confirmnewpassword"
                                type="password"
                                :state=confirmnewpasswordstate
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-button id="input-edit-submit" type="submit" variant="primary" style="display:none;">Submit</b-button>
                </b-form>
            </div>
        </b-modal>
    </b-jumbotron>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: "Users",
        data() {
            return {
                modalShow: false,
                user: {'Id': '', firstName: '', lastName: '', username: ''},
                fields: [
                    {key: 'username', label: 'Username', sortable: true},
                    {
                        key: 'firstName',
                        label: 'Full name',
                        sortable: true,
                        formatter: (value, key, item) => item.firstName + ' ' + item.lastName
                    },
                    {key: 'email', label: 'Email address', sortable: true},
                    {
                        key: 'role',
                        label: 'Policy',
                        sortable: true,
                        formatter: (value, key, item) => item.role != null ? item.role : 'User'
                    },
                    {key: 'Edit', label: '#'}],
                form: {
                    firstname: '',
                    lastname: '',
                    username: '',
                    email: '',
                    oldpassword: '',
                    newpassword: ''
                },
                confirmnewpassword: '',
                show: true
            }
        },
        created() {
            this.getAll();
        },
        methods: {
            ...mapActions('users', {
                getAll: 'getAll',
                deleteUser: 'delete',
            }),
            ...mapActions('account', {
                updateUser: 'update'
            }),
            loadUser: function (user) {
                this.user = user;
                this.form.email = user.email;
                this.form.username = user.username;
                this.form.firstname = user.firstName;
                this.form.lastname = user.lastName;
                this.modalShow = true;
            },
            delete_user(id){
                this.deleteUser(id);
            },
            onSubmit(evt) {
                evt.preventDefault()
                const updated = new Promise((resolve) => {
                    this.account.status.updateSuccess = (r) => resolve(r);
                });
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.updateUser({form: this.form, id: this.user.id});
                    }
                });
                updated.then(result => {
                    if (result) this.modalShow = false;
                });
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.food = null
                this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            handleOk(evt) {
                evt.preventDefault()
                document.getElementById('input-edit-submit').click();
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all.items
            }),
            confirmnewpasswordstate: function () {
                return this.confirmnewpassword === '' ? null :
                    this.confirmnewpassword === this.form.newpassword;
            }
        }
    }
</script>