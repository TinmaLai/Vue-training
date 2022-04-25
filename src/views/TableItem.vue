<template>
    <tr  @mouseover="this.isHover = true" @mouseout="this.isHover = false">
        <td>
            <Checkbox @click="delItemSelect(asset.id)"/>
        </td>
        <td class="text-center" ref="TableAction">{{asset.id}}</td>
        <td class="text-left">{{asset.id}}</td>
        <td class="text-left" >{{asset.name}}</td>
        <td class="text-left">{{asset.type}}</td>
        <td class="text-left">{{asset.partsUse}}</td>
        <td class="text-right">{{asset.quantity}}</td>
        <td class="text-right">{{asset.price}}</td>
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
    props:["asset"],
    components:{
        Checkbox
    },
    methods:{
        // Hover hiện ra cột chức năng của hàng trong bảng
        hoverDisplay(){
            this.isHover = true;
        },
        delItemSelect(id){
            this.$emit("getDelIdSelect",id);
        }

    },
    data() {
        return {
            isHover: false,
            
        }
    },
}
</script>

<style>

</style>