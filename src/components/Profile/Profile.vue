<template>
    <b-jumbotron class="mt-4">
        <b-card-group deck>
            <b-card>
                <template slot="header">
                    <h3>User account</h3>
                </template>
                <p class="card-text mt-2">
                    <b-form-group label="Full name">
                    <b-form-input :value="profile.firstName + ' ' + profile.lastName" trim disabled></b-form-input>
                    </b-form-group>

                    <b-form-group label="Username">
                        <b-form-input :value="profile.username" trim disabled></b-form-input>
                    </b-form-group>

                    <b-form-group label="Role">
                        <b-form-input :value="profile.role" trim disabled></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="info" to="usermanager" class="mt-5 w-100">
                        <b-icon-person-lines-fill/>
                        Edit profile</b-button>
                </p>
            </b-card>
        </b-card-group>
    </b-jumbotron>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "Profile",
        computed:{
            ...mapState({
                profile: state => state.account.user
            })
        }
    }
</script>

<style scoped>

</style>