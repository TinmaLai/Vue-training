<template>
   <div class="m-import-popup" :class="{'d-flex' : isShowAlert}">
        <div class="row header">
            <h2>Nhập dữ liệu từ Excel</h2>
        </div>
        <div class="row content">
            <label for="myfile">Chọn tệp:</label>
            <input ref="chooseFile"  type="file" id="myfile" name="myfile"><br><br>
        </div>
        <div class="row popup-action" :class="{'d-flex': true}">
            <div class="m-button" @click="selectOption('true')">Đồng ý</div>
            <div class="m-second-button" @click="selectOption('false')">Đóng</div>
        </div>
    </div>
</template>

<script>
export default {
    props:["isShowAlert","message"],
    methods:{
        selectOption(optionSelected){
            var file = this.$refs.chooseFile.files[0];
            // console.log(file);
            this.$emit("selectOption",optionSelected,file);
        }
    }
}
</script>

<style>

</style>