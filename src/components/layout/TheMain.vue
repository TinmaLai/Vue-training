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
    import TheNavbar from '../layout/TheNavbar.vue';
    import TheHeader from '../layout/TheHeader.vue';
    import TheManageTable from '../layout/TheManageTable.vue';

export default {
    components:{
        TheNavbar,
        TheHeader,
        TheManageTable
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

</style>