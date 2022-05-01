<template>
    <div id="overlay" class="overlay" :class="{'d-block': isShow}"></div>
    <div class="m-dialog" :class="{'d-block': isShow}">
        <div class="top-form-row">
            <p class="heading">{{this.formMode == 0 ? 'Sửa' : 'Thêm'}} tài sản</p>
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
                        <input class="m-field-input" v-model="priceFormat" type="text">
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
                    <div class="datepicker-container">
                        <Datepicker 
                        class="mt-input input-datepicker"
                        v-model="assetForm.buyDate"
                        format="dd/MM/yyyy"
                        ></Datepicker>
                        <div class="datepicker-icon"></div>
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Ngày bắt đầu sử dụng <span style="color: red">*</span></label>
                    <div class="datepicker-container">
                        <Datepicker 
                        class="mt-input input-datepicker"
                        v-model="assetForm.useDate"
                        format="dd/MM/yyyy"
                        ></Datepicker>
                        <div class="datepicker-icon"></div>
                    </div>
                </div>
                <div class="col-4"></div>
            </div>
        </div>
        <div class="form-action">
            <button class="m-second-button ignore-btn" @click="closeAddStaffForm">Hủy</button>
            <button id="form-save-button" class="m-button" @click="saveAsset">Lưu</button>
        </div>
        <CancelAlert 
        :isShowAlert="this.showCancelAlert"
        :formMode="this.formMode"
        @getCancelOption="handleCancelOption"
        />
    </div>
</template>

<script>
import axios from 'axios';
import Combobox from '../components/base/MISACombobox.vue';
import CancelAlert from '../views/CancelAlertDialog.vue';
import Datepicker from '@vuepic/vue-datepicker';

