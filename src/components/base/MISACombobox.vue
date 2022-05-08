<template>
    <div class="m-combobox" :class="{'danger':isAlert}">
        <ejs-combobox 
        v-model='content'
        :text='content'
        id='combobox' 
        :dataSource='this.filterCategories' 
        :fields="dataFields" 
        allowFiltering='true' 
        @select="setValueSelected" 
        :allowCustom="allowCustom"
        :placeholder="placeholder"
        @blur="checkNullValue"
        
         ></ejs-combobox>
    </div>
</template>

<script>
import { ComboBoxComponent } from "@syncfusion/ej2-vue-dropdowns";

export default {
    props:["tag","placeholder","control","fieldName"],
    components:{
        'ejs-combobox' : ComboBoxComponent,
    },
    watch:{
        control: function(newValue){
            this.content = newValue;
        }
    },
    methods:{
        // emit gia tri len cho form
        setValueSelected(e){
            console.log(e);
            this.itemSelected = e;
            this.content = e.itemData.code;
            this.$emit("getComboSelected",e);
        },
        // show dropdown
        showDrop(){
            this.isShowDrop = !this.isShowDrop;
            this.optionSelected = "";
        },
        // check Null khi blur
        checkNullValue(){
            if(this.itemSelected == null || this.itemSelected.item == null){
                this.isAlert = true;
            } else {
                this.isAlert = false;
            }
        }
    },  
    computed: {
        filterCategories(){
            var categories = [];
            if(this.tag == "part"){
                categories = this.categoriesPart;
            } else if(this.tag == "asset"){
                categories = this.categoriesAsset
            }
            return categories;
        }
    },
    data() {
        return {
            value: null,
            isShowDrop: true,
            optionSelected: null,
            isAlert: false,
            itemSelected: null,
            dataFields: {value: 'id',text:'code'},
            content: "",
            allowCustom: false,
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
                    depreciationRate: 2.5,
                    lifeTime: 5,
                },
                {
                    id: 2,
                    code: "PC",
                    name: "Máy tính để bàn",
                    depreciationRate: 1.7,
                    lifeTime: 10,
                }
            ]
        }
    },

}
</script>
