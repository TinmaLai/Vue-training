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
                        :fieldName="'Mã tài sản'"
                        :title="'Mã tài sản không được để trống'" 
                        :placeholder="'Nhập mã tài sản'" />
                    </div>
                </div>
                <div class="col-8">
                    <label for="">Tên tài sản<span style="color: red"> *</span></label>
                       <!-- <input ref="" autocomplete="on" placeholder="Nhập tên tài sản" v-model="assetForm.name" class="m-field-input mt-input" type="text"> -->
                    <MISAInput 
                    ref="txtRequireName" 
                    :controlledContent="assetForm.name" 
                    :tag="'name'" 
                    @bindingData="bindingData" 
                    :title="'Tên tài sản không được để trống'" 
                    :placeholder="'Nhập tên tài sản'" 
                    :fieldName="'Tên tài sản'"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Mã bộ phận sử dụng <span style="color: red"> *</span></label>
                    <Combobox 
                    ref="txtRequireCodePart" 
                    :tag="'part'" 
                    :fieldName="'Mã bộ phận sử dụng'"
                    :placeholder="'Chọn mã bộ phận sử dụng'"
                    :title="'Mã bộ phận không được để trống'"
                    :control="assetForm.codePart" 
                    @getComboSelected="getDepartment"/>
                </div>
                <div class="col-8">
                    <label for="">Tên bộ phận sử dụng</label>
                    <div><input v-model="assetForm.partsUse" class="m-field-input readonly mt-input" type="text" disabled></div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Mã loại tài sản <span style="color: red">*</span></label>
                    <Combobox
                    ref="txtRequireCodeAsset" 
                    :tag="'asset'" 
                    placeholder="Chọn mã loại tài sản"
                    :title="'Mã loại tài sản không được để trống'" 
                    :control="assetForm.codeAsset" 
                    @getComboSelected="getTypeAsset"
                    :fieldName="'Mã loại tài sản'"
                    />
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
                        :fieldName="'Số lượng'"
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
                        :tag="'abc'"
                        v-model="priceFormat"
                        :title="'Nguyên giá phải nhiều hơn 0'"
                        :type="'text'"
                        :fieldName="'Nguyên giá'"
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
                        :fieldName="'Số năm sử dụng'"
                        ref="txtRequireYearsUse"
                        />
                    </div>  
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Tỷ lệ hao mòn (%) <span style="color: red">*</span></label>
                    <div class="m-content-right-icon-field ">
                        <MISAInput 
                        ref="txtRequireWearRate" 
                        :controlledContent="assetForm.wearRate" 
                        :tag="'wearRate'" 
                        :type="'number'" 
                        @bindingData="bindingData" 
                        :title="'Tỷ lệ hao mòn không được trống'"
                        :fieldName="'Tỷ lệ hao mòn'"
                        />
                        <div @click="this.assetForm.wearRate++" class="field-incre-btn"></div>
                        <div @click="this.assetForm.wearRate > 0 ? this.assetForm.wearRate-- :this.assetForm.wearRate" class="field-decre-btn"></div>
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Giá trị hao mòn năm <span style="color: red">*</span></label>
                    <div class="m-content-right-field">
                        <!-- <input ref="txtRequireWearPearYear" :value="calcWearPerYear" class="m-field-input" type="text"> -->
                        <MISAInput 
                        :controlledContent="calcWearPerYear"
                        :type="'text'" 
                        @bindingData="bindingData" 
                        v-model="calcWearPerYear"
                        ref="txtRequireWearPerYear"
                        :fieldName="'Giá trị hao mòn năm'"
                        :title="'Giá trị hao mòn năm không đưỢc để trống'" />
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
        <ValidateAlert
        :isShowAlert="showValidateAlert"
        :message="nullFields"
        @selectOption="this.showValidateAlert = false"
        />
        
    </div>
</template>

<script>
import axios from 'axios';
import Combobox from '../components/base/MISACombobox.vue';
import CancelAlert from '../views/CancelAlertDialog.vue';
import Datepicker from '@vuepic/vue-datepicker';
import MISAInput from '../components/base/MISAInput.vue';
import ValidateAlert from '../views/ValidateAlertDialog.vue'