export default {
    props:["isShow","newAssetCode","formMode","assetSelected"],
    components:{
        Combobox,
        CancelAlert,
        Datepicker,
    },
    mounted() {
        this.cloneAssetReset = {quantity: 1,
                price: 0,
                wearRate: null,
                yearsUse: null,
                wearPerYear: null,
                accumulate: null,
                priceExtra: null,
                assetId: null,
                buyDate: new Date(),
                useDate: new Date()};

    },
    methods:{
        /**
        * Mô tả : Bắt sự kiện đóng form
        * Created by: nbtin
        * Created date: 13:39 22/04/2022
        */
        closeAddStaffForm(){
            
            this.handleCancelAlert();
            
        },  
        //reset form
        resetForm(control){
            control.showCancelAlert = false;
            control.$emit("closeStaffDialog",false);
        },
        // Hiện popup và xử lý khi muốn đóng form 
        handleCancelAlert(){
            this.showCancelAlert = true;
        },
        // Xử lý khi người dùng chọn các button trong alert cancel
        handleCancelOption(option){
            switch(option){
                case false: {
                    this.showCancelAlert = false;
                    break;
                }
                case true:{
                    this.resetForm(this);
                    break;
                }
                case 'nosave':{
                    this.assetForm = this.assetSelectedStore;
                    this.resetForm(this);
                    break;
                }
                case 'save':{
                    this.saveAsset();
                    break;
                }
                
                
            }
        },
        setStatus(status){
            if(status == true){
                this.resetForm(this);
                this.$emit("getStatusSave",true);
            } else {
                this.resetForm(this);
                this.$emit("getStatusSave",false);
            }
            
        },
        /**
        * Mô tả : Cất giữ liệu vào database
        * Created by: nbtin
        * Created date: 13:39 22/04/2022
        */
        async saveAsset(){
            //  Tính giá trị hao mòn năm, hao mòn lũy kế, giá trị còn lại khi có sự thay đổi, cập nhật id thêm
            var me = this;
            this.assetForm.assetId = this.assetFormCode
            this.assetForm.wearPerYear = this.calcWearPerYear;
            this.assetForm.accumulate = this.assetForm.wearPerYear * this.assetForm.yearsUse;
            this.assetForm.priceExtra = this.assetForm.price - this.assetForm.accumulate;
            // Thêm 
            if(this.formMode == 1){
                try{
                    await axios.post("https://62591883c5f02d964a4c41d3.mockapi.io/assets",me.assetForm).then(function(res){
                        console.log(res);
                        var cloneAddAssetForm = {...me.assetForm};
                        me.setStatus(true);
                        // Gán mã tự động tăng cho lần mở form tiếp theo
                        me.$emit("getAssetAdd",cloneAddAssetForm);
                        me.$emit("getNewCodeIncre",me.assetFormCode);
                    }).catch(function(err){
                        console.log(err);
                        me.setStatus(false);
                    })
                } catch(error){
                    console.log(error);
                    me.setStatus(false);
                    
                }
                
            } else if(this.formMode == 0){ // Sửa

            try{
                await axios.put(`https://62591883c5f02d964a4c41d3.mockapi.io/asset/`+ me.assetForm.id, me.assetForm).then(function(res){
                    console.log(res);
                    me.setStatus(true);
                })
            } catch (err){
                console.log(err);
                this.assetForm = me.assetSelectedStore;
                me.setStatus(false);
            }
                
            }
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
        // //1,000,000
        // replaceAll(str, str1, str2){
        //     var res = str;
        //     for(let i = 0; i < str.length; i++){
        //         if(str[i] == str1){
        //             let sub1 = str.toString().substring(0,i);
        //             let sub2 = str.toString().substring(i+1);
        //             str = sub1 + str2 + sub2;
        //         }
        //     }
        //     return res;
        // }
       
    },
    computed: {
        // Tính giá trị hao mòn năm mỗi khi có thay đổi 
        calcWearPerYear(){
            
            var valuewear = null;
            valuewear = (this.assetForm.wearRate * parseInt(this.assetForm.price))/100;
            return valuewear;
        },
        getThisYear(){
            const d = new Date();
            let year = d.getFullYear();
            return year;
        },
        priceFormat: {
            get: function () {
                
                return this.assetForm.priceFormat;
            },
                // setter
            set: function (newValue) {
                newValue = newValue.toString().replaceAll(',','');
                this.assetForm.priceFormat =  newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.assetForm.price = parseInt(newValue);
            }
        }
    },
    watch: {
        // Lấy thông tin từ hàng được dblclick, nhưng có vẻ watch sẽ ko thay đổi nếu 1 hàng chọn liên tiếp 2 lần
        assetSelected: function(newValue){
            this.assetSelectedStore = {...newValue};
            this.assetForm = newValue;
            this.assetFormCode = this.assetForm.assetId;
        },
        // Check trạng thái sửa hoặc thêm
        formMode: function(newValue){
            // Lấy mã nếu form là thêm 
            
            if(newValue == 1){
                var currentCode = this.newAssetCode; // gán cho dễ gọi
                var numberIncre = "";
                var pre = "";
                //Thực hiện cắt chuỗi TS00001 thành 2 phần, phần số và chữ đê tăng số lên + 1
                for(let i = 0; i < currentCode.length; i++){
                    if(currentCode[i] != "0" && (currentCode[i-1] == "0" || currentCode[i-1] == "S")){
                        numberIncre = currentCode.substring(i);
                        pre = currentCode.substring(0,i);
                    }
                }
                if((parseInt(numberIncre) + 1).toString().length - numberIncre.length > 0){
                    pre = pre.substring(0,pre.length - 1);
                }
                // Gán mã sau khi tăng cho form
                this.assetFormCode = pre + (parseInt(numberIncre) + 1);
                // Với form là thêm, message khi cancel form là 
            } else if (newValue == 0){
                this.assetFormCode = this.newAssetCode;
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
                priceExtra: null,
                assetId: null,
                buyDate: new Date(),
                useDate: new Date(),
                priceFormat: 0,
            },
            cloneAssetReset: null,
            assetFormCode: null,
            showCancelAlert: false,
            cancelMessage: null,
            assetSelectedStore: null,
            
        }
    },
}
</script>

<style>
    
</style>