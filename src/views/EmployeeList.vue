<template>
    <div class="contain-all-table">
        
        <div class="contain-table">
            <table class="staff-list m-table" >
                <thead>
                    <tr>
                        <td>
                            <Checkbox @click="checkAll" :isCheckBox="isCheckAll" />
                        </td>
                        <td class="">STT</td>
                        <td class="text-left">Mã tài sản</td>
                        <td class="text-left" >Tên tài sản</td>
                        <td class="text-left">Loại tài sản</td>
                        <td class="text-left">Bộ phận sử dụng</td>
                        <td class="text-right">Số lượng</td>
                        <td class="text-right">Nguyên giá</td>
                        <td class="text-right">HM/KH lũy kế</td>
                        <td class="text-right">Giá trị còn lại</td>
                        <td>Chức năng</td>
                    </tr>
                </thead>    
                <div class="loading-table" v-show="isLoading"></div>
                <tbody v-show="!isLoading">
                    <TableItem 
                    v-for="(asset, index) in fixedAssets" 
                    :asset="asset"
                    :key="asset.assetId"
                    :index="index"
                    @getDelIdSelect="delItemSelected"
                    @cloneClick="ShowStaffDialog(asset.FixedAssetId,2)"
                    @editClick="ShowStaffDialog(asset.FixedAssetId,0)"
                    @dblclick="ShowStaffDialog(asset.FixedAssetId,0)"
                    :checkbox="delList.includes(asset.FixedAssetId)"
                    />
                </tbody>
                
            </table>
            
        </div>
        <table class="table-footer">
            
            <tr id="pagination-table">
                <td>
                    <div class="page-navigation">
                        <p class="content-details">Tổng số <b>{{this.totalRecord}}</b> bản ghi</p>
                        
                        <MISACombobox
                        :tag="'DropdownPagination'"
                        class="dropdown-pagination"
                        @getComboSelected="getPageSize"
                        />
                        <!-- <div class="m-pagination" style="width: 147px;">
                            <button class="prev-page-button"></button>
                            <div class="m-pagination-pages">
                                <div class="page-item current-page">1</div>
                                <div class="page-item">2</div>
                                <div class="page-item">...</div>
                                <div class="page-item">4</div>
                            </div>
                            <button class="next-page-button"></button>
                        </div> -->
                        <MISAPagination
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
                </td>
                <td class="text-right text-bold">{{this.sumRow[0]}}</td>
                <td class="text-right text-bold">{{this.sumRow[1]}}</td>
                <td class="text-right text-bold">{{this.sumRow[2]}}</td>
                <td class="text-right text-bold">{{this.sumRow[3]}}</td>
                <td width="90px"></td>
            </tr>
        </table>
    </div>
</template>

<script>
import Checkbox from "../components/base/MISACheckbox.vue";
import TableItem from "../views/TableItem.vue";
import MISACombobox from "../components/base/MISACombobox.vue";
import axios from "axios";

