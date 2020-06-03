<template>
  <div id="app-container">
    <b-modal
      :headerTextVariant="headerTextVariant"
      v-model="alert.isVisible"
      :header-bg-variant="headerBgVariant(alert.type)"
      ok-only
    >
      <template v-slot:modal-title>{{ headerTitle(alert.type) }}</template>
      {{ alert.message }}
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            id="test_btn_ok"
            class="float-right w-100"
            @click="alert.isVisible=false"
          >Ok</b-button>
        </div>
      </template>
    </b-modal>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "app",
  data() {
    return {
      headerBgVariant: function(type) {
        return type !== "alert-danger" ? "success" : "danger";
      },
      headerTitle: function(type) {
        return type !== "alert-danger" ? "Successfully registered" : "Error";
      },
      headerTextVariant: "light"
    };
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  },
  watch: {
    $route() {
      // clear alert on location change
      this.clearAlert();
    }
  }
};
</script>

<style>
</style>