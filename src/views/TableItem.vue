<template>
    <tr  @mouseover="this.isHover = true" @mouseout="this.isHover = false" @click="delItemSelect(asset.id)" >
        <td>
            <Checkbox :isCheckBox="isCheckBox" />
        </td>
        <td class="text-center" ref="TableAction">{{index + 1}}</td>
        <td class="text-left">{{asset.assetId}}</td>
        <td class="text-left" >{{asset.name}}</td>
        <td class="text-left">{{asset.type}}</td>
        <td class="text-left">{{asset.partsUse}}</td>
        <td class="text-right">{{asset.quantity}}</td>
        <td class="text-right">{{asset.priceFormat}}</td>
        <td class="text-right">{{asset.accumulate}}</td>
        <td class="text-right">{{asset.priceExtra}}</td>
        <td class="table-action" :class="{'d-opacity':isHover}">
            <div class="edit">
                
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