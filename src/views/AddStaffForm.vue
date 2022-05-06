<template>
    <div id="overlay" class="overlay"></div>
    <div class="m-dialog">
        <div class="top-form-row">
            <p class="heading">{{this.formMode == 0 ? 'Sửa' : 'Thêm'}} tài sản</p>
            <button class=" close-form-btn" @click="closeAddStaffForm"></button>
        </div>
        <div class="form-content">
            <div class="row">
                <div class="col-4">
                    <label for="">Mã tài sản <span style="color: red; vertical-align: bottom;"> *</span></label>
                    <div>
                        <MISAInput
                        ref="txtRequireCode"
                        :controlledContent="assetForm.code" 
                        :tag="'code'" 
                        @bindingData="bindingData" 
                        :title="'Mã tài sản không được để trống'" 
                        :placeholder="'Nhập mã tài sản'" />
                    </div>
                </div>
                <div class="col-8">
                    <label for="">Tên tài sản<span style="color: red"> *</span></label>
                       <!-- <input ref="" autocomplete="on" placeholder="Nhập tên tài sản" v-model="assetForm.name" class="m-field-input mt-input" type="text"> -->
                    <MISAInput ref="txtRequireName" :controlledContent="assetForm.name" :tag="'name'" @bindingData="bindingData" :title="'Tên tài sản không được để trống'" :placeholder="'Nhập tên tài sản'" />
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Mã bộ phận sử dụng <span style="color: red"> *</span></label>
                    <Combobox ref="txtRequireCodePart" :tag="'part'" placeholder="Chọn mã bộ phận sử dụng" :control="assetForm.codePart" @getComboSelected="getDepartment"/>
                </div>
                <div class="col-8">
                    <label for="">Tên bộ phận sử dụng</label>
                    <div><input v-model="assetForm.partsUse" class="m-field-input readonly mt-input" type="text" disabled></div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Mã loại tài sản <span style="color: red">*</span></label>
                    <Combobox ref="txtRequireCodeAsset" :tag="'asset'" placeholder="Chọn mã loại tài sản" :control="assetForm.codeAsset" @getComboSelected="getTypeAsset"/>
                </div>
                <div class="col-8">
                    <label for="">Tên loại tài sản</label>
                    <div><input v-model="assetForm.type" class="m-field-input readonly mt-input" type="text" disabled></div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Số lượng <span style="color: red">*</span></label>
                    <div class="m-content-right-icon-field">
                        <MISAInput :controlledContent="assetForm.quantity"
                        @bindingData="bindingData"
                        :tag="'quantity'"
                        :title="'Số lượng phải nhiều hơn 0'"
                        :type="'number'"
                        ref="txtRequireQuantity"
                        />
                        <div @click="this.assetForm.quantity++" class="field-incre-btn"></div>
                        <div @click="this.assetForm.quantity > 0 ? this.assetForm.quantity-- :this.assetForm.quantity" class="field-decre-btn"></div>
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Nguyên giá <span style="color: red">*</span></label>
                    <div class="m-content-right-field">
                        <!-- <input class="m-field-input" v-model="priceFormat" type="text"> -->
                        <MISAInput :controlledContent="priceFormat"
                        @keypress="isNumber"
                        @bindingData="bindingData"
                        :tag="'priceFormat'"
                        v-model="priceFormat"
                        :title="'Số lượng phải nhiều hơn 0'"
                        :type="'text'"
                        ref="txtRequirePrice"
                        />
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Số năm sử dụng <span style="color: red">*</span></label>
                    <div class="m-content-right-field">
                        <MISAInput :controlledContent="assetForm.yearsUse"
                        @bindingData="bindingData"
                        :tag="'yearsUse'"
                        :title="'Số lượng phải nhiều hơn 0'"
                        :type="'number'"
                        ref="txtRequireYearsUse"
                        />
                    </div>  
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Tỷ lệ hao mòn (%) <span style="color: red">*</span></label>
                    <div class="m-content-right-icon-field ">
                        <MISAInput ref="txtRequireWearRate" :controlledContent="assetForm.wearRate" :tag="'wearRate'" :type="'number'" @bindingData="bindingData" :title="'Tên tài sản không được để trống'" />
                        <div @click="this.assetForm.wearRate++" class="field-incre-btn"></div>
                        <div @click="this.assetForm.wearRate > 0 ? this.assetForm.wearRate-- :this.assetForm.wearRate" class="field-decre-btn"></div>
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Giá trị hao mòn năm <span style="color: red">*</span></label>
                    <div class="m-content-right-field mt-input">
                        <input ref="txtRequireWearPearYear" :value="calcWearPerYear" class="m-field-input" type="text">
                        <!-- <MISAInput :controlledContent="assetForm.wearRate" :tag="'wearRate'" :type="'number'" @bindingData="bindingData" :title="'Tên tài sản không được để trống'" /> -->
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Năm theo dõi <span style="color: red"></span></label>
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
        :isShowAlert="showCancelAlert"
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
import MISAInput from '../components/base/MISAInput.vue'

