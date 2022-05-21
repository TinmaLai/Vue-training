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
        :autofill="true"
        @blur="checkNullValue"
        @focus="showPopup()"
         ></ejs-combobox>
    </div>
</template>

<script>
import { ComboBoxComponent } from "@syncfusion/ej2-vue-dropdowns";
import axios from "axios";

export default {
    props:["tag","placeholder","control","fieldName","flag","isFilter"],
    components:{
        'ejs-combobox' : ComboBoxComponent,
    },
    async mounted(){
        var me = this;
        
        if(this.tag == "DepartmentCode"){
            if(this.flag == "filter") this.content = 'bophansudung';
            await axios.get("https://localhost:7062/api/v1/Departments").then(function(res){
                if(me.flag != "filter") me.dataFields = {value: 'DepartmentId',text:'DepartmentCode'};
                else me.dataFields =  {value: 'DepartmentId',text:'DepartmentName'};
                me.categoriesPart = res.data;
                if(me.flag == "filter") me.categoriesPart.unshift({'DepartmentId': 'bophansudung' , 'DepartmentName': 'Bộ phận sử dụng'});
                console.log(res);
            }).catch(function(err){
                console.log(err);
            })
        }
        else if(this.tag == "FixedAssetCategoryCode"){
            if(this.flag == "filter") this.content = 'loaitaisan';
            await axios.get("https://localhost:7062/api/v1/FixedAssetCategories").then(function(res){
                if(me.flag != "filter") me.dataFields = {value: 'FixedAssetCategoryId',text:'FixedAssetCategoryCode'};
                else me.dataFields = {value: 'FixedAssetCategoryId',text:'FixedAssetCategoryName'};
                me.categoriesAsset = res.data;
                if(me.flag == "filter") me.categoriesAsset.unshift({'FixedAssetCategoryId': 'loaitaisan' , 'FixedAssetCategoryName': 'Loại tài sản'});
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
            // if(this.tag == "Department"){
            //     this.content = e.itemData.DepartmentCode;
            // } else if(this.tag == "FixedAssetCategory"){
            //     this.content = e.itemData.FixedAssetCategoryCode;
            // }
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
                if(this.itemSelected == null || this.itemSelected.item == null || this.content == ""){
                    this.isAlert = true;
                } else {
                    this.isAlert = false;
                }
            } else if(this.flag == "filter"){
                // TODO: Set giá trị về mặc định cho combobox khi để trống và blur ra ngoài nhưng vẫn chưa đc
                if(this.itemSelected == null || this.itemSelected.item == null){
                    if(this.tag == 'FixedAssetCategoryCode'){
                        this.content = "Loại tài sản"; 
                    } else if(this.tag == 'DepartmentCode'){
                        this.content = "Bộ phận sử dụng";
                    }
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
