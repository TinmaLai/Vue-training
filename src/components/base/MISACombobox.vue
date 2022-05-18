<template>
    <div class="m-combobox" :class="{'danger':isAlert}">
        <ejs-combobox 
        :text='this.content'
        v-model='content'
        
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
import axios from "axios";

export default {
    props:["tag","placeholder","control","fieldName"],
    components:{
        'ejs-combobox' : ComboBoxComponent,
    },
    async mounted(){
        var me = this;
        if(this.tag == "DepartmentCode"){
            await axios.get("https://localhost:7062/api/v1/Department").then(function(res){
                me.dataFields = {value: 'DepartmentId',text:'DepartmentCode'};
                me.categoriesPart = res.data;
                console.log(res);
            }).catch(function(err){
                console.log(err);
            })
        }
        else if(this.tag == "FixedAssetCategoryCode"){
            await axios.get("https://localhost:7062/api/v1/FixedAssetCategory").then(function(res){
                me.dataFields = {value: 'FixedAssetCategoryId',text:'FixedAssetCategoryCode'};
                me.categoriesAsset = res.data;
                console.log(res);
            }).catch(function(err){
                console.log(err);
            })
        }
        
        
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
            if(this.tag == "Department"){
                this.content = e.itemData.DepartmentCode;
            } else if(this.tag == "FixedAssetCategory"){
                this.content = e.itemData.FixedAssetCategoryCode;
            }
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
            dataFields: {},
            content: "",
            allowCustom: true,
            categoriesPart: [],
            categoriesAsset: []
        }
    },

}
</script>