export default {
    props:["isShow","newAssetCode","formMode","assetSelected"],
    components:{
        Combobox,
        CancelAlert,
        Datepicker,
        MISAInput,
    },
    mounted() {
        if(this.formMode == 1){
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
            console.log(pre + (parseInt(numberIncre) + 1));
            // Gán mã sau khi tăng cho form
            this.assetForm.code = pre + (parseInt(numberIncre) + 1);
            console.log(this.assetForm.code);
            // Với form là thêm, message khi cancel form là 
        } else if (this.formMode == 0){
            this.assetForm.code = this.newAssetCode;
            this.assetSelectedStore = {...this.assetSelected};
        this.assetForm = this.assetSelected;
        this.assetForm.code = this.assetForm.assetId;
        }
        // asset selected
        

    },
    methods:{
        /**
        * Mô tả : Bắt sự kiện đóng form
        * Created by: nbtin
        * Created date: 13:39 22/04/2022
        */
        isNumber($event) {
            let keyCode = $event.keyCode ? $event.keyCode : $event.which;
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                // 46 is dot
                $event.preventDefault();
            }
        },
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
        calAllFieldToSave(){
            
            this.assetForm.assetId = this.assetForm.code;
            this.assetForm.wearPerYear = this.calcWearPerYear.toString().replaceAll(".","");
            this.assetForm.accumulate = (this.assetForm.wearPerYear * this.assetForm.yearsUse).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            this.assetForm.priceExtra = (this.assetForm.price - this.assetForm.accumulate.toString().replaceAll(".","")).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        checkNullProperty(){
            var check = true;
            var object = this.assetForm;
            this.nullValueProperty = [];
            for(let property in object){
                if(object[property] == "" || object[property] == "0" || object[property] == null){
                    this.nullValueProperty.push(property);
                    check = false;
                }
                // console.log(property + ": " + object[property]);
            }
            
            for(let key of Object.entries(this.$refs)){
                for(let value of this.nullValueProperty){
                    if(key[0].toLowerCase().includes(value.toLowerCase())){
                        // this.$refs.key[0].isAlert = true;
                        
                       this.$refs[key[0]].isAlert = true;
                    }
                }
            }
            return check;
        },
        /**
        * Mô tả : Cất giữ liệu vào database
        * Created by: nbtin
        * Created date: 13:39 22/04/2022
        */
        async saveAsset(){
            //  Tính giá trị hao mòn năm, hao mòn lũy kế, giá trị còn lại khi có sự thay đổi, cập nhật id thêm
            var me = this;
            me.calAllFieldToSave();
            let check = me.checkNullProperty();
            console.log(this.nullValueProperty);
            // Thêm 
            if(check == true){
                if(this.formMode == 1){
                    try{
                        await axios.post("https://62591883c5f02d964a4c41d3.mockapi.io/assets",me.assetForm).then(function(res){
                            console.log(res);
                            var cloneAddAssetForm = {...me.assetForm};
                            me.setStatus(true);
                            // Gán mã tự động tăng cho lần mở form tiếp theo
                            me.$emit("getAssetAdd",cloneAddAssetForm);
                            me.$emit("getNewCodeIncre",me.assetForm.code);
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
                        await axios.put(`https://62591883c5f02d964a4c41d3.mockapi.io/assets/`+ me.assetForm.id, me.assetForm).then(function(res){
                            console.log(res);
                            me.setStatus(true);
                        })
                    } catch (err){
                        console.log(err);
                        this.assetForm = me.assetSelectedStore;
                        me.setStatus(false);
                    }
                    
                }
            } else alert("Có một số trường rỗng ");
        },
        /**
        * Mô tả : Lấy dữ liệu mã bộ phận sử dụng, loại tài sản từ combobox
        * Created by: nbtin
        * Created date: 08:34 25/04/2022
        */
        getDepartment(value){
            if(value.itemData != null){
                this.assetForm.partsUse = value.itemData.name;
                this.assetForm.codePart = value.itemData.code;
            } else {
                this.assetForm.partsUse = "";
                this.assetForm.codePart = "";
            }
        },
        // Lấy mã tài sản, đồng thời binding tỷ lệ hao mòn, số năm sử dụng
        getTypeAsset(value){
            if(value.itemData != null){
                this.assetForm.type = value.itemData.name;
                this.assetForm.wearRate = value.itemData.depreciationRate;
                this.assetForm.yearsUse = value.itemData.lifeTime;
                 this.assetForm.codeAsset = value.itemData.code;
            } else {
                this.assetForm.type = "";
                this.assetForm.wearRate = 0;
                this.assetForm.yearsUse = 0;
                this.assetForm.codeAsset = "";
            }
        },
        
        /**
        * Mô tả : Binding data từ ô input vào object
        * Created by: nbtin
        * Created date: 14:26 02/05/2022
        */
        bindingData(field,data){
            // this.field = data;
            this.assetForm[field] = data;
            console.log(this.assetForm[field]);   
        },

       
    },
    computed: {
        // Tính giá trị hao mòn năm mỗi khi có thay đổi 
        calcWearPerYear(){
            var valuewear = null;
            valuewear = (this.assetForm.wearRate * parseInt(this.assetForm.price))/100;
            valuewear = Math.floor(valuewear);
            return valuewear.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        getThisYear(){
            const d = new Date();
            let year = d.getFullYear();
            return year;
        },
        priceFormat: {
            // get: function () {
                
            //     return this.assetForm.priceFormat;
            // },
            //     // setter
            // set: function (newValue) {
            //     newValue = newValue.toString().replaceAll('.','');
            //     this.assetForm.priceFormat =  newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            //     this.assetForm.price = parseInt(newValue);

            // }
             get: function () {
                
                return this.assetForm.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            },
                // setter
            set: function (newValue) {
                newValue = newValue.toString().replaceAll('.','');
                this.assetForm.price =  newValue;

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
                code: '',
                name:'',
                quantity: 1,
                price: 0,
                wearRate: 0,
                yearsUse: 0,
                wearPerYear: null,
                accumulate: null,
                priceExtra: null,
                assetId: null,
                buyDate: new Date(),
                useDate: new Date(),
                priceFormat: 0,
                type: "",
                partsUse: "",
                codePart: "",
                codeAsset: "",
                
            },
            cloneAssetReset: null,
            assetFormCode: "",
            showCancelAlert: false,
            cancelMessage: null,
            assetSelectedStore: null,
            nullValueProperty: [],
            
        }
    },
}
</script>

<style>
    
</style>