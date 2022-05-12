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
                        ref="txtRequireAssetCode"
                        :controlledContent="assetForm.AssetCode" 
                        :tag="'AssetCode'" 
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
                    ref="txtRequireAssetName" 
                    :controlledContent="assetForm.AssetName" 
                    :tag="'AssetName'" 
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
                    ref="txtRequireDepartmentCode" 
                    :tag="'DepartmentCode'" 
                    :fieldName="'Mã bộ phận sử dụng'"
                    :placeholder="'Chọn mã bộ phận sử dụng'"
                    :title="'Mã bộ phận không được để trống'"
                    :control="assetForm.DepartmentCode" 
                    @getComboSelected="getDepartment"/>
                </div>
                <div class="col-8">
                    <label for="">Tên bộ phận sử dụng</label>
                    <div><input v-model="assetForm.DepartmentName" class="m-field-input readonly mt-input" type="text" disabled></div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Mã loại tài sản <span style="color: red">*</span></label>
                    <Combobox
                    ref="txtRequireFixedAssetCategoryCode" 
                    :tag="'FixedAssetCategoryCode'" 
                    placeholder="Chọn mã loại tài sản"
                    :title="'Mã loại tài sản không được để trống'" 
                    :control="assetForm.FixedAssetCategoryCode" 
                    @getComboSelected="getTypeAsset"
                    :fieldName="'Mã loại tài sản'"
                    />
                </div>
                <div class="col-8">
                    <label for="">Tên loại tài sản</label>
                    <div><input v-model="assetForm.FixedAssetCategoryName" class="m-field-input readonly mt-input" type="text" disabled></div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Số lượng <span style="color: red">*</span></label>
                    <div class="m-content-right-icon-field">
                        <MISAInput :controlledContent="assetForm.Quantity"
                        @bindingData="bindingData"
                        :tag="'Quantity'"
                        :title="'Số lượng phải nhiều hơn 0'"
                        :type="'number'"
                        ref="txtRequireQuantity"
                        :fieldName="'Số lượng'"
                        />
                        <div @click="this.assetForm.Quantity++" class="field-incre-btn"></div>
                        <div @click="this.assetForm.Quantity > 0 ? this.assetForm.Quantity-- :this.assetForm.Quantity" class="field-decre-btn"></div>
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Nguyên giá <span style="color: red">*</span></label>
                    <div class="m-content-right-field">
                        <!-- <input class="m-field-input" v-model="priceFormat" type="text"> -->
                        <MISAInput :controlledContent="priceFormat"
                        @keypress="isNumber"
                        @bindingData="bindingData"
                        v-model="priceFormat"
                        :tag="'priceFormat'"
                        :title="'Nguyên giá phải nhiều hơn 0'"
                        :type="'text'"
                        :fieldName="'Nguyên giá'"
                        ref="txtRequireCost"
                        />
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Số năm sử dụng <span style="color: red">*</span></label>
                    <div class="m-content-right-field">
                        <MISAInput :controlledContent="assetForm.LifeTime"
                        @bindingData="bindingData"
                        :tag="'LifeTime'"
                        :title="'Số lượng phải nhiều hơn 0'"
                        :type="'number'"
                        :fieldName="'Số năm sử dụng'"
                        ref="txtRequireLifeTime"
                        />
                    </div>  
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Tỷ lệ hao mòn (%) <span style="color: red">*</span></label>
                    <div class="m-content-right-icon-field ">
                        <MISAInput 
                        ref="txtRequireDepreciationRate" 
                        :controlledContent="assetForm.DepreciationRate" 
                        :tag="'DepreciationRate'" 
                        :type="'number'" 
                        @bindingData="bindingData" 
                        :title="'Tỷ lệ hao mòn không được trống'"
                        :fieldName="'Tỷ lệ hao mòn'"
                        />
                        <div @click="this.assetForm.DepreciationRate++" class="field-incre-btn"></div>
                        <div @click="this.assetForm.DepreciationRate > 0 ? this.assetForm.DepreciationRate-- :this.assetForm.DepreciationRate" class="field-decre-btn"></div>
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
                        <input :value="assetForm.TrackedYear" readonly class="m-field-input readonly" type="text">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Ngày mua <span style="color: red">*</span></label>
                    <div class="datepicker-container">
                        <Datepicker 
                        class="mt-input input-datepicker"
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
    async mounted() {
        /**
        * Mô tả : Hàm mount lấy giá trị đc truyền vào từ bảng ngay khi mount
        * @param
        * @return
        * Created by: nbtin
        * Created date: 11:43 08/05/2022
        */
        if(this.formMode == 1){
            var me = this;
            /**
            * Mô tả : Lấy code mới từ API khi chọn thêm tài sản
            * Created by: nbtin
            * Created date: 16:34 12/05/2022
            */
            await axios.get("https://localhost:7062/api/v1/FixedAsset/NewAssetCode").then(function(res){
                console.log(res);
                me.assetForm.AssetCode = res.data;
            }).catch(function(err){
                console.log("Lỗi:" +  err);
            })
            // Với form là thêm, message khi cancel form là 
        } else if (this.formMode == 0){
            this.assetForm.AssetCode = this.newAssetCode;
            this.assetSelectedStore = {...this.assetSelected};
            this.assetForm = this.assetSelected;
            this.assetForm.AssetCode = this.assetForm.AssetId;
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
            
            // this.assetForm.AssetId = this.assetForm.code;
            // this.assetForm.wearPerYear = this.calcWearPerYear.toString().replaceAll(".","");
            this.assetForm.accumulate = (this.assetForm.wearPerYear.toString().replaceAll(".","") * this.assetForm.yearsUse).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            this.assetForm.priceExtra = (this.assetForm.Cost.toString().replaceAll(".","") - this.assetForm.accumulate.toString().replaceAll(".","")).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            // this.assetForm.Cost = this.assetForm.Cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
                this.assetForm.DepartmentName = value.itemData.name;
                this.assetForm.DepartmentCode = value.itemData.code;
            } else {
                this.assetForm.DepartmentName = "";
                this.assetForm.DepartmentCode = "";
            }
        },
        // Lấy mã tài sản, đồng thời binding tỷ lệ hao mòn, số năm sử dụng
        getTypeAsset(value){
            if(value.itemData != null){
                this.assetForm.FixedAssetCategoryName = value.itemData.name;
                this.assetForm.DepreciationRate = value.itemData.DepreciationRate;
                this.assetForm.LifeTime = value.itemData.LifeTime;
                this.assetForm.FixedAssetCategoryCode = value.itemData.code;
            } else {
                this.assetForm.FixedAssetCategoryName = "";
                this.assetForm.DepreciationRate = 0;
                this.assetForm.LifeTime = 0;
                this.assetForm.FixedAssetCategoryCode = "";
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
        },
        /**
        * Mô tả : Cất giữ liệu vào database
        * Created by: nbtin
        * Created date: 13:39 22/04/2022
        */
        async saveAsset(){
            // var testObject = {
            //     // AssetCode: "1232123",
            //     // AssetName: "string",
            //     // DepartmentCode: "3123213",
            //     // DepartmentName: "string",
            //     // FixedAssetCategoryCode: "3123123",
            //     // FixedAssetCategoryName: "string",
            //     // Cost: 10,
            //     // Quantity: 10,
            //     // DepreciationRate: 10,
            //     // TrackedYear: 10,
            //     // LifeTime: 10,
            //     // purchaseDate: "2022-05-12T08:08:00.913Z",
            //     AssetCode: "TS00021",
            //     AssetName: "Test theem 2",
            //     Cost: 10000000,//
            //     DepartmentCode: "HCKT",
            //     DepartmentName: "Hành chính kế toán",
            //     DepreciationRate: 2.5,
            //     FixedAssetCategoryCode: "MTXT",
            //     FixedAssetCategoryName: "Máy tính xách tay",
            //     LifeTime: 5,
            //     PurchaseDate: "2022-05-12T08:08:00.913Z",
            //     Quantity: 1,
            //     accumulate: "NaN",
            //     priceExtra: "NaN",
            //     priceFormat: "10.000.000",
            //     wearPerYear: 250000,
            //     TrackedYear: 2020
            // };
            //  await axios.post("https://localhost:7062/api/v1/FixedAsset",testObject).then(function(res){
            //             console.log(res);
            //             // Gán mã tự động tăng cho lần mở form tiếp theo
            //         }).catch(function(err){
            //             console.log(err);
            //         }).then(function(){
            //             // Thông báo là gọi api thành công hay thất bại để hiện toast
            //         })




            //  Tính giá trị hao mòn năm, hao mòn lũy kế, giá trị còn lại khi có sự thay đổi, cập nhật id thêm
            var me = this;
            me.calAllFieldToSave();
            let check = me.checkNullProperty();
            // Thêm 
            if(check == true){
                if(this.formMode == 1){
                   let status = false;
                   console.log(me.assetForm);
                    await axios.post("https://localhost:7062/api/v1/FixedAsset",me.assetForm).then(function(res){
                        console.log(res);
                        status = true;
                        // Gán mã tự động tăng cho lần mở form tiếp theo
                        me.$emit("getAsset");
                        me.$emit("getNewCodeIncre",me.assetForm.AssetCode);
                    }).catch(function(err){
                        console.log(err);
                        status = false;
                    }).then(function(){
                        // Thông báo là gọi api thành công hay thất bại để hiện toast
                        me.setStatus(status);
                    })
                    
                    
                } else if(this.formMode == 0){ // Sửa
                    try{
                        
                        await axios.put(`https://localhost:7062/api/v1/FixedAsset/`+ me.assetForm.AssetId, me.assetForm).then(function(res){
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
                return this.formatPrice(this.assetForm.Cost)
                
                // this.assetForm.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            },
                // setter
            set: function (newValue) {
                newValue = this.formatToInt(newValue);
                //  newValue.toString().replaceAll('.','');
                this.assetForm.Cost =  newValue;
                this.assetForm.wearPerYear = (this.assetForm.DepreciationRate * parseInt(this.assetForm.Cost))/100;
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
            this.assetForm.wearPerYear = (this.assetForm.DepreciationRate * this.formatToInt(this.assetForm.Cost))/100;
            this.assetForm.wearPerYear = Math.floor(this.assetForm.wearPerYear);
        },  
    },
    data() {
        return {
            assets:{},
            asset:{},
            assetForm :{
                AssetCode: '',
                AssetName:'',
                Quantity: 1,
                Cost: 0,
                DepreciationRate: 0,
                LifeTime: 0,
                wearPerYear: 0,
                accumulate: 0,
                priceExtra: 0,
                PurchaseDate: "2022-05-12T08:08:00.913Z",
                // ProductionYear: new Date(),
                FixedAssetCategoryName: "",
                DepartmentName: "",
                DepartmentCode: "",
                FixedAssetCategoryCode: "",
                TrackedYear: new Date().getFullYear()
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