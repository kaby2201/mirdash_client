<template>
    <div>
        <b-list-group>
            <b-list-group-item to="/dashboard" exact exact-active-class="active">
                <b-icon-bar-chart/>
                Dashboard
            </b-list-group-item>
            <b-list-group-item to="/missions" exact exact-active-class="active">
                <b-icon-clipboard-data/>
                Missions
            </b-list-group-item>
            <b-list-group-item to="/robots" exact exact-active-class="active">
                <b-icon-outlet/>
                Robots
            </b-list-group-item>
        </b-list-group>

        <!-- Administrator settings -->
        <b-list-group v-if="profile.role === 'Admin'">
            <b-list-group-item to="/usermanager" exact exact-active-class="active" id="test-all-users">
                <b-icon-people /> Users
            </b-list-group-item>
            <b-list-group-item to="/account" exact exact-active-class="active" id="test-account">
                <b-icon-person /> My account
            </b-list-group-item>
            <b-list-group-item to="/register" exact exact-active-class="active" id="test-add-user">
                <b-icon-person-plus /> New user
            </b-list-group-item>
        </b-list-group>

        <!-- Administrator settings -->
        <b-list-group>
            <b-list-group-item to="/about">
                &copy; 2020 Copyright: Mirdash About/Licenses
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "Sidebar",
        computed:{
            ...mapState({
                // state.account.user have meta info of the logged in user
                profile: state => state.account.user
            })
        }
    }
</script>
<style>
    .list-group{
        margin-top: 20px;
    }
</style>