<template>
      <bar-chart :chart-data="datacollection" :options="optionscollection"></bar-chart>
</template>

<script>
import BarChart from "./BarChart";
//import DistanceChart from "./DistanceChart";
import { mapActions, mapState } from "vuex";

const colorVal = () => {
    return Math.floor(Math.random()*256);
}
const generateColor = () =>
    `rgb(${colorVal()},${colorVal()},${colorVal()})`;

export default {
  name: "BarStatus",
  components: {
    BarChart
  },
  data() {
    return {
      optionscollection: {
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 10,
                max: 100
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    //this.fillData()
    this.getAllStatus();
  },
  methods: {
    ...mapActions("status", {
      getAllStatus: "getAll"
    })
  },
  computed: {
    ...mapState({
      statuses: state => state.status.all.items
    }),
    datacollection: function() {
      return {
        labels: ["Battery %"],
        datasets: (this.statuses || []).map(status => {
          return {
            label: status.robot_name,
            backgroundColor: generateColor(),
            data: [status.battery_percentage]
          };
        })
      };
    }
  }
};
</script>

<style scoped>
.small {
  max-width: 700px;
  height: 90px;
  margin: 100px auto;
}
</style>