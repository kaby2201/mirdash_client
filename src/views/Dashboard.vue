<template>
  <div>
  <Navbar/>
    <b-container fluid="">
      <b-row>
        <b-col sm="3" class="m-lg-2">
          <Sidebar/>
        </b-col>
        <b-col sm="8">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import Navbar from "@/components/Navbar";
  import Sidebar from "@/components/Sidebar";

  export default {
    components: { Sidebar, Navbar}
  };
</script>
