<template>
    <div class="contain-all-table">
        <div class="contain-table">
            <table class="staff-list m-table">
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
                <tbody>
                    <TableItem 
                    v-for="(asset, index) in fixedAssets" 
                    :asset="asset"
                    :key="asset.assetId"
                    :index="index"
                    @getDelIdSelect="delItemSelected"
                    @editClick="ShowStaffDialog(asset.id)"
                    @dblclick="ShowStaffDialog(asset.id)"
                    :checkbox="delList.includes(asset.id)"
                    />
                    
                </tbody>
            </table>
            
        </div>
        <table class="table-footer">
            <tr>
                    <td></td>
                    <td class=""></td>
                    <td class="text-left"></td>
                    <td class="text-left" ></td>
                    <td class="text-left"></td>
                    <td class="text-left"></td>
                    <td class="text-right"></td>
                    <td class="text-right"></td>
                    <td class="text-right"></td>
                    <td class="text-right"></td>
                    <td></td>
                </tr>
            <tr id="pagination-table">
                <td colspan="6" style="width: 63%">
                    <div class="page-navigation">
                        <p class="content-details">Tổng số <b>200</b> bản ghi</p>
                        <button class="m-dropdown" style="width: 59px; height: 25px;">
                            <p class="m-dropdown-suggest">20</p>
                            <div class="arrow-down"></div>
                            <div class="m-dropdown-data d-none">
                                <div class="m-dropdown-item">10</div>
                                <div class="m-dropdown-item">50</div>
                                <div class="m-dropdown-item">100</div>
                            </div>
                        </button>
                        <div class="m-pagination" style="width: 147px;">
                            <button class="prev-page-button"></button>
                            <div class="m-pagination-pages">
                                <div class="page-item current-page">1</div>
                                <div class="page-item">2</div>
                                <div class="page-item">...</div>
                                <div class="page-item">4</div>
                            </div>
                            <button class="next-page-button"></button>
                        </div>
                    </div>
                </td>
                <td class="text-right">{{this.sumRow[0]}}</td>
                <td class="text-right">{{this.sumRow[1]}}</td>
                <td class="text-right">{{this.sumRow[2]}}</td>
                <td  class="text-right">{{this.sumRow[3]}}</td>
                <td width="90px"></td>
            </tr>
        </table>
    </div>
</template>

<script>
import Checkbox from "../components/base/MISACheckbox.vue";
import TableItem from "../views/TableItem.vue";
import axios from "axios";

export default {
    props:["assetAdd","fixedAssets","isTableLess"],
    components:{
        Checkbox,
        TableItem
    },
    computed:{
        /**
        * Mô tả : Tính phần tổng cổng ở dưới cùng của bảng
        * @param
        * @return
        * Created by: nbtin
        * Created date: 15:19 08/05/2022
        */
        sumRow(){
            var init = 0;
            var sum = [];
            if(this.fixedAssets.length != 0){
                let sumQuantity = this.fixedAssets.reduce((item1,item2) => {
                    return item1 + item2.quantity;
                },init);
                let sumPrice =  this.fixedAssets.reduce((item1,item2) => {
                    return parseInt(item1) + parseInt(this.formatToInt(item2.price));
                },init);
                let sumAccum = this.fixedAssets.reduce((item1,item2) => {
                    return parseInt(item1) + parseInt(this.formatToInt(item2.accumulate));
                },init);
                let sumPriceExtra = this.fixedAssets.reduce((item1,item2) => {
                    return parseInt(item1) + parseInt(this.formatToInt(item2.priceExtra));
                },init);
                sum.push(this.formatPrice(sumQuantity));
                sum.push(this.formatPrice(sumPrice));
                sum.push(this.formatPrice(sumAccum));
                sum.push(this.formatPrice(sumPriceExtra));
            }
            console.log(sum);
            return sum;
        }
    },
    methods:{
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
        async ShowStaffDialog(id){
            var asset = {};
            var me = this;
            await axios.get(`https://62591883c5f02d964a4c41d3.mockapi.io/assets/${id}`).then(function(res){
                console.log(res);
                asset = res.data;
            }).catch(function(err){
                console.log(err);
            }).then(function () {
                me.$emit("getAssetSelected",asset);
                me.$emit("toggleStaffDialog",true,0);
            });

            
        },
        // Lấy tất cả id được chọn để xóa, hoặc lấy ra
        delItemSelected(isDel, id){
            if(isDel == true){
                this.delList.push(id);
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
                    if(this.delList.includes(this.fixedAssets[i].id) == false){
                        this.delList.push(this.fixedAssets[i].id);
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
    },
    data() {
        return {
            assets:{},
            delList: [],
            checkbox: false,
            isCheckAll: false,
        }
    },
}
</script>

<style>

</style>