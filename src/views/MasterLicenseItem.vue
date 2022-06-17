<template>
    <tr  @mouseover="this.isHover = true" @mouseout="this.isHover = false" >
        <td class="text-center">
            <MISACheckbox />
        </td>
        <td class="text-center" ref="TableAction">{{index + 1}}</td>
        <td class="text-left">{{license.LicenseCode}}</td>
        <td class="text-left" >{{license.UseDate}}</td>
        <td class="text-left">{{license.WriteUpDate}}</td>
        <td class="text-right">{{formatMoney(license.TotalCost)}}</td>
        <td class="text-left">{{license.Note}}</td>
        <td class="master-table-item table-action" :class="{'d-opacity':isHover}">
            <div class="edit" @click="showEditForm">
                
            </div>
            <div class="delete" @click="showCloneForm" >

            </div>
        </td>
    </tr>
</template>

<script>
export default {
    props: ["license","index"],
    methods:{
        /**
        * Mô tả: Hàm format định dạng tiền
        * @param
        * @return
        * Created by: nbtin
        * Created date: 21:57 17/06/2022
        */
		formatMoney(value){
			return value.toString().replaceAll('.','').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
	},
    data() {
        return {
            isHover:false
        }
    },
}
</script>

<style>

</style>