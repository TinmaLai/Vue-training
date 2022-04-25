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
                <button class="m-jicon-button"><div class="table-action-del"></div></button>
            </div>
        </div>
        <EmployeeList 
        :assetAdd="assetAdd" 
        @getNewCode="getNewCode" 
        @toggleStaffDialog="toggleStaffDialog" 
        @getAssetSelected="getAssetSelected"
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



export default {
    name: 'ManageTable',
    components:{
        EmployeeList,
        AddStaffForm,

    },
    methods: {
        toggleStaffDialog(show,formMode){
            this.formMode = formMode;
            this.isShowDialog = show;
            if(show == false){
                this.formMode = -1;
            }
        },
        getAssetAdd(AssetAdd){
            console.log(AssetAdd);
        },
        getNewCodeIncre(newCode){
            this.newAssetCode = newCode;
        },  
        getAddAsset(assetForm){
            this.assetAdd = assetForm;
        },
        getNewCode(newCode){
            this.newAssetCode = newCode;
        },
        getAssetSelected(asset){
            this.assetSelected = asset;
        }
    },
    data() {
        return {
            isShowDialog: false, 
            assetAdd: {},
            newAssetCode: null,
            formMode: null,
            assetSelected: {}
        }
    },
}
</script>

<style>

</style>