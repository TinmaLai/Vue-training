<template>
    <ejs-combobox id='combobox' :dataSource='this.filterCategories' :fields="dataFields" allowFiltering='true' @change="setValueSelected" :allowCustom='allowCustom' :placeholder="placeholder" ></ejs-combobox>
</template>

<script>
import { ComboBoxComponent } from "@syncfusion/ej2-vue-dropdowns";

export default {
    props:["tag","placeholder" ],
    components:{
        'ejs-combobox' : ComboBoxComponent,
    },
    methods:{
        setValueSelected(e){
            console.log(e);
            this.$emit("getComboSelected",e);
        },
        // show dropdown
        showDrop(){
            this.isShowDrop = !this.isShowDrop;
            this.optionSelected = "";
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
            dataFields: {value: 'name',text:'code'},
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
