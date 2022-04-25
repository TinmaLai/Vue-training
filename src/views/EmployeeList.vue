<template>
    <div class="contain-table">
        <table class="staff-list m-table">
            <thead>
                <tr>
                    <td>
                        <Checkbox/>
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
                v-for="asset in assets" 
                :asset="asset"
                :key="asset.id"
                @getDelIdSelect="delItemSelected"
                @dblclick="ShowStaffDialog(asset)"
                />
                <tr id="pagination-table">
                    <td colspan="6">
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
                    <td class="text-right">13</td>
                    <td class="text-right">249</td>
                    <td class="text-right">19716</td>
                    <td class="text-right">229</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
import Checkbox from "../components/base/MISACheckbox.vue";
import TableItem from "../views/TableItem.vue";

export default {
    props:["assetAdd"],
    components:{
        Checkbox,
        TableItem
    },
    beforeMount(){
        /**
        * Mô tả : Call API đưa dữ liệu lên bản
        * Created by: nbtin
        * Created date: 13:44 22/04/2022
        */
        try{
            var me = this;
            axios.get("https://62591883c5f02d964a4c41d3.mockapi.io/assets")
                .then(function(res){
                    me.assets = res.data;
                    var newCode = res.data[res.data.length - 1].id;
                    me.$emit("getNewCode",newCode);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        } catch(error){
            console.log(error);
        }
    },
    methods:{
        ShowStaffDialog(asset){
            this.$emit("getAssetSelected",asset);
            this.$emit("toggleStaffDialog",true,0);
        },
        // Lấy tất cả id được chọn để xóa
        delItemSelected(id){
            this.delList.push(id);
            this.$emit("getDelList",this.delList);
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
        }
    },
}
</script>

<style>

</style>