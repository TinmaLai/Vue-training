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
        /**
        * Mô tả: Thu đóng menu left
        * @param
        * @return
        * Created by: nbtin
        * Created date: 10:37 02/06/2022
        */
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