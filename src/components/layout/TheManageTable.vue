<template>
    <div class="staff-manage">
        <div class="loading-table" v-if="isLoading"></div>
        <div class="top-row"  v-if="!isLoading">
            <div class="filter">
                <div class="m-field-input-icon">
                    <div class="btn-icon">
                        <div class="search-icon"></div>
                    </div>
                    <input ref="searchContent" @input="filterFixedAssets" placeholder="Tìm kiếm tài sản" type="text">
                </div>
                <div style="position: relative; height: 40px;">
                    <div class="m-dropdown-icon"></div>
                    <MISACombobox
                        class="m-dropdown"
                        placeholder="Loại tài sản"
                        ref="FilterFixedAssetCategory"
                        :flag="'filter'"
                        :tag="'FixedAssetCategoryCode'"
                        @getComboSelected="getFilterCategoryAsset"
                    />
                </div>
                <div style="position: relative; height: 40px;">
                    <div class="m-dropdown-icon"></div>
                    <MISACombobox
                        class="m-dropdown"
                        placeholder="Bộ phận sử dụng"
                        ref="FilterDepartment"
                        :flag="'filter'"
                        :tag="'DepartmentCode'"
                        @getComboSelected="getFilterDepartment"
                    />
                    
                </div>
            </div>
            <div class="table-action" >
                <button id="add-staff-btn" class="m-button" @click="toggleStaffDialog(true,1)">+Thêm tài sản</button>
                <button @click="showImportDialog" class="m-jicon-button"><div class="table-action-excel"></div></button>
                <button class="m-jicon-button" @click="popUpDelAlert" ><div class="table-action-del"></div></button>
            </div>
        </div>
        <EmployeeList 
        v-if="!isLoading"
        :assetAdd="assetAdd" 
        :fixedAssets="fixedAssets"
        @toggleStaffDialog="toggleStaffDialog" 
        @getAssetSelected="getAssetSelected"
        @getDelList="getDelList"
        :isTableLess="isTableLess"
        />
        <AddStaffForm 
        v-if="isShowDialog" 
        @closeStaffDialog="toggleStaffDialog" 
        :newAssetCode="newAssetCode" 
        :formMode="formMode"
        @getNewCodeIncre="getNewCodeIncre"
        :assetSelected="assetSelected"
        @getAsset="getAsset"
        @getStatusSave="handleStatusSave"
        /> 
        <DeleteAlert 
        :isShowAlert="isShowAlert"
        @getDelOption="handleDelOption"
        :delList="delList"
        />
        <ImportExcel
        :isShowAlert="isShowImportDialog"
        @selectOption="handleExcelOption"
        />
        <ToastMessage :isShowToast="isShowToast" :status="saveStatus" :message="messageToToast"/>
    </div>
</template>

<script>
import EmployeeList from "../../views/EmployeeList.vue";
import AddStaffForm from "../../views/AddStaffForm.vue";
import DeleteAlert from "../../views/DeleteAlertDialog.vue";
import ToastMessage from "../base/MISAToastMessage.vue";
import MISACombobox from "../base/MISACombobox.vue";
import ImportExcel from '../../views/ImportExcel.vue';
import messageResource from '../../resources/resource';

import axios from "axios";


