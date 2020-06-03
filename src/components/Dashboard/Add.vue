<template>
    <b-jumbotron class="mt-4">
        <h2>Add new robot</h2>
        <div class="w-auto">
            <b-form @submit.prevent="handleSubmit">
                <b-form-group label="Hostname" label-for="Robotname">
                    <b-form-input
                            id="Robotname"
                            v-model=robot.hostname
                            type="text"
                            required
                            placeholder="Enter a robot name" />
                </b-form-group>

                <b-form-group
                        label="IP-address or domain name"
                        label-for="Address"
                        :description=description(robot.basePath)>
                    <b-form-input
                            id="Address"
                            v-model=robot.basePath
                            required
                            placeholder="Enter robot address" />
                </b-form-group>

                <b-form-group
                        label="Robot API Username"
                        label-for="Address">
                    <b-form-input
                            id="RUsername"
                            v-model=robot.username
                            required
                            placeholder="Enter robot address" />
                </b-form-group>
                <b-form-group
                        label="Robot API Password"
                        label-for="Address">
                    <b-form-input
                            id="RPassword"
                            v-model=robot.password
                            required
                            placeholder="Enter robot address"
                            type="password" />
                </b-form-group>

                <b-button type="submit" variant="info" id="Add-robot-submit" class="w-100"><b-icon-plug/> Connect to robot</b-button>
            </b-form>
        </div>
    </b-jumbotron>
</template>

<script>
    import { mapActions } from 'vuex';
    import { sha256 } from 'js-sha256';

    export default {
        data() {
            return {
                description: (ip)=> `Api base path will be http://${ip}/api/v2.0.0`,
                robot: {
                    guId: null,
                    basePath: '',
                    username: '',
                    password: '',
                    get token() {return btoa(`${this.username}:${sha256(this.password)}`)},
                    hostname: '',
                    isOnline: false
                },
                submitted: false
            }
        },
        methods: {
            ...mapActions('robots', ['add']),
            handleSubmit() {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        // TODO - link under is for testing purposes only
                        this.robot.basePath = `http://${this.robot.basePath}/api/v2.0.0`;
                        this.add(this.robot);
                    }
                });
            }
        }
    }
</script>