<template>
    <div id="overlay" class="overlay"></div>
    <div class="m-dialog license-dialog"  style="height: auto">
        <div class="top-form-row">
            <p class="heading">Chọn tài sản ghi tăng</p>
            <button class=" close-form-btn" @click="this.$emit('closeSelectAssetDlg')"></button>
        </div>
        <div class="top-row" >
            <div class="filter">
                <div class="m-field-input-icon" style="margin-left: 16px; width: 350px;">
                    <div class="btn-icon">
                        <div class="search-icon"></div>
                    </div>
                    <input  ref="searchContent" @change="filterFixedAssets" placeholder="Tìm kiếm theo Mã, tên tài sản" type="text">
                </div>
            </div>
            
        </div>
        <div class="select-asset detail-grid">
            <div class="contain-detail-table">
                <table class="detail-table m-table">
                    <thead>
                        <th>
                            <MISACheckbox
                            @click="checkboxAll"
                            :isCheckBox="checkboxCheckAll"
                            />
                        </th>
                        <th class="text-center">STT</th>
                        <th class="text-left">Mã tài sản</th>
                        <th class="text-left">Tên tài sản</th>
                        <th class="text-left">Bộ phận sử dụng</th>
                        <th class="text-right">Nguyên giá</th>
                        <th class="text-right">Hao mòn năm</th>
                        <th class="text-right" >Giá trị còn lại</th>
                    </thead>
                    <div class="loading-table" v-show="isLoading"></div>
                    <div class="text-no-data" v-if="fixedAssets.length == 0">
                        Hiện tại không có dữ liệu.
                    </div>
                    <tbody v-show="!isLoading">
                        <tr
                            :class="{'activedCheckbox' : asset.checked}"
                            v-for="(asset,index) in fixedAssets"
                            :key="asset.FixedAssetId"
                             @click="asset.checked = !asset.checked">
                            <td><MISACheckbox :isCheckBox="asset.checked"/></td>
                            <td>{{index+1}}</td>
                            <td class="text-left">{{asset.FixedAssetCode}}</td>
                            <td class="text-left">{{asset.FixedAssetName}}</td>
                            <td class="text-left">{{asset.DepartmentName}}</td>
                            <td class="text-right">{{formatMoney(asset.Cost)}}</td>
                            <td class="text-right">{{formatMoney(asset.DepreciationPerYear)}}</td>
                            <td class="text-right">{{formatMoney(priceExtra(asset))}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="master-pagination-footer">
                <div class="page-navigation">
                    <p class="content-details">Tổng số <b>{{this.currentTotalRecord}}</b> bản ghi</p>
                    
                    <MISACombobox
                    :tag="'DropdownPagination'"
                    class="dropdown-pagination"
                    :control="15"
                    @getComboSelected="getPageSize"
                    />
                    <MISAPagination
                        v-model="pageNumCurrent"
                        :pageCount="calTotalPage"
                        :prev-text="'pre'"
                        :prev-link-class="'prev-link-class'"
                        :next-text="'next'"
                        :next-link-class="'next-link-class'"
                        :container-class="'m-pagination'"
                        :click-handler="clickCallback"
                        
                    >
                    </MISAPagination>
                </div>
            </div>
        </div>
        <div class="form-action">
            <button 
            class="m-second-button ignore-btn" 
            @click="this.$emit('closeSelectAssetDlg')"
            v-shortkey="['esc']" @shortkey="this.$emit('closeSelectAssetDlg')"
            >Hủy</button>
            <button 
            id="form-save-button" 
            class="m-button" 
            @click="selectAssetChecked"
            v-shortkey="['ctrl','f']" @shortkey="selectAssetChecked()"
        
            >Lưu</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    props:["oldAssetsLicenseArray"],
    mounted() {
        this.isLoading = true;
        var me = this;
        // Gọi hàm search với giá trị pageSize, pageNumber mặc định (10,1)
        me.searchAsset();
        me.getAllAssets();
        // Gán thêm biến checked cho checkbox cho từng item
        me.fixedAssets.forEach(element => {
            element.checked = false;
        });

    },
     watch: {
        // Watch page Number để set trang hiện tại cho pagination
        pageNumberCurrent: function(newValue){
            this.pageNumCurrent = newValue;
        },
        
    },
    computed:{
        /**
        * Mô tả : Tính tổng số trang 
        * @param
        * @return
        * Created by: nbtin
        * Created date: 11:53 22/05/2022
        */
        calTotalPage(){
            return Math.ceil(this.currentTotalRecord/this.pageSize);
        },
    },
    methods:{
        /**
        * Mô tả: check tất cả checkbox trên các hàng, hoặc ngược lại
        * @param
        * @return
        * Created by: nbtin
        * Created date: 19:21 17/06/2022
        */
        checkboxAll(){
            this.checkboxCheckAll = !this.checkboxCheckAll;
            this.fixedAssets.forEach(element => {
                element.checked = !element.checked;
            })
        },
        /**
        * Mô tả: Hàm tìm kiếm theo tên, mã tài sản
        * @param
        * @return
        * Created by: nbtin
        * Created date: 16:53 13/06/2022
        */
        filterFixedAssets(){
            this.searchAsset();
        },
        /**
        * Mô tả: Emit lên danh sách tài sản đã chọn
        * @param
        * @return
        * Created by: nbtin
        * Created date: 15:08 10/06/2022
        */
        selectAssetChecked(){
            let selectedArray = [];
            this.fixedAssets.forEach(element => {
                if(element.checked == true){
                    selectedArray.push(element);
                }
            });
            
            this.$emit("getSelectedAssetArray",selectedArray);
        },
        /**
        * Mô tả: Chuyển trang theo page number
        * @param
        * @return
        * Created by: nbtin
        * Created date: 14:32 09/06/2022
        */
        clickCallback(pageNumber){
            this.pageNumber = pageNumber;
            this.searchAsset();
            // this.fixedAssets.forEach(element => {
            //     element.checked = false;
            // });
            
            
        },
		/**
		* Mô tả: Format tiền thành ngăn cách dấu chấm
		* @param
		* @return
		* Created by: nbtin
		* Created date: 15:29 08/06/2022
		*/
		formatMoney(value){
			return value.toString().replaceAll('.','').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
        async getAllAssets(){
            var me = this;
            await axios.get("http://localhost:5062/api/v1/FixedAssets")
            .then(function(res){
                console.log(res);
                // Call get toàn bộ danh sách tài sản để lấy tổng số bản ghi (totalRecord)
                me.totalRecord = res.data.length;
                // me.currentTotalRecord = me.totalRecord;
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
        async searchAsset(){
            var me = this;
            // Gán lại các giá trị tham số để chuẩn bị call api
            var searchInputValue = this.$refs.searchContent.value;
            var oldAssetsLicenseIdArray = this.oldAssetsLicenseArray.map((item) => {
                return item.FixedAssetId;
            })

            // param call API
            var paramAxios = {
                filterContent: searchInputValue,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber,
                ids: oldAssetsLicenseIdArray
            }
            this.isLoading = true;
            // Gọi API để thực hiện filter, phân trang
            await axios.get('http://localhost:5062/api/v1/FixedAssets/LicenseAssets',
            {
                params: paramAxios,
                paramsSerializer: params => { 
                    return qs.stringify(params)
                }
            }).then(function(res){
                console.log('res search:', res.data.fixedAssets);
                me.fixedAssets = res.data.fixedAssets;
                /*let idOfOldAssets = [];
                me.oldAssetsLicenseArray.forEach(element => {
                    idOfOldAssets.push(element.FixedAssetId);
                });
                me.fixedAssets = me.fixedAssets.filter(item => !idOfOldAssets.includes(item.FixedAssetId));*/
                // Gán lại số bản ghi tìm dược để chia lại số trang
                me.currentTotalRecord = res.data.count;
                me.pageNumber = 1;
                me.pageNumCurrent = 1;
                // Loading khi search
                me.isLoading = false;
            }).catch(function(err){
                console.log(err.response);
                
            }).then(function(){
                me.isLoading = false;
            })
        },
        priceExtra(asset){
            var priceExtra = 0;
            if(asset.DepreciationPerYear != undefined)
            asset.PriceExtra = asset.Cost - Math.floor(asset.DepreciationPerYear * asset.ProductionYear);
            priceExtra = this.formatMoney(asset.Cost - Math.floor(asset.DepreciationPerYear * asset.ProductionYear));
            if(asset.priceExtra < 0) return 0;
            return priceExtra;
        },
        /**
        * Mô tả : Lấy số bản ghi trong một trang đc emit lên từ combobox ở component con
        * @param
        * @return
        * Created by: nbtin
        * Created date: 12:00 22/05/2022
        */
        getPageSize(pageSize){
            this.pageSize = pageSize.itemData.pageSize;
            // Đưa về trang đầu tiên khi thay đổi pageSize
            this.pageNumber = 1;
            this.pageNumCurrent = 1;
            this.searchAsset();
        },
	},
    
    data() {
        return {
            totalRecord: 1,
            pageNumCurrent: 1,
            pageSize: 15,
            totalPage : 1,
            fixedAssets:[],
            currentTotalRecord: 15,
            pageNumber: 1,
            isLoading: false,
            checkboxListSave: [],
            checkboxCheckAll: false,
        }
    },
}
</script>

<style>

</style>