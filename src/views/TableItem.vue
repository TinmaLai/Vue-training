<template>
    <tr  @mouseover="this.isHover = true" @mouseout="this.isHover = false" @click="delItemSelect(asset.FixedAssetId)" >
        <td>
            <Checkbox :isCheckBox="isCheckBox" />
        </td>
        <td class="text-center" ref="TableAction">{{index + 1}}</td>
        <td class="text-left">{{asset.FixedAssetCode}}</td>
        <td class="text-left" >{{asset.FixedAssetName}}</td>
        <td class="text-left">{{asset.FixedAssetCategoryName}}</td>
        <td class="text-left">{{asset.DepartmentName}}</td>
        <td class="text-right">{{asset.Quantity}}</td>
        <td class="text-right">{{formatPrice(asset.Cost)}}</td>
        <td class="text-right">{{accumulate}}</td>
        <td class="text-right">{{priceExtra}}</td>
        <td class="table-action" :class="{'d-opacity':isHover}">
            <div class="edit" @click="showEditForm">
                
            </div>
            <div class="detail">

            </div>
        </td>
    </tr>
</template>

<script>
import Checkbox from "../components/base/MISACheckbox.vue";
export default {
    props:["asset","checkbox","index"],
    components:{
        Checkbox
    },
    computed:{
        accumulate(){
            if(this.asset.DepreciationPerYear != undefined && this.asset.DepreciationPerYear != 0)
            return this.formatPrice(this.asset.DepreciationPerYear * this.asset.LifeTime);
            else return this.formatPrice(this.asset.Cost * this.asset.DepreciationRate * this.asset.LifeTime);
        },
        priceExtra(){
            var priceExtra = 0;
            if(this.asset.DepreciationPerYear != undefined && this.asset.DepreciationPerYear != 0)
            priceExtra = this.formatPrice(this.asset.Cost - Math.floor(this.asset.DepreciationPerYear * this.asset.LifeTime));
            if(this.formatToInt(priceExtra) < 0) return 0;
            return priceExtra;
        }
    },
    watch:{
        checkbox: function(newValue){
            this.isCheckBox = newValue;
        }
    },
    methods:{
        // Hover hiện ra cột chức năng của hàng trong bảng
        hoverDisplay(){
            this.isHover = true;
        },
        /**
        * Mô tả : Nếu ấn check khi isCheck: false(ko check) thì sẽ gửi id xóa vào list, nếu đang true thì lấy id xóa ra ko xóa nữa
        * Created by: nbtin
        * Created date: 10:08 26/04/2022
        */
        delItemSelect(id){
            if(this.isCheckBox == false){
                this.$emit("getDelIdSelect",true,id);
                this.isCheckBox = true;
            } else {
                this.$emit("getDelIdSelect",false,id);
                this.isCheckBox = false;
            }
        },
        // Hiện form khi click vào button edit
        showEditForm(){
            this.$emit("editClick");
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
        * Mô tả : Đưa tiền ở dạng dấu chấm về dạng bình thường
        * @param
        * @return
        * Created by: nbtin
        * Created date: 09:49 20/05/2022
        */
       formatToInt(value){
           return value.toString().replaceAll('.','');
       }
    },
    data() {
        return {
            isHover: false,
            isCheckBox: false,
        }
    },
}
</script>

<style>

</style>