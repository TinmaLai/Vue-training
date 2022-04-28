<template>
  <div class="container">
    <TheNavbar :isMinimize="isMinimize" @toggleMinimize="toggleMinimize"/>
    <div class="content" :class="{'content-minimize' : isMinimize}">
        <TheHeader/>
        <TheManageTable/>
        
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheNavbar from "./components/layout/TheNavbar.vue";
import TheManageTable from "./components/layout/TheManageTable.vue";

export default {
  
  name: 'App',
  components: {
    TheHeader,
    TheNavbar,
    TheManageTable,
  },
  methods:{
    toggleMinimize(minimizeBool){
      console.log(minimizeBool);
      this.isMinimize = minimizeBool;
    }
  },
  data() {
    return {
      isMinimize: false,
    }
  },
}
</script>

<style>
  @import url(../src/css/mainDemo.css);
</style>
