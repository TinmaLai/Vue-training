<template>
    <div class="m-combobox" :class="{'danger':isAlert}">
        <ejs-combobox 
        :text='content'
        v-model='content'
        ref="comboboxFocus"
        id='combobox' 
        :dataSource='filterCategories' 
        :fields="dataFields" 
        allowFiltering='true' 
        @select="setValueSelected" 
        :allowCustom="allowCustom"
        :placeholder="placeholder"
        :autofill="true"
        :showClearButton="false"
        @blur="checkNullValue"
        @input="getChange"
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
        /**
        * Mô tả: Kiểm tra xem combobox thuôc loại gì qua tag (dropdown cho phân trang, hay cho form hay filter)
        * @param
        * @return
        * Created by: nbtin
        * Created date: 22:56 23/05/2022
        */
        if (this.tag == "DropdownPagination"){
            // Để giá trị mặc định
            this.content = '15';
            this.categoriesPagination = [
                {
                    'id': '1',
                    'pageSize': '15'
                },
                {
                    'id': '2',
                    'pageSize': '20'
                },
                {
                    'id': '3',
                    'pageSize': '30'
                },
                {
                    'id': '4',
                    'pageSize': '40'
                }];
            this.dataFields = {value: 'id', text:'pageSize'}
        }else if(this.tag == "DepartmentCode"){
            // Nếu tag là filter thì nó là combobox sử dụng cho phần filter
            if(this.flag == "filter") this.content = 'Bộ phận sử dụng';
            // Gọi api lấy danh sách các bộ phận sử dụng bind vào combobox
            await axios.get("http://localhost:5062/api/v1/Departments").then(function(res){
                // Gắn datafields cho combobox theo id, value
                if(me.flag != "filter") me.dataFields = {value: 'DepartmentId',text:'DepartmentCode'};
                else me.dataFields =  {value: 'DepartmentId',text:'DepartmentName'};
                me.categoriesPart = res.data;
                // nếu là combobox sử dụng cho filter thì thêm 1 item mặc định tên là "bộ phận sử dụng"
                if(me.flag == "filter") me.categoriesPart.unshift({'DepartmentId': 'bophansudung' , 'DepartmentName': 'Bộ phận sử dụng'});
                
            }).catch(function(err){
                // Xử lý lỗi khi call API nếu có
                console.log(err);
            })
        }else if(this.tag == "FixedAssetCategoryCode"){
            // Nếu tag là filter thì nó là combobox sử dụng cho phần filter
            if(this.flag == "filter") this.content = 'Loại tài sản';
            // Gọi api lấy danh sách các loại tài sản bind vào combobox
            await axios.get("http://localhost:5062/api/v1/FixedAssetCategories").then(function(res){
                // Gắn datafields cho combobox theo id, value
                if(me.flag != "filter") me.dataFields = {value: 'FixedAssetCategoryId',text:'FixedAssetCategoryCode'};
                else me.dataFields = {value: 'FixedAssetCategoryId',text:'FixedAssetCategoryName'};
                me.categoriesAsset = res.data;
                // nếu là combobox sử dụng cho filter thì thêm 1 item mặc định tên là "Loại tài sản"
                if(me.flag == "filter") me.categoriesAsset.unshift({'FixedAssetCategoryId': 'loaitaisan' , 'FixedAssetCategoryName': 'Loại tài sản'});
               
            }).catch(function(err){
                // Xử lý lỗi nếu có
                console.log(err);
            })
        }
        
        
    },
    watch:{
        control: function(newValue){
            this.content = newValue;
        },
    },
    methods:{
        /**
        * Mô tả: Quan sát giá trị của combobox
        * @param
        * @return
        * Created by: nbtin
        * Created date: 22:56 30/05/2022
        */
        getChange(event){
            console.log(event.item);
            if(event.itemData == null){
                this.$emit("getComboSelected","");
            }
        },
        /**
        * Mô tả: Set focus cho ô combobox
        * @param
        * @return
        * Created by: nbtin
        * Created date: 15:51 30/05/2022
        */
        setFocus(){
            this.$refs.comboboxFocus.$el.focus();
        },
        /**
        * Mô tả: Emit lên item được chọn từ combobox
        * @param e: sự kiện click item
        * @return
        * Created by: nbtin
        * Created date: 23:08 23/05/2022
        */
        setValueSelected(e){
            this.itemSelected = e;
            this.$emit("getComboSelected",e);
        },
        /**
        * Mô tả: Check rỗng cho combobox khi được click ra ngoài
        * @param
        * @return
        * Created by: nbtin
        * Created date: 23:10 23/05/2022
        */
        checkNullValue(){
            // Nếu combobox là dùng cho filter thì không cần check rỗng
            if(this.flag != "filter" && this.tag != "DropdownPagination"){
                if((this.itemSelected == null || this.itemSelected.item == null) && this.content == ""){
                    this.isAlert = true;
                } else {
                    this.isAlert = false;
                }
            } 
            // else if(this.flag == "filter"){
            //     // Nếu item được chọn là null thì sẽ tính là rỗng
            //     if(this.itemSelected == null || this.itemSelected.item == null){
            //         if(this.tag == 'FixedAssetCategoryCode'){
            //             this.content = "Loại tài sản"; 
            //         } else if(this.tag == 'DepartmentCode'){
            //             this.content = "Bộ phận sử dụng";
            //         }
            //     } else {
            //         this.isAlert = false;
            //     }
            // }
        }
    }, 
    computed: {
        /**
        * Mô tả: Computed chung dùng để lựa chọn ra mảng giá trị dành cho combobox, tùy theo prop tag đc gán vào
        * @return categories: Mảng giá trị
        * Created by: nbtin
        * Created date: 23:12 23/05/2022
        */
        filterCategories(){
            var categories = [];
            if(this.tag == "DropdownPagination"){
                return this.categoriesPagination;
            }else if(this.tag == "DepartmentCode"){
                return this.categoriesPart;
            }else if(this.tag == "FixedAssetCategoryCode"){
                return this.categoriesAsset;
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
            categoriesAsset: [],
            categoriesPagination: [],
            totalPages: 0,
        }
    },

}
</script>
