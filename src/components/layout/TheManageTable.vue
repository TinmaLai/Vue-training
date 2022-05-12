<template>
    <div class="staff-manage">
        <div class="loading-table" v-if="isLoading"></div>
        <div class="top-row"  v-if="!isLoading">
            <div class="filter">
                <div class="m-field-input-icon">
                    <div class="btn-icon">
                        <div class="search-icon"></div>
                    </div>
                    <input placeholder="Tìm kiếm tài sản" type="text">
                </div>
                <button class="m-dropdown">
                    <div class="m-dropdown-icon"></div>
                    <p class="m-dropdown-suggest-icon">Loại tài sản</p>
                    <div class="arrow-down"></div>
                    <div class="m-dropdown-data d-none">
                        <div class="m-dropdown-item">Trang thai 1</div>
                        <div class="m-dropdown-item">Trang thai 2</div>
                        <div class="m-dropdown-item">Trang thai 3</div>
                        <div class="m-dropdown-item m-dropdown-selected">Trang thai 4</div>
                    </div>
                </button>
                <button class="m-dropdown">
                    <div class="m-dropdown-icon"></div>
                    <p class="m-dropdown-suggest-icon" >Bộ phận sử dụng</p>
                    <div class="arrow-down"></div>
                    <div class="m-dropdown-data d-none">
                        <div class="m-dropdown-item">Trang thai 1</div>
                        <div class="m-dropdown-item">Trang thai 2</div>
                        <div class="m-dropdown-item">Trang thai 3</div>
                        <div class="m-dropdown-item m-dropdown-selected">Trang thai 4</div>
                    </div>
                </button>
            </div>
            <div class="table-action" >
                <button id="add-staff-btn" class="m-button" @click="toggleStaffDialog(true,1)">+Thêm tài sản</button>
                <button class="m-jicon-button"><div class="table-action-excel"></div></button>
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
        <ToastMessage :isShowToast="isShowToast" :status="saveStatus"/>
    </div>
</template>

<script>
import EmployeeList from "../../views/EmployeeList.vue";
import AddStaffForm from "../../views/AddStaffForm.vue";
import DeleteAlert from "../../views/DeleteAlertDialog.vue";
import ToastMessage from "../base/MISAToastMessage.vue";

import axios from "axios";


export default {
    name: 'ManageTable',
    components:{
        EmployeeList,
        AddStaffForm,
        DeleteAlert,
        ToastMessage

    },
    async mounted(){
        /**
        * Mô tả : Call API đưa dữ liệu lên bản
        * Created by: nbtin
        * Created date: 13:44 22/04/2022
        */
        this.isLoading = true;
        var me = this;
        await axios.get("https://localhost:7062/api/v1/FixedAsset")
            .then(function(res){
                console.log(res);
                me.fixedAssets = res.data;
                // Lấy mã tự tăng
                var newCode = res.data[res.data.length - 1].AssetCode;
                me.newAssetCode = newCode;
                
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
    watch:{
    },
    methods: {
        // Đóng mở form thêm tài sản
        toggleStaffDialog(show,formMode){
            this.formMode = formMode;
            this.isShowDialog = show;
            if(show == false){
                // Reset form mode về ko thêm ko sửa (-1), reset asset đc chọn để nếu chọn lại thì còn có sự thay đổi
                this.formMode = -1;
                this.assetSelected = {
                    AssetName:'',
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
                    codePart: "",
                    codeAsset: "",
                };
            }
        },
        // Lấy asset lại từ API
        async getAsset(){
            // this.fixedAssets.push(assetForm);
            
            // this.fixedAssets.push(assetForm);
            this.isLoading = true;
            var me = this;
            
            await axios.get("https://localhost:7062/api/v1/FixedAsset")
                .then(function(res){
                    me.fixedAssets = res.data;
                    // Lấy mã tự tăng
                    var newCode = res.data[res.data.length - 1].assetId;
                    me.newAssetCode = newCode;
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
                for(let i = 0; i < me.delList.length; i++){
                    await axios.delete(`https://localhost:7062/api/v1/FixedAsset/`+me.delList[i])
                     .then(function(res){
                        console.log(res);
                        // Xóa các phần tử bị xóa ở mảng fixedAssets đổ lên bảng
                        
                        me.fixedAssets = me.fixedAssets.filter(function(el){
                            return !me.delList.includes(el.id);
                        })
                        me.delList.splice(i,1); 
                        i--;
                        // console.log(me.delList);
                        
                    }).catch(function(err){
                        console.log(err);
                    })
                   
                }
                me.$emit("getAsset");
            }       
        },
        // Xử lý hiện toast message là thành công hay thất bại
        handleStatusSave(status){
            var me = this;
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
        }
    },
}
</script>

<style>

</style>