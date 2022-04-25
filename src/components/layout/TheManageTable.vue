<template>
    <div class="staff-manage">
        <div class="top-row">
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
            <div class="table-action">
                <button id="add-staff-btn" class="m-button" @click="toggleStaffDialog(true,1)"  >+Thêm tài sản</button>
                <button class="m-jicon-button"><div class="table-action-excel"></div></button>
                <button class="m-jicon-button" @click="deleteList" ><div class="table-action-del"></div></button>
            </div>
        </div>
        <EmployeeList 
        :assetAdd="assetAdd" 
        @getNewCode="getNewCode" 
        @toggleStaffDialog="toggleStaffDialog" 
        @getAssetSelected="getAssetSelected"
        @getDelList="getDelList"
        />
        <AddStaffForm 
        :isShow="isShowDialog" 
        @closeStaffDialog="toggleStaffDialog" 
        :newAssetCode="newAssetCode" 
        :formMode="formMode"
        @getNewCodeIncre="getNewCodeIncre"
        :assetSelected="assetSelected"
        @getAssetAdd="getAssetAdd"
        /> 
    </div>
</template>

<script>
import EmployeeList from "../../views/EmployeeList.vue";
import AddStaffForm from "../../views/AddStaffForm.vue";
import axios from "axios";


export default {
    name: 'ManageTable',
    components:{
        EmployeeList,
        AddStaffForm,

    },
    methods: {
        // Đóng mở form thêm tài sản
        toggleStaffDialog(show,formMode){
            this.formMode = formMode;
            this.isShowDialog = show;
            if(show == false){
                this.formMode = -1;
            }
        },
        // Lấy ra code sau khi tăng để gán cho lần mở form tiếp theo
        getNewCodeIncre(newCode){
            this.newAssetCode = newCode;
        },  
        // getAddAsset(assetForm){
        //     this.assetAdd = assetForm;
        // },
        getNewCode(newCode){
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
        deleteList(){
            try{
                axios.delete(`https://62591883c5f02d964a4c41d3.mockapi.io/assets/`+this.delList[0]).then(function(res){
                    console.log(res);
                })
            } catch(error){
                console.log(error);
            }
        }
    },
    data() {
        return {
            isShowDialog: false, 
            assetAdd: {},
            newAssetCode: null,
            formMode: null,
            assetSelected: {},
            delList: [],
        }
    },
}
</script>

<style>

</style>