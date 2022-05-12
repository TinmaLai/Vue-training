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
            if(this.tag == "DepartmentCode"){
                categories = this.categoriesPart;
            } else if(this.tag == "FixedAssetCategoryCode"){
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
                    DepreciationRate: 2.5,
                    LifeTime: 5,
                },
                {
                    id: 2,
                    code: "PC",
                    name: "Máy tính để bàn",
                    DepreciationRate: 1.7,
                    LifeTime: 10,
                }
            ]
        }
    },

}
</script>