export default {
    name: 'ManageTable',
    components:{
        EmployeeList,
        AddStaffForm,
        DeleteAlert,
        ToastMessage,
        MISACombobox,
        ImportExcel

    },
    async mounted(){
        // Bỏ blur đỏ của 2 ô filter
        /**
        * Mô tả : Call API đưa dữ liệu lên bản
        * Created by: nbtin
        * Created date: 13:44 22/04/2022
        */
        this.isLoading = true;
        var me = this;
        await axios.get("https://localhost:7062/api/v1/FixedAssets")
            .then(function(res){
                console.log(res);
                me.fixedAssets = res.data;
                me.cloneAPIFixedAssets = me.fixedAssets;
                // Lấy mã tự tăng
                var newCode = res.data[res.data.length - 1].AssetCode;
                me.newAssetCode = newCode;
                for(let i = 0; i < me.fixedAssets.length; i++){
                    if(me.fixedAssets[i].DepreciationPerYear == 0)
                        me.fixedAssets[i].DepreciationPerYear = Math.floor(me.fixedAssets[i].Cost * me.fixedAssets[i].DepreciationRate);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                me.fixedAssets = [];
                me.newAssetCode = 'TS0001';
            }).then(function(){
                me.isLoading = false;
            })
            
        
    },
    methods: {
        /**
        * Mô tả : Hiện bảng excel
        * @param
        * @return
        * Created by: nbtin
        * Created date: 23:32 20/05/2022
        */
        showImportDialog(){
            this.isShowImportDialog = true;
        },
        /**
        * Mô tả : Xử lý khi chọn option trong excel
        * @param
        * @return
        * Created by: nbtin
        * Created date: 00:18 21/05/2022
        */
        async handleExcelOption(option,file){
            if(option == 'true'){
                if(file != undefined){
                    console.log(file);
                    var formData = new FormData();
                    formData.append('formFile', file);
                    var me = this;
                    await axios.post('https://localhost:7062/api/v1/FixedAssets/import', 
                        formData,
                        {
                            headers:{
                                'Content-Type': 'multipart/form-data'
                            }
                    
                    }).then(function(res){
                        console.log(res);
                        me.handleStatusSave(true,res.data.length + " " + messageResource.SAVE_IMPORT_EXCEL_SUCCESS);
                        me.getAsset();
                    }).catch(function(err){
                        console.log(err.response);
                         me.handleStatusSave(false,messageResource.SAVE_IMPORT_EXCEL_FAILED);
                        me.getAsset();
                    });
                }
                this.isShowImportDialog = false;
            } else this.isShowImportDialog = false;
        },
        /**
        * Mô tả : Lấy loại tài sản từ chọn combobox filter
        * @param event: event khi đã chọn combobox
        * Created by: nbtin
        * Created date: 20:54 19/05/2022
        */
        getFilterCategoryAsset(e){
            this.filterFixedAssetCategory = e.itemData.FixedAssetCategoryName;
            this.filterFixedAssets();
        },
        /**
        * Mô tả : Lấy bộ phận sử dụng từ chọn combobox filter
        * @param event: event khi dã chọn combobox
        * Created by: nbtin
        * Created date: 20:56 19/05/2022
        */
        getFilterDepartment(e){
            this.filterDepartment = e.itemData.DepartmentName;
            this.filterFixedAssets();
        },
        //TODO: FILTER FIXEDASSET
        filterFixedAssets(){
            clearTimeout(this.timeOut);
            var me = this;
            
            this.timeOut = setTimeout(async () => {
                var searchInputValue = this.$refs.searchContent.value;

                var departmentContent = "", fixedAssetCategoryContent = "";

                if(me.filterDepartment == "Bộ phận sử dụng") departmentContent = "";
                else departmentContent = me.filterDepartment;

                if(me.filterFixedAssetCategory == "Loại tài sản") fixedAssetCategoryContent = "";
                else fixedAssetCategoryContent = me.filterFixedAssetCategory;

                var queryString = "?searchContent=" + searchInputValue + "&departmentName=" + departmentContent + "&fixedAssetCategoryName=" + fixedAssetCategoryContent; 
                
                await axios.get('https://localhost:7062/api/v1/FixedAssets/filter' + queryString).then(function(res){
                    console.log(res);
                    me.fixedAssets = res.data;

                }).catch(function(err){
                    console.log(err);
                })
            }, 1000);
        },
        // Đóng mở form thêm tài sản
        toggleStaffDialog(show,formMode){
            this.formMode = formMode;
            this.isShowDialog = show;
            if(show == false){
                // Reset form mode về ko thêm ko sửa (-1), reset asset đc chọn để nếu chọn lại thì còn có sự thay đổi
                this.formMode = -1;
                this.assetSelected = {
                    AssetName:'',
                    AssetCode: '',
                    Quantity: 1,
                    Cost: 0,
                    DepreciationRate: 0,
                    Lifetime: 0,
                    wearPerYear: null,
                    accumulate: null,
                    priceExtra: null,
                    AssetId: null,
                    PurchaseDate: new Date(),
                    ProductionYear: new Date(),
                    priceFormat: 0,
                    FixedAssetCategoryName: "",
                    DepartmentName: "",
                };
            }
        },
        // Lấy asset lại từ API
        async getAsset(){
            // this.fixedAssets.push(assetForm);
            
            // this.fixedAssets.push(assetForm);
            this.isLoading = true;
            var me = this;
            
            await axios.get("https://localhost:7062/api/v1/FixedAssets")
                .then(function(res){
                    me.fixedAssets = res.data;
                    me.cloneAPIFixedAssets = me.fixedAssets;
                    // Lấy mã tự tăng
                    var newCode = res.data[res.data.length - 1].assetId;
                    me.newAssetCode = newCode;
                    for(let i = 0; i < me.fixedAssets.length; i++){
                        if(me.fixedAssets[i].DepreciationPerYear == 0)
                            me.fixedAssets[i].DepreciationPerYear = Math.floor(me.fixedAssets[i].Cost * me.fixedAssets[i].DepreciationRate);
                        
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                }).then(function(){
                    
                    setTimeout(function(){me.isLoading = false;},300);
                })
            
        },
        // Lấy ra code sau khi tăng để gán cho lần mở form tiếp theo
        getNewCodeIncre(newCode){
            this.newAssetCode = newCode;
        },  
        // Lấy đổi tượng được double click ở bảng
        getAssetSelected(asset){
            this.assetSelected = asset;
        },
        // Xóa list item được check checkbox
        getDelList(delList){
            this.delList = delList;
    
        },
        // Hiện thông báo xóa hay không
        popUpDelAlert(){
            this.isShowAlert = true;
        },
        // Xử lý kết quả chọn xóa/không
        async handleDelOption(isDel){
            if(isDel == false){
                this.isShowAlert = false; 
            } else{
                var me = this;
                me.isShowAlert = false;
                await axios.delete(`https://localhost:7062/api/v1/FixedAssets/multiDelete`,{
                    data: JSON.stringify(me.delList),
                    headers: {
                        "content-type": "application/json",
                    },
                }).then(function(res){
                    console.log(res);
                    me.handleStatusSave(true, res.data + messageResource.DELETE_SUCCESS);
                    me.getAsset();
                    // console.log(me.delList);
                    
                }).catch(function(err){
                    console.log(err);
                    me.handleStatusSave(false,messageResource.DELETE_FAILED);
                })
                me.$emit("getAsset");
            }       
        },
        // Xử lý hiện toast message là thành công hay thất bại
        handleStatusSave(status,message){
            var me = this;
            this.messageToToast = message;
            if(status == true){
                this.isShowToast = true;
                this.saveStatus = true;
                setTimeout(function(){
                    me.isShowToast = false;
                },1500);
            } else if(status == false){
                this.isShowToast = true;
                this.saveStatus = false;
                setTimeout(function(){
                    me.isShowToast = false;
                },1500);
            }
        },
    },
    
    data() {
        return {
            timeOut: null,
            cloneAPIFixedAssets: [],
            filteredArrayFixedAssets: [],
            fixedAssets: [],
            isShowDialog: false, 
            assetAdd: {},
            newAssetCode: null,
            formMode: null,
            assetSelected: {},
            delList: [],
            isShowAlert: false,
            isShowToast: false,
            isTableLess: false,
            saveStatus: null,
            isLoading: false,
            filterFixedAssetCategory: "",
            filterDepartment: "",
            isShowImportDialog: false,
            messageToToast: ""
        }
    },
}
</script>

<style>

</style>