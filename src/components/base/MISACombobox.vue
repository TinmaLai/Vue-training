<template>
    <div class="m-combobox">
        <input @keypress="showDrop" v-model="optionSelected" type="text" :placeholder="placeholder">
        <div @click="showDrop" class="button">
            <div class="arrow-icon" ></div>
        </div>
        <div class="m-combobox-data" :class="{'d-none' : isShowDrop}">
            <div 
            v-for="cate in filterCategories" 
            :key="cate.id" class="m-combobox-item"
            @click="setValueSelected(cate.code,cate.name)"
            
            >{{cate.code}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props:["tag","placeholder" ],
    methods:{
        setValueSelected(optionCode, optionName){
            this.optionSelected = optionCode;
            this.isShowDrop = true;
            this.$emit("getComboSelected",optionName);
        },
        // show dropdown
        showDrop(){
            this.isShowDrop = !this.isShowDrop;
            // this.optionSelected = "";
        }
    },
    computed: {
        filterCategories(){
            var categories = null;
            if(this.tag == "part"){
                categories = this.categoriesPart;
            } else if(this.tag == "asset"){
                categories = this.categoriesAsset;
            }
            
            var search = this.optionSelected;
            if(this.optionSelected == null){
                return categories;
            }
            return categories.filter((cate) => {
                return cate.code.toLowerCase().includes(search.toLowerCase()) == true;
            }) ;
        }
    },
    data() {
        return {
            isShowDrop: true,
            optionSelected: null,
            categoriesPart: [
                {
                    id: 1,
                    code: "HCKT",
                    name: "Hành chính kế toán",
                },
                {
                    id: 2,
                    code: "TK",
                    name: "Thư ký",
                },
                {
                    id: 3,
                    code: "TCTH",
                    name: "Tài chính tổng hợp",
                }
            ],
            categoriesAsset: [
                {
                    id: 1,
                    code: "MTXT",
                    name: "Máy tính xách tay",
                },
                {
                    id: 2,
                    code: "PC",
                    name: "Máy tính để bàn",
                }
            ]
        }
    },

}
</script>

<style>

</style>