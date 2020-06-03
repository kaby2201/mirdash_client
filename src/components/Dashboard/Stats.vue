<template>
    <b-jumbotron class="mt-4">
        <h2>Stats</h2>
    </b-jumbotron>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "Stats",
        created() {
            this.status
        },
        methods: {
            ...mapActions('status', {
                status: 'getByRobotId'
            })
        },
        computed: {
            ...mapState({
                status: state => state.status
            })
        }
    }
</script>

<style scoped>

</style>