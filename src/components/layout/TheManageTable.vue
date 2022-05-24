<template>
    <div class="staff-manage">
        <div class="top-row" >
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
                <button 
                id="add-staff-btn" 
                class="m-button" 
                @click="toggleStaffDialog(true,1)"
                v-shortkey="['ctrl','alt','f']" @shortkey="toggleStaffDialog(true,1)"
                >+Thêm tài sản</button>
                <button @click="showImportDialog" class="m-jicon-button"><div class="table-action-excel"></div></button>
                <button class="m-jicon-button" @click="popUpDelAlert" ><div class="table-action-del"></div></button>
            </div>
        </div>
        <EmployeeList 
        @getPageSize="getPageSize"
        @getPageNumber="searchWithPageNumber"
        :assetAdd="assetAdd" 
        :fixedAssets="fixedAssets"
        @toggleStaffDialog="toggleStaffDialog" 
        @getAssetSelected="getAssetSelected"
        @getDelList="getDelList"
        @getDelFlag="getDelFlag"
        :isTableLess="isTableLess"
        :isLoading="this.isLoading"
        :delFlag="this.delFlag"
        :totalRecord="this.totalRecord"
        :pageNumberCurrent="this.pageNumber"
        @getAsset="getAsset"
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
        v-shortkey="['esc']" @shortkey="toggleStaffDialog(false, 1)"
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
        <ToastMessage 
        :isShowToast="isShowToast" 
        :status="saveStatus" 
        :message="messageToToast"/>
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
        /**
        * Mô tả : Call API đưa dữ liệu lên bản
        * Created by: nbtin
        * Created date: 13:44 22/04/2022
        */
        // Hiện giao diện loading khi bắt đầu call API
        this.isLoading = true;
        var me = this;
        // Gọi hàm search với giá trị pageSize, pageNumber mặc định (10,1)
        me.searchAsset();
        me.getAllAssets();
            
        
    },
    methods: {
        async getAllAssets(){
            var me = this;
            await axios.get("https://localhost:7062/api/v1/FixedAssets")
            .then(function(res){
                console.log(res);
                // Call get toàn bộ danh sách tài sản để lấy tổng số bản ghi (totalRecord)
                me.totalRecord = res.data.length;
                // Tính giá trị hao mòn năm cho từng item trong mảng fixedAssets, phục vụ cho tính tổng ở footer
                for(let i = 0; i < me.fixedAssets.length; i++){
                    if(me.fixedAssets[i].DepreciationPerYear == 0)
                        me.fixedAssets[i].DepreciationPerYear = Math.floor(me.fixedAssets[i].Cost * me.fixedAssets[i].DepreciationRate);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            }).then(function(){
                // Dù call thất bại hay thành công cũng tắt loading đi
                me.isLoading = false;
            })
        },
        /**
        * Mô tả: Cập nhật lại mảng danh sách id cần xóa sau khi xóa, dùng flag = false từ component con
        * @param
        * @return
        * Created by: nbtin
        * Created date: 21:13 23/05/2022
        */
        getDelFlag(){
            this.delFlag = false;
        },
        /**
        * Mô tả : Lấy số bản ghi trong một trang đc emit lên từ combobox ở component con
        * @param
        * @return
        * Created by: nbtin
        * Created date: 12:00 22/05/2022
        */
        getPageSize(pageSize){
            this.pageSize = pageSize;
            // Đưa về trang đầu tiên khi thay đổi pageSize
            this.pageNumber = 1;
            this.searchAsset();
        },
        /**
        * Mô tả : Tìm kiếm với pageNumber được emit lên từ component con pagination 
        * @param
        * @return
        * Created by: nbtin
        * Created date: 00:17 22/05/2022
        */
        searchWithPageNumber(pageNumber){
            // this.filterFixedAssets();
            this.pageNumber = pageNumber;
            this.searchAsset();
        },
        /**
        * Mô tả : Hiện lên dialog chọn file import excel
        * @param
        * @return
        * Created by: nbtin
        * Created date: 23:32 20/05/2022
        */
        showImportDialog(){
            this.isShowImportDialog = true;
        },
        /**
        * Mô tả : Xử lý khi chọn option đồng ý/ hủy bỏ trong excel import file dialog
        * @param
        * @return
        * Created by: nbtin
        * Created date: 00:18 21/05/2022
        */
        async handleExcelOption(option,file){
            // Nếu chọn đồng ý, tiến hành đọc file, post lên api
            if(option == 'true'){
                this.isShowImportDialog = false;
                if(file != undefined){
                    console.log(file);
                    // Kiểu đối tượng FormData giúp chứa file
                    var formData = new FormData();
                    formData.append('formFile', file);
                    var me = this;
                    me.isLoading = true;
                    await axios.post('https://localhost:7062/api/v1/FixedAssets/import', 
                        formData,
                        {
                            headers:{
                                'Content-Type': 'multipart/form-data'
                            }
                    
                    }).then(function(res){
                        console.log(res);
                        // Nếu import thành công, hiện thông báo thành Công
                        me.handleStatusSave(true,res.data.length + " " + messageResource.SAVE_IMPORT_EXCEL_SUCCESS);
                        // Load lại bảng
                        me.getAsset();
                    }).catch(function(err){
                        console.log(err.response);
                        // Nếu import thất bại, hiện thông báo thất bại
                        me.handleStatusSave(false,messageResource.SAVE_IMPORT_EXCEL_FAILED);
                        // Load lại bảng
                        me.getAsset();
                    }).then(function(){
                        me.isLoading = false;
                    });
                }
                // Tắt diglog sau khi chọn option
                
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
            // Thực hiện tìm kiếm luôn sau khi combobox filter được chọn
            this.searchAsset();
        },
        /**
        * Mô tả : Lấy bộ phận sử dụng từ chọn combobox filter
        * @param event: event khi dã chọn combobox
        * Created by: nbtin
        * Created date: 20:56 19/05/2022
        */
        getFilterDepartment(e){
            this.filterDepartment = e.itemData.DepartmentName;
            // Thực hiện tìm kiếm luôn sau khi combobox filter được chọn
            this.searchAsset();
        },
        //TODO: FILTER FIXEDASSET
        /**
        * Mô tả : Hàm filter 
        * @param
        * @return
        * Created by: nbtin
        * Created date: 00:37 22/05/2022
        */
        filterFixedAssets(){
            // Gán debounce, bắt sự kiện người dùng thả keyup 1000mls thì mới chạy hàm searchAsset
            clearTimeout(this.timeOut);
            
            this.timeOut = setTimeout(this.searchAsset, 1000);
        },
        /**
        * Mô tả : Hàm call api để search
        * @param
        * @return
        * Created by: nbtin
        * Created date: 00:36 22/05/2022
        */
        async searchAsset(){
            var me = this;
            // Gán lại các giá trị tham số để chuẩn bị call api
            var searchInputValue = this.$refs.searchContent.value;

            var departmentContent = "", fixedAssetCategoryContent = "";

            if(me.filterDepartment == "Bộ phận sử dụng") departmentContent = "";
            else departmentContent = me.filterDepartment;

            if(me.filterFixedAssetCategory == "Loại tài sản") fixedAssetCategoryContent = "";
            else fixedAssetCategoryContent = me.filterFixedAssetCategory;

            // param call API
            var paramAxios = {
                searchContent: searchInputValue,
                departmentName: departmentContent,
                fixedAssetCategoryName: fixedAssetCategoryContent,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }
            this.isLoading = true;
            // Gọi API để thực hiện filter, phân trang
            await axios.get('https://localhost:7062/api/v1/FixedAssets/filter',
            {
                params: paramAxios
            }).then(function(res){
                console.log(res);
                me.fixedAssets = res.data;
                // Loading khi search
                me.isLoading = false;
            }).catch(function(err){
                console.log(err);
                
            }).then(function(){
                me.isLoading = false;
            })
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
            this.isLoading = true;
            var me = this;
            
            me.searchAsset();
            me.getAllAssets();
            
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
        /**
        * Mô tả: Xử lý khi người dùng chọn đồng ý/ hủy bỏ ở delete alert
        * @param
        * @return
        * Created by: nbtin
        * Created date: 07:19 24/05/2022
        */
        async handleDelOption(isDel){
            if(isDel == false){
                this.isShowAlert = false; 
            } else{
                var me = this;
                me.isShowAlert = false;
                // Gọi API để xóa theo danh sách id được tick checkbox
                await axios.delete(`https://localhost:7062/api/v1/FixedAssets/multiDelete`,{
                    data: JSON.stringify(me.delList),
                    headers: {
                        "content-type": "application/json",
                    },
                }).then(function(res){
                    console.log(res);
                    // Hiện thông báo xóa thành công
                    me.handleStatusSave(true, res.data + messageResource.DELETE_SUCCESS);
                    me.getAsset();
                    me.delList = [];
                    me.delFlag = true;
                    
                }).catch(function(err){
                    me.delList = [];
                    console.log(err);
                    // Hiện thông báo xóa thất bại
                    me.delFlag = true;
                    me.handleStatusSave(false,messageResource.DELETE_FAILED);
                })
                me.$emit("getAsset");
            }       
        },
        /**
        * Mô tả: Xử lý giao diện của Toast message khi trạng thái là thành công hay thất bại
        * @param status: trạng thái
        * @param message: Thông báo tương úng với trạng thái
        * @return
        * Created by: nbtin
        * Created date: 07:21 24/05/2022
        */
        handleStatusSave(status,message){
            var me = this;
            this.messageToToast = message;
            if(status == true){
                // các local data này dùng để truyền đi cho component con là ToastMessage
                this.isShowToast = true;
                this.saveStatus = true;
                setTimeout(function(){
                    me.isShowToast = false;
                },1500);
            } else if(status == false){
                this.isShowToast = true;
                this.saveStatus = false;
                // các local data này dùng để truyền đi cho component con là ToastMessage
                setTimeout(function(){
                    me.isShowToast = false;
                },1500);
            }
        },
    },
    
    data() {
        return {
            pageNumber: 1,
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
            messageToToast: "",
            pageSize: 15,
            totalRecord: 0,
            delFlag: false,
        }
    },
}
</script>

<style>

</style>