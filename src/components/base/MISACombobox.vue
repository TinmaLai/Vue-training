<template>
    <div class="m-combobox" :class="{'danger':isAlert}">
        <ejs-combobox 
        :text='this.content'
        v-model='content'
        ref="combobox"
        id='combobox' 
        :dataSource='this.filterCategories' 
        :fields="dataFields" 
        allowFiltering='true' 
        @select="setValueSelected" 
        :allowCustom="allowCustom"
        :placeholder="placeholder"
        @blur="checkNullValue"
        @focus="showPopup()"
         ></ejs-combobox>
    </div>
</template>

<script>
import { ComboBoxComponent } from "@syncfusion/ej2-vue-dropdowns";
import axios from "axios";

export default {
    props:["tag","placeholder","control","fieldName","flag"],
    components:{
        'ejs-combobox' : ComboBoxComponent,
    },
    async mounted(){
        var me = this;
        
        if(this.tag == "DepartmentCode"){
            if(this.flag == "filter") this.content = 'bophansudung';
            await axios.get("https://localhost:7062/api/v1/Departments").then(function(res){
                me.dataFields = {value: 'DepartmentId',text:'DepartmentCode'};
                me.categoriesPart = res.data;
                if(me.flag == "filter") me.categoriesPart.push({'DepartmentId': 'bophansudung' , 'DepartmentCode': 'Bộ phận sử dụng'});
                console.log(res);
            }).catch(function(err){
                console.log(err);
            })
        }
        else if(this.tag == "FixedAssetCategoryCode"){
            if(this.flag == "filter") this.content = 'loaitaisan';
            await axios.get("https://localhost:7062/api/v1/FixedAssetCategories").then(function(res){
                me.dataFields = {value: 'FixedAssetCategoryId',text:'FixedAssetCategoryCode'};
                me.categoriesAsset = res.data;
                if(me.flag == "filter") me.categoriesAsset.push({'FixedAssetCategoryId': 'loaitaisan' , 'FixedAssetCategoryCode': 'Loại tài sản'});
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
        // show popup combobox khi focus vao
        showPopup(){
            // this.content = "";
            this.$refs.combobox.showPopup();
        },
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
            if(this.flag != "filter"){
                if(this.itemSelected == null || this.itemSelected.item == null){
                    this.isAlert = true;
                } else {
                    this.isAlert = false;
                }
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
