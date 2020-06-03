<template>
  <b-jumbotron class="mt-4">
    <b-card-group deck>
      <b-card bg-variant="primary" text-variant="white" class="text-center sm">
        <template v-slot:header>
          <h4>
            <b-icon-outlet />Robots
          </h4>
        </template>
        <b-card-text>
          <h2>{{robotsCount}}</h2>
        </b-card-text>
      </b-card>
      <b-card bg-variant="secondary" text-variant="white" class="text-center">
        <template v-slot:header>
          <h4>
            <b-icon-clipboard />Missions
          </h4>
        </template>
        <b-card-text>
          <h2>{{missionsCount}}</h2>
        </b-card-text>
      </b-card>
      <b-card bg-variant="success" text-variant="white" class="text-center">
        <template v-slot:header>
          <h4>
            <b-icon-people />Users
          </h4>
        </template>
        <b-card-text>
          <h2>{{usersCount}}</h2>
        </b-card-text>
      </b-card>
    </b-card-group>
    <BarStatus class="w-25 mt-3"></BarStatus>
  </b-jumbotron>
</template>

<script>
import BarStatus from "./BarStatus";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: { BarStatus},
  methods: {
    ...mapActions("robots", {
      getAllRobots: "getAll"
    }),
    ...mapActions("missions", {
      getAllMissions: "getAll"
    }),
    ...mapActions("users", {
      getAllUsers: "getAll"
    })
  },
  mounted() {
    this.getAllRobots();
    this.getAllMissions();
    this.getAllUsers();
  },
  computed: {
    ...mapState({
      usersCount: state => {
        return (state.users.all.items || { length: "" }).length;
      },
      robotsCount: state => {
        return (state.robots.all.items || { length: "" }).length;
      },
      missionsCount: state => {
        return (state.missions.all.missionsList || { length: "" }).length;
      }
    })
  }
};
</script>

<style scoped>
</style>