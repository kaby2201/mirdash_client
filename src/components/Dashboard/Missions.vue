<template>
  <b-jumbotron class="mt-4">
    <b-row>
      <b-dropdown id="dropdown-1" text="Select robot" class="m-md-2 w-100">
        <b-dropdown-item
          class="w-100"
          v-for="robot in robots.all.items"
          :key="robot.id"
          @click="select(robot)"
        >{{robot.hostname}}</b-dropdown-item>
      </b-dropdown>
    </b-row>

    <b-card-group deck v-if="currentRobot">
      <b-card no-body>
        <template v-slot:header>
          <h4 class="text-center">
            <b-icon-clipboard-data class="float-left"/>
            Missions on {{currentRobot.hostname}}
            <b-badge
                    :variant="currentRobotState === 'Offline' ? 'danger' : currentRobotState === 'Ready' ? 'success' : 'warning'"
                    class="float-right d-inline"
            >{{currentRobotState || 'Unknown'}}
            </b-badge>
          </h4>
        </template>
        <b-button variant="success" class="w-100"
                  @click="unpauseHandler"
                  v-if="currentRobot.state_text!='Offline'">
          Resume
        </b-button>
        <b-button variant="warning" class="w-100 my-2"
                  @click="pauseHandler"
                  v-if="currentRobot.state_text!='Offline'">
          Pause
        </b-button>
        <b-list-group flush v-for="m in missions.all.missionsList" :key="m.id">
          <b-list-group-item v-if="m.robotId === currentRobot.id">
            {{m.name}}
            <b-button
                    variant="primary"
                    class="float-right"
                    @click="addToQueue(m)"
                    v-if="currentRobot.isOnline"
            >Add +
            </b-button>
          </b-list-group-item>
        </b-list-group>
      </b-card>

      <b-card no-body v-cloak>
        <template v-slot:header>
          <h3 class="text-center">Queue</h3>
        </template>
        <div id="queue-list">
          <b-list-group flush v-for="q in missionQueue.all.missionQueue" :key="q.id" v-cloak>
            <b-list-group-item variant="primary" v-if="q.state === 'Done'">
              {{q.url}}
              <b-badge class="badge-dark float-right" title="State">
                {{q.state}}
                <b-icon-check-all />
              </b-badge>
            </b-list-group-item>

            <b-list-group-item variant="success" v-if="q.state === 'Running'">
              {{q.url}}
              <b-badge class="badge-info float-right" title="State">{{q.state}} ..</b-badge>
              <b-spinner variant="success" class="float-left" type="grow" label="Spinning" />
            </b-list-group-item>

            <b-list-group-item variant="warning" v-if="q.state === 'Pending'">
              {{q.url}}
              <b-badge class="badge-primary float-right" title="State">{{q.state}} ..</b-badge>
              <b-spinner variant="success" class="float-left" label="Spinning" />
            </b-list-group-item>

            <b-list-group-item variant="danger" v-if="q.state === 'Aborted'">
              {{q.url}}
              <b-badge class="badge-info float-right" title="State">{{q.state}} ..</b-badge>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-card>
    </b-card-group>
  </b-jumbotron>
</template>

<script>
  import {mapActions, mapState} from "vuex";

  export default {
    name: "Missions",
    data() {
      return {
        currentRobot: null,
        polling: null,
        pollingAll: null,
        addRequestBody: {
          mission_id: null,
          name: "",
          guid: "",
          description: ""
        }
      };
    },
    created() {
      this.getAllMissions();
      this.getAllRobots();
      this.pollData();
    },
    methods: {
      ...mapActions("missions", {
        getAllMissions: "getAll"
      }),
      ...mapActions("missionQueue", {
        getMissionQueue: "getMissionQueue",
        addMissionToQueue: "addMissionToQueue"
      }),
      ...mapActions("robots", {
        getAllRobots: "getAll"
      }),
    ...mapActions("status", {
      sendState: "sendState"
    }),
    pollData() {
      this.polling = setInterval(() => {
        if (this.currentRobot) {
          this.getMissionQueue(this.currentRobot.id);
        }
      }, 1000);
      this.pollingAll = setInterval(() => {
          this.getAllRobots();
      }, 1000);
    },
    select(robot) {
      this.currentRobot = robot;
      this.getMissionQueue(robot.id);
    },
    addToQueue(mission) {
      this.fillInRequestBody(mission);
      this.addMissionToQueue({
        mission: this.addRequestBody,
        id: this.currentRobot.id
      });
    },
    fillInRequestBody(mission) {
      this.addRequestBody.mission_id = mission.id;
      this.addRequestBody.guid = mission.guide;
      this.addRequestBody.name = mission.name;
      this.addRequestBody.description = "A mission is a Mission";
    },
    unpauseHandler() {
      this.sendState({ robotId: this.currentRobot.id, state_id: 3 });
    },
    pauseHandler() {
      this.sendState({ robotId: this.currentRobot.id, state_id: 4 });
    }
  },
  computed: {
    ...mapState({
      missions: state => state.missions,
      missionQueue: state => state.missionQueue,
      robots: state => state.robots,
      currentRobotState: function(state) {
          const r = state.robots.all.items.find(r => r.id === this.currentRobot.id);
          return typeof r === 'undefined' ? 'Offline' : r.state_text;
      }
    })
  },
  beforeDestroy() {
    clearInterval(this.polling);
    clearInterval(this.pollingAll);
  }
};
</script>
<style scoped>
.badge {
  font-size: 14px;
}

.list-group {
  margin-top: 0;
}

#queue-list {
  max-height: 940px;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 0;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(54, 56, 58);
}
</style>