<template>
    <div  class="m-combobox">
        <input v-model="this.optionSelected" @mousedown="this.isShowDrop = false" type="text" :placeholder="placeholder">
        <div @click="showDrop" class="button">
            <div class="arrow-icon" ></div>
        </div>
        <div class="m-combobox-data" :class="{'d-none' : isShowDrop}">
            <div 
            v-for="cate in filterCategories" 
            :key="cate.id" class="m-combobox-item"
            @click="setValueSelected(cate)"
            >{{cate.code}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props:["tag","placeholder" ],
    methods:{
        setValueSelected(option){
            this.optionSelected = option.code;
            this.isShowDrop = true;
            this.$emit("getComboSelected",option);
        },
        // show dropdown
        showDrop(){
            this.isShowDrop = !this.isShowDrop;
            this.optionSelected = "";
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
                    wearRate: 2.5,
                    yearsUse: 5,
                },
                {
                    id: 2,
                    code: "PC",
                    name: "Máy tính để bàn",
                    wearRate: 1.7,
                    yearsUse: 10,
                }
            ]
        }
    },

}
</script>

<style>

</style>