export default {
    props:["assetAdd","fixedAssets","isTableLess","isLoading","totalRecord","delFlag"],
    components:{
        Checkbox,
        TableItem,
        MISACombobox
    },
    // async mounted(){
    //     var me = this;
    //     await axios.get("https://localhost:7062/api/v1/FixedAssets").then(function(res){
    //         me.totalRecord = res.data.length;
    //         me.totalPage = Math.ceil(me.totalRecord / me.pageSize);
    //     }).catch(function(err){
    //         console.log(err);
    //     })
    // },
    computed:{
        /**
        * Mô tả : Tính tổng số trang 
        * @param
        * @return
        * Created by: nbtin
        * Created date: 11:53 22/05/2022
        */
        calTotalPage(){
            return Math.ceil(this.totalRecord/this.pageSize);
        },
        /**
        * Mô tả : Tính phần tổng cổng ở dưới cùng của bảng
        * @param
        * @return
        * Created by: nbtin
        * Created date: 15:19 08/05/2022
        */
        sumRow(){
            var init = 0;
            var sum = [0,0,0,0];
            if(this.fixedAssets.length != 0){
                let sumQuantity = this.fixedAssets.reduce((item1,item2) => {
                    return item1 + item2.Quantity;
                },init);
                let sumPrice =  this.fixedAssets.reduce((item1,item2) => {
                    return parseInt(item1) + parseInt(this.formatToInt(item2.Cost));
                },init);
                let sumAccum = this.fixedAssets.reduce((item1,item2) => {
                    return parseInt(item1) + parseInt(this.formatToInt(item2.DepreciationPerYear * item2.ProductionYear));
                },init);
                let sumPriceExtra = this.fixedAssets.reduce((item1,item2) => {
                    console.log('depreciation per year: ', parseInt(item2.Cost - this.formatToInt(item2.DepreciationPerYear * item2.ProductionYear)));
                    return parseInt(item1) + parseInt(item2.Cost - this.formatToInt(item2.DepreciationPerYear * item2.ProductionYear));
                    
                },init);
                sum[0] = (this.formatPrice(sumQuantity));
                sum[1] = (this.formatPrice(sumPrice));
                sum[2] = (this.formatPrice(sumAccum));
                sum[3] = (sumPriceExtra > 0 ? this.formatPrice(sumPriceExtra) : 0);
            }
            console.log(sum);
            return sum;
        }
    },
    methods:{
        /**
        * Mô tả : Lấy số bản ghi trong 1 trang từ dropdowm phân trang
        * @param
        * @return
        * Created by: nbtin
        * Created date: 11:48 22/05/2022
        */
        getPageSize(e){
            var pageSize = e.itemData.pageSize;
            this.pageSize = pageSize;
            this.$emit("getPageSize",pageSize);
        },
        /**
        * Mô tả : Bắt sự kiện click của phân trang
        * @param
        * @return
        * Created by: nbtin
        * Created date: 00:00 22/05/2022
        */
        clickCallback(pageNumber){
            this.$emit("getPageNumber",pageNumber);
        },
        /**
        * Mô tả : Định dạng tiền ở dạng dấu chấm VD: 1.000.000 =  một triệu đồng
        * @param value
        * Created by: nbtin
        * Created date: 11:45 08/05/2022
        */
        formatPrice(value){
            return value.toString().replaceAll('.','').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        /**
        * Mô tả : Chuyển chuỗi format thành số bằng cách loại dấu chấm
        * @param value
        * Created by: nbtin
        * Created date: 11:45 08/05/2022
        */
        formatToInt(value){
            if(value != null && value != undefined)
            return value.toString().replaceAll('.','');
        },
        /**
        * Mô tả : Call API theo id để lấy bản ghi ở bảng truyền vào form
        * @param
        * @return
        * Created by: nbtin
        * Created date: 12:22 08/05/2022
        */
        async ShowStaffDialog(id,formMode){
            var asset = {};
            var me = this;
            await axios.get(`https://localhost:7062/api/v1/FixedAssets/${id}`).then(function(res){
                console.log(res);
                asset = res.data;
            }).catch(function(err){
                console.log(err);
            }).then(function () {
                me.$emit("getAssetSelected",asset);
                me.$emit("toggleStaffDialog",true,formMode);
            });

            
        },
        // Lấy tất cả id được chọn để xóa, hoặc lấy ra
        delItemSelected(isDel, id){
            if(isDel == true){
                this.delList.push(id);
                this.$emit("getDelFlag", false);
            } else if(isDel == false) {
                for(let i = 0; i < this.delList.length; i++){
                    if(id == this.delList[i]) this.delList.splice(i,1);
                }
            }
            this.$emit("getDelList",this.delList);
            if(this.delList.length != this.fixedAssets.length) this.isCheckAll = false;
        },
        // Check tất cả 
        checkAll(){
            if(this.isCheckAll == false){
                for(let i = 0 ; i < this.fixedAssets.length; i++){
                    if(this.delList.includes(this.fixedAssets[i].FixedAssetId) == false){
                        this.delList.push(this.fixedAssets[i].FixedAssetId);
                    }
                }
                
            } else {
                this.delList = [];
            }
            this.$emit("getDelList",this.delList);
            this.isCheckAll = !this.isCheckAll;
            
        }
    },
    // Thêm dữ liệu từ form vào bảng, nhưng chưa được
    watch: {
        // assetAdd: function(newValue){
        // this.assets.add(newValue);
        // }
        delFlag: function(oldValue, newValue){
            if(newValue == true || oldValue == true) this.delList = [];
        }
    },
    data() {
        return {
            assets:{},
            delList: [],
            checkbox: false,
            isCheckAll: false,
            pageSize: 15,
            totalPage : 1,
        }
    },
}
</script>

<style>

</style>