export default {
    props:["isShow","newAssetCode","formMode","assetSelected"],
    components:{
        Combobox,
        CancelAlert,
        Datepicker,
        MISAInput,
        ValidateAlert,
    },
    mounted() {
        /**
        * Mô tả : Hàm mount lấy giá trị đc truyền vào từ bảng ngay khi mount
        * @param
        * @return
        * Created by: nbtin
        * Created date: 11:43 08/05/2022
        */
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
        

    },
    methods:{
        /**
        * Mô tả : Chặn sự kiện nhập chữ ở các ô input số
        * @param $event
        * Created by: nbtin
        * Created date: 11:44 08/05/2022
        */
        isNumber($event) {
            let keyCode = $event.keyCode ? $event.keyCode : $event.which;
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                // 46 is dot
                $event.preventDefault();
            }
        },
        /**
        * Mô tả : Bắt sự kiện đóng form
        * Created by: nbtin
        * Created date: 13:39 22/04/2022
        */
        closeAddStaffForm(){
            
            this.handleCancelAlert();
            
        },  
        /**
        * Mô tả : Reset form khi close form
        * Created by: nbtin
        * Created date: 11:45 08/05/2022
        */
        resetForm(control){
            control.showCancelAlert = false;
            control.$emit("closeStaffDialog",false);
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
        * Mô tả : Chuyển chuỗi format thành số bằng cách loại dấu chấm
        * @param value
        * Created by: nbtin
        * Created date: 11:45 08/05/2022
        */
        formatToInt(value){
            return value.toString().replaceAll('.','');
        },
        // Hiện popup và xử lý khi muốn đóng form 
        handleCancelAlert(){
            this.showCancelAlert = true;
        },
        /**
        * Mô tả : Xử lý khi người dùng chọn ở cancel alert
        * @param option
        * Created by: nbtin
        * Created date: 11:46 08/05/2022
        */
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
        /**
        * Mô tả : Emit lên trạng thái của API khi bấm nút lưu, nhằm hiện toast message phù hợp
        * @param status
        * Created by: nbtin
        * Created date: 11:46 08/05/2022
        */
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
        * Mô tả : Tính lại các trường cần thiết trước khi lưu
        * Created by: nbtin
        * Created date: 11:49 08/05/2022
        */
        calAllFieldToSave(){
            
            this.assetForm.assetId = this.assetForm.code;
            // this.assetForm.wearPerYear = this.calcWearPerYear.toString().replaceAll(".","");
            this.assetForm.accumulate = (this.assetForm.wearPerYear.toString().replaceAll(".","") * this.assetForm.yearsUse).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            this.assetForm.priceExtra = (this.assetForm.price.toString().replaceAll(".","") - this.assetForm.accumulate.toString().replaceAll(".","")).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            this.assetForm.price = this.assetForm.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        /**
        * Mô tả : Check lại tất cả các trường nào còn rỗng trên form
        * Created by: nbtin
        * Created date: 11:49 08/05/2022
        */
        checkNullProperty(){
            var check = true;
            var object = this.assetForm;
            this.nullValueProperty = [];
            this.nullFields = [];   
            // Lấy tất cả các trường rỗng push vào 1 mảng
            for(let property in object){
                if(object[property] == "" || object[property] == "0" || object[property] == null){
                    this.nullValueProperty.push(property);
                    check = false;
                }
            }
            // So sánh mảng các trường rỗng với mảng ref, trường nào có trong mảng ref thì alert danger
            for(let key of Object.entries(this.$refs)){
                for(let value of this.nullValueProperty){
                    if(key[0].toLowerCase().includes(value.toLowerCase())){
                        this.$refs[key[0]].isAlert = true;
                        this.nullFields.push(" " + this.$refs[key[0]].fieldName);
                    }
                }
            }
            return check;
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
            // Thêm 
            if(check == true){
                if(this.formMode == 1){
                   let status = false;
                    await axios.post("https://62591883c5f02d964a4c41d3.mockapi.io/assets",me.assetForm).then(function(res){
                        console.log(res);
                        status = true;
                        // Gán mã tự động tăng cho lần mở form tiếp theo
                        me.$emit("getAsset");
                        me.$emit("getNewCodeIncre",me.assetForm.code);
                    }).catch(function(err){
                        console.log(err);
                        status = false;
                    }).then(function(){
                        // Thông báo là gọi api thành công hay thất bại để hiện toast
                        me.setStatus(status);
                    })
                    
                    
                } else if(this.formMode == 0){ // Sửa
                    try{
                        await axios.put(`https://62591883c5f02d964a4c41d3.mockapi.io/assets/`+ me.assetForm.id, me.assetForm).then(function(res){
                            console.log(res);
                            me.setStatus(true);
                            me.$emit("getAsset");
                        })
                    } catch (err){
                        console.log(err);
                        this.assetForm = me.assetSelectedStore;
                        me.setStatus(false);
                    }
                    
                }
            } else{
                this.showValidateAlert = true;
            }
        },
       
    },
    computed: {
        // Tính giá trị hao mòn năm mỗi khi có thay đổi 
        calcWearPerYear: {
            get: function () {
                
                return this.formatPrice(this.assetForm.wearPerYear);
            },
                // setter
            set: function (newValue) {
                newValue = this.formatToInt(newValue);
                this.assetForm.wearPerYear =  newValue;

            }
        },
        // Lấy năm hiện tại cho trường năm theo dõi
        getThisYear(){
            const d = new Date();
            let year = d.getFullYear();
            return year;
        },
        // Thực hiện format trường Nguyên giá
        priceFormat: {
            get: function () {
                return this.formatPrice(this.assetForm.price)
                
                // this.assetForm.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            },
                // setter
            set: function (newValue) {
                newValue = this.formatToInt(newValue);
                //  newValue.toString().replaceAll('.','');
                this.assetForm.price =  newValue;
                this.assetForm.wearPerYear = (this.assetForm.wearRate * parseInt(this.assetForm.price))/100;
                this.assetForm.wearPerYear = Math.floor(this.assetForm.wearPerYear);
            }
        }
    },
    watch: {
        /**
        * Mô tả : Tính lại giá trị hao mòn năm mỗi khi có thay đổi của tỷ lệ hao mòn, nhưng thế này chưa tối ưu
        * Created by: nbtin
        * Created date: 11:51 08/05/2022
        */
        'assetForm.wearRate': function(){
            this.assetForm.wearPerYear = (this.assetForm.wearRate * this.formatToInt(this.assetForm.price))/100;
            this.assetForm.wearPerYear = Math.floor(this.assetForm.wearPerYear);
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
                wearPerYear: 0,
                accumulate: 0,
                priceExtra: 0,
                assetId: 0,
                buyDate: new Date(),
                useDate: new Date(),
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
            showValidateAlert: false,
            nullFields: [],
        }
    },
}
</script>

<style>
    
</style>