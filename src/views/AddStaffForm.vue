<template>
    <div id="overlay" class="overlay" :class="{'d-block': isShow}"></div>
    <div class="m-dialog" :class="{'d-block': isShow}">
        <div class="top-form-row">
            <p class="heading">Sửa tài sản</p>
            <button class=" close-form-btn" @click="closeAddStaffForm"></button>
        </div>
        <div class="form-content">
            <div class="row">
                <div class="col-4">
                    <label for="">Mã tài sản <span style="color: red; vertical-align: bottom;"> *</span></label>
                    <div><input :value="assetFormCode" class="m-field-input mt-input" type="text"></div>
                </div>
                <div class="col-8">
                    <label for="">Tên tài sản<span style="color: red"> *</span></label>
                    <div><input autocomplete="on" placeholder="Nhập tên tài sản" v-model="assetForm.name" class="m-field-input mt-input" type="text"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Mã bộ phận sử dụng <span style="color: red"> *</span></label>
                    <Combobox :tag="'part'" placeholder="Chọn mã bộ phận sử dụng" class=" mt-input" @getComboSelected="getDepartment"/>
                </div>
                <div class="col-8">
                    <label for="">Tên bộ phận sử dụng</label>
                    <div><input v-model="assetForm.partsUse" class="m-field-input readonly mt-input" type="text" readonly></div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Mã loại tài sản <span style="color: red">*</span></label>
                    <Combobox :tag="'asset'" placeholder="Chọn mã loại tài sản" class=" mt-input" @getComboSelected="getTypeAsset"/>
                </div>
                <div class="col-8">
                    <label for="">Tên loại tài sản</label>
                    <div><input v-model="assetForm.type" class="m-field-input readonly mt-input" type="text" readonly></div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Số lượng <span style="color: red">*</span></label>
                    <div class="m-content-right-icon-field mt-input">
                        <input class="m-field-input" v-model="assetForm.quantity"  type="number">
                        <div @click="this.assetForm.quantity++" class="field-incre-btn"></div>
                        <div @click="this.assetForm.quantity > 0 ? this.assetForm.quantity-- :this.assetForm.quantity" class="field-decre-btn"></div>
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Nguyên giá <span style="color: red">*</span></label>
                    <div class="m-content-right-field mt-input">
                        <input class="m-field-input" v-model="assetForm.price" type="number">
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Số năm sử dụng <span style="color: red">*</span></label>
                    <div class="m-content-right-field mt-input"><input v-model="this.assetForm.yearsUse" class="m-field-input" type="text"></div>  
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Tỷ lệ hao mòn (%) <span style="color: red">*</span></label>
                    <div class="m-content-right-icon-field mt-input">
                        <input v-model="this.assetForm.wearRate" type="number" class="m-field-input">
                        <div @click="this.assetForm.wearRate++" class="field-incre-btn"></div>
                        <div @click="this.assetForm.wearRate > 0 ? this.assetForm.wearRate-- :this.assetForm.wearRate" class="field-decre-btn"></div>
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Giá trị hao mòn năm <span style="color: red">*</span></label>
                    <div class="m-content-right-field mt-input"><input :value="calcWearPerYear" class="m-field-input" type="text"></div>
                </div>
                <div class="col-4">
                    <label for="">Năm theo dõi <span style="color: red">*</span></label>
                    <div class="m-content-right-field mt-input">
                        <input :value="getThisYear" readonly class="m-field-input readonly" type="text">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Ngày mua <span style="color: red">*</span></label>
                    <button class="m-dropdown m-date-picker mt-input" style="width: 100%">
                        <p class="m-dropdown-suggest">25/08/2021</p>
                        <div class="date-picker"></div>
                    </button>
                </div>
                <div class="col-4">
                    <label for="">Ngày bắt đầu sử dụng <span style="color: red">*</span></label>
                    <button class="m-dropdown m-date-picker mt-input" style="width: 100%">
                        <p class="m-dropdown-suggest">25/08/2021</p>
                        <div class="date-picker"></div>
                    </button>
                </div>
                <div class="col-4"></div>
            </div>
        </div>
        <div class="form-action">
            <button class="m-second-button ignore-btn">Hủy</button>
            <button id="form-save-button" class="m-button" @click="saveAsset">Lưu</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Combobox from '../components/base/MISACombobox.vue';
export default {
    props:["isShow","newAssetCode","formMode","assetSelected"],
    components:{
        Combobox
    },
    methods:{
        /**
        * Mô tả : Bắt sự kiện đóng form
        * Created by: nbtin
        * Created date: 13:39 22/04/2022
        */
        closeAddStaffForm(){
            this.$emit("closeStaffDialog",false);
        },  
        /**
        * Mô tả : Cất giữ liệu vào database
        * Created by: nbtin
        * Created date: 13:39 22/04/2022
        */
        saveAsset(){
            //  Tính giá trị hao mòn năm, hao mòn lũy kế, giá trị còn lại khi có sự thay đổi
            this.assetForm.wearPerYear = this.calcWearPerYear;
            this.assetForm.accumulate = this.assetForm.wearPerYear * this.assetForm.yearsUse;
            this.assetForm.priceExtra = this.assetForm.price - this.assetForm.accumulate;
            var me = this;
            try{
                axios.post("https://62591883c5f02d964a4c41d3.mockapi.io/assets",me.assetForm).then(function(res){
                    console.log(res);
                })
            } catch(error){
                console.log(error);
            }
            // Gán mã tự động tăng cho lần mở form tiếp theo
            this.$emit("getNewCodeIncre",parseInt(this.assetFormCode));
            this.$emit("getAssetAdd",me.assetForm);
        },
        /**
        * Mô tả : Lấy dữ liệu mã bộ phận sử dụng, loại tài sản từ combobox
        * Created by: nbtin
        * Created date: 08:34 25/04/2022
        */
        getDepartment(value){
            this.assetForm.partsUse = value.name;
        },
        // Lấy mã tài sản, đồng thời binding tỷ lệ hao mòn, số năm sử dụng
        getTypeAsset(value){
            this.assetForm.type = value.name;
            this.assetForm.wearRate = value.wearRate;
            this.assetForm.yearsUse = value.yearsUse;
        },
        // format tien 
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
       
    },
    computed: {
        // Tính giá trị hao mòn năm mỗi khi có thay đổi 
        calcWearPerYear(){
            var valuewear = null;
            valuewear = (this.assetForm.wearRate * this.assetForm.price)/100;
            return valuewear;
        },
        getThisYear(){
            const d = new Date();
            let year = d.getFullYear();
            return year;
        }
    },
    watch: {
        // Lấy thông tin từ hàng được dblclick
        assetSelected: function(newValue){
            this.assetForm = newValue;
            this.assetFormCode = this.assetForm.id;
        },
        // Check trạng thái sửa hoặc thêm
        formMode: function(){
            // Lấy mã nếu form là thêm
            if(this.formMode == 1){
                this.assetFormCode = parseInt(this.newAssetCode)+1;
            }
        },
    },
    data() {
        return {
            assets:{},
            asset:{},
            assetForm :{
                quantity: 1,
                price: 0,
                wearRate: null,
                yearsUse: null,
                wearPerYear: null,
                accumulate: null,
                priceExtra: null
            },
            assetFormCode: null,
           
        }
    },
}
</script>

<style>

</style>