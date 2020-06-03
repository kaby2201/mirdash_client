<template>
    <b-collapse id="collapse-1" class="mb-3">
        <b-card-group deck>
            <b-card no-body header="Admin policy">
                <b-list-group flush>
                    <b-list-group-item href="#">Delete user</b-list-group-item>
                    <b-list-group-item href="#">Create user</b-list-group-item>
                    <b-list-group-item href="#">Change role</b-list-group-item>
                    <b-list-group-item href="#">Connect to new robots</b-list-group-item>
                    <b-list-group-item href="#">Delete robots</b-list-group-item>
                    <b-list-group-item href="#">All user policy</b-list-group-item>
                </b-list-group>
            </b-card>

            <b-card no-body header="User policy">
                <b-list-group flush>
                    <b-list-group-item href="#">View robots</b-list-group-item>
                    <b-list-group-item href="#">View robot status</b-list-group-item>
                    <b-list-group-item href="#">View robot missions</b-list-group-item>
                </b-list-group>
            </b-card>
        </b-card-group>
    </b-collapse>
</template>

<script>
    // This is no a page - as a page component
    export default {
        name: "RoleInfo"
    }
</script>

<style scoped>

</style>