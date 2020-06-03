<template>
<div class="m-3">
    <b-button @click=ret>Return to previous page</b-button>
  <Licenses></Licenses>
  </div>
</template>

<script>
import Licenses from '../components/Licenses';

export default {
    name: 'About',
    components: {Licenses},
    methods: {
        ret: function() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>

</style>