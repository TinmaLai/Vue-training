<template>
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
                @dblclick="ShowStaffDialog(asset)"
                :checkbox="delList.includes(asset.id)"
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
import Checkbox from "../components/base/MISACheckbox.vue";
import TableItem from "../views/TableItem.vue";

export default {
    props:["assetAdd","fixedAssets"],
    components:{
        Checkbox,
        TableItem
    },
    methods:{
        ShowStaffDialog(asset){
            this.$emit("getAssetSelected",asset);
            this.$emit("toggleStaffDialog",true,0);
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