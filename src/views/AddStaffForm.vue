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
                        ref="txtRequireFixedAssetCode"
                        :controlledContent="assetForm.FixedAssetCode" 
                        :tag="'FixedAssetCode'" 
                        @bindingData="bindingData" 
                        :fieldName="'Mã tài sản'"
                        :title="'Mã tài sản không được để trống'" 
                        :placeholder="'Nhập mã tài sản'" 
                        maxlength="100"
                        />
                    </div>
                </div>
                <div class="col-8">
                    <label for="">Tên tài sản<span style="color: red"> *</span></label>
                       <!-- <input ref="" autocomplete="on" placeholder="Nhập tên tài sản" v-model="assetForm.name" class="m-field-input mt-input" type="text"> -->
                    <MISAInput 
                    ref="txtRequireFixedAssetName" 
                    :controlledContent="assetForm.FixedAssetName" 
                    :tag="'FixedAssetName'" 
                    @bindingData="bindingData" 
                    :title="'Tên tài sản không được để trống'" 
                    :placeholder="'Nhập tên tài sản'" 
                    :fieldName="'Tên tài sản'"
                    maxlength="255"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Mã bộ phận sử dụng <span style="color: red"> *</span></label>
                    <Combobox 
                    class="mt-10"
                    ref="txtRequireDepartmentCode" 
                    :tag="'DepartmentCode'" 
                    :fieldName="'Mã bộ phận sử dụng'"
                    :placeholder="'Chọn mã bộ phận sử dụng'"
                    :title="'Mã bộ phận không được để trống'"
                    :control="assetForm.DepartmentCode" 
                    @getComboSelected="getDepartment"
                    maxlength="50"
                    />
                </div>
                <div class="col-8">
                    <label for="">Tên bộ phận sử dụng</label>
                    <div><input v-model="assetForm.DepartmentName" class="m-field-input readonly mt-input" maxlength="255" type="text" disabled></div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Mã loại tài sản <span style="color: red">*</span></label>
                    <Combobox
                    class="mt-10"
                    ref="txtRequireFixedAssetCategoryCode" 
                    :tag="'FixedAssetCategoryCode'" 
                    placeholder="Chọn mã loại tài sản"
                    :title="'Mã loại tài sản không được để trống'" 
                    :control="assetForm.FixedAssetCategoryCode" 
                    @getComboSelected="getTypeAsset"
                    :fieldName="'Mã loại tài sản'"
                    maxlength="50"
                    />
                </div>
                <div class="col-8">
                    <label for="">Tên loại tài sản</label>
                    <div><input v-model="assetForm.FixedAssetCategoryName" class="m-field-input readonly mt-input" type="text" maxlength="255" disabled></div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Số lượng <span style="color: red">*</span></label>
                    <div class="m-content-right-icon-field">
                        <MISAInput :controlledContent="assetForm.Quantity"
                        @bindingData="bindingData"
                        :tag="'Quantity'"
                        @keypress="isNumber"
                        :title="'Số lượng phải nhiều hơn 0'"
                        ref="txtRequireQuantity"
                        :fieldName="'Số lượng'"
                        maxlength="11"
                        />
                        <div @click="this.assetForm.Quantity++" class="field-incre-btn"></div>
                        <div @click="this.assetForm.Quantity > 0 ? this.assetForm.Quantity-- : this.assetForm.Quantity" class="field-decre-btn"></div>
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
                        maxlength="25"
                        />
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Số năm sử dụng <span style="color: red">*</span></label>
                    <div class="m-content-right-field">
                        <MISAInput
                        :controlledContent="assetForm.LifeTime"
                        @bindingData="bindingData"
                        :tag="'LifeTime'"
                         @keypress="isNumber"
                        :title="'Số lượng phải nhiều hơn 0'"
                        :fieldName="'Số năm sử dụng'"
                        ref="txtRequireLifeTime"
                        maxlength="11"
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
                        :controlledContent="calDepreciationRate" 
                        :tag="'DepreciationRate'" 
                        :type="'number'" 
                        v-model="calDepreciationRate"
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
                        <!-- <input ref="txtRequireWearPearYear" :value="calcDepreciationPerYear" class="m-field-input" type="text"> -->
                        <MISAInput 
                        :controlledContent="calcDepreciationPerYear"
                        :type="'text'" 
                         @keypress="isNumber"
                        @bindingData="bindingData" 
                        v-model="calcDepreciationPerYear"
                        maxlength="25"
                        ref="txtRequireDepreciationPerYear"
                        :fieldName="'Giá trị hao mòn năm'"
                        :title="'Giá trị hao mòn năm không đưỢc để trống'" />
                    </div>
                </div>
                <div class="col-4">
                    <label for="">Năm theo dõi <span style="color: red"></span></label>
                    <div class="m-content-right-field mt-input">
                        <input :value="assetForm.TrackedYear" disabled="true" class="m-field-input readonly" type="text">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="">Ngày mua <span style="color: red">*</span></label>
                    
                    <MISADatepicker
                        @getDate="newValue => this.assetForm.PurchaseDate = newValue"
                        :control="this.assetForm.PurchaseDate"
                    />
                </div>
                <div class="col-4">
                    <label for="">Ngày bắt đầu sử dụng <span style="color: red">*</span></label>
                    
                    <MISADatepicker
                        @getDate="newValue => this.assetForm.UseDate = newValue"
                        :control="this.assetForm.UseDate"
                    />
                </div>
                <div class="col-4"></div>
            </div>
        </div>
        <div class="form-action">
            <button 
            class="m-second-button ignore-btn" 
            @click="closeAddStaffForm"
            v-shortkey="['esc']" @shortkey="closeAddStaffForm()"
            >Hủy</button>
            <button 
            id="form-save-button" 
            class="m-button" 
            @click="saveAsset"
            v-shortkey="['ctrl','f']" @shortkey="saveAsset()"
            
            >Lưu</button>
        </div>
        <CancelAlert 
        v-if="showCancelAlert"
        :formMode="this.formMode"
        @getCancelOption="handleCancelOption"
        />
        <ValidateAlert
        v-if="showValidateAlert"
        :message="errMesage()"
        @selectOption="handleSelectValidate"
        />
        
        
    </div>
</template>

<script>
import axios from 'axios';
import Combobox from '../components/base/MISACombobox.vue';
import CancelAlert from '../views/CancelAlertDialog.vue';

import MISAInput from '../components/base/MISAInput.vue';
import ValidateAlert from '../views/ValidateAlertDialog.vue';
import messageResource from '../resources/resource';
import MISADatepicker from '../components/base/MISADatepicker.vue';

export default {
    props:["isShow","newAssetCode","formMode","assetSelected"],
    components:{
        Combobox,
        CancelAlert,
        MISAInput,
        ValidateAlert,
        MISADatepicker,
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
            // Nếu formmode là 1 (thêm) thì lấy mã mới
            await this.getNewCode();
        } else if (this.formMode == 0){
            // Nếu formmode là 0 (sửa) thì lấy ra asset đã được chọn từ API
            this.assetSelectedStore = {...this.assetSelected};
            this.assetForm = this.assetSelected;
        } else if(this.formMode == 2){
            // Nếu formmode là 2 (Nhân bản) thì lấy ra asset được chọn từ API đồng thời thay mã mới tự sinh
            this.assetForm = this.assetSelected;
            await this.getNewCode();
            
        }
        // Gán focus vào ô đầu tiên khi vừa mở form
        this.$refs.txtRequireFixedAssetCode.setFocus();
    },
    methods:{
        /**
        * Mô tả: Bind ngày từ datepicker
        * @param
        * @return
        * Created by: nbtin
        * Created date: 20:00 30/05/2022
        */
        getDate(value){
            console.log(value);
        },
        /**
        * Mô tả: Xử lý focus vào ô rỗng đầu tiên sau khi đóng validate rỗng
        * @param
        * @return
        * Created by: nbtin
        * Created date: 15:27 30/05/2022
        */
        handleSelectValidate(){
            this.showValidateAlert = false;
            for(let key of Object.entries(this.$refs)){
                // focus vào ô lỗi đầu tiên
                // this.$refs[key[0]].setFocus();
                var checkFocus = false;
                for(let value of this.nullValueProperty){
                    if(key[0].toLowerCase().includes(value.toLowerCase())){
                        // console.log(this.$refs[key[0]].$el.children[0].children[1]);
                        // console.log(this.$refs[key[0]]);
                        this.$refs[key[0]].setFocus();
                        checkFocus = true;
                        break;
                    }
                    
                }
                // Kiểm tra xem đã focus đc ô đầu tiên chưa 
                if(checkFocus == true) break;
            }
        },
        /**
        * Mô tả: Chọn ra câu cảnh báo khi có lỗi
        * @param
        * @return
        * Created by: nbtin
        * Created date: 13:11 23/05/2022
        */
        errMesage(){
            
            if(this.nullFields.length > 0){
                // Nếu mảng các trường rỗng có tồn tại rỗng thì thông báo rỗng trước tiên
                return messageResource.VALIDATE_NULL + this.nullFields;
            } else if(this.isDuplicate == true) {
                this.isDuplicate = false;
                return messageResource.VALIDATE_DUPLICATE_CODE;
                
            }
            else return this.validateDataMsg;
        },
        /**
        * Mô tả : Lấy code mới từ API
        * @param
        * @return
        * Created by: nbtin
        * Created date: 15:33 22/05/2022
        */
        async getNewCode(){
            var me = this;
            /**
            * Mô tả : Lấy code mới từ API khi chọn thêm tài sản
            * Created by: nbtin
            * Created date: 16:34 12/05/2022
            */
            await axios.get("http://localhost:5062/api/v1/FixedAssets/NewAssetCode").then(function(res){
                console.log(res);
                // Gán lại mã mới 
                me.assetForm.FixedAssetCode = res.data;
            }).catch(function(err){
                console.log("Lỗi:" +  err);
            })
        },
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
        * Mô tả : Chuyển chuỗi format thành số bằng cách loại bỏ dấu chấm
        * @param value
        * Created by: nbtin
        * Created date: 11:45 08/05/2022
        */
        formatToInt(value){
            return value.toString().replaceAll('.','');
        },
        // Hiện alert cảnh báo và xử lý khi muốn đóng form 
        handleCancelAlert(){
            this.showCancelAlert = true;
        },
        /**
        * Mô tả : Xử lý khi người dùng chọn option button ở cancel alert
        * @param option
        * Created by: nbtin
        * Created date: 11:46 08/05/2022
        */
        handleCancelOption(option){
            switch(option){
                case false: {
                    // Đóng alert
                    this.showCancelAlert = false;
                    break;
                }
                case true:{
                    // Đóng form
                    this.resetForm(this);
                    break;
                }
                case 'nosave':{
                    // Không lưu và đóng form
                    this.assetForm = this.assetSelectedStore;
                    this.resetForm(this);
                    break;
                }
                case 'save':{
                    // Lưu và đóng form
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
        setStatus(status,message){
            if(status == true){
                this.resetForm(this);
                this.$emit("getStatusSave",true,message);
            } else {
                this.resetForm(this);
                this.$emit("getStatusSave",false,message);
            }
            
        },
        /**
        * Mô tả : Tính lại các trường cần thiết trước khi lưu
        * Created by: nbtin
        * Created date: 11:49 08/05/2022
        */
        calAllFieldToSave(){
            //  Tính giá trị hao mòn năm, hao mòn lũy kế, giá trị còn lại khi có sự thay đổi, cập nhật id thêm
            this.assetForm.ProductionYear = Number(this.assetForm.TrackedYear) - Number(new Date(this.assetForm.UseDate).getFullYear());
            this.assetForm.Accumulate = this.assetForm.ProductionYear * Number(this.assetForm.DepreciationPerYear);
        },
        /**
        * Mô tả : Check lại tất cả các trường nào còn rỗng trên form
        * Created by: nbtin
        * Created date: 11:49 08/05/2022
        */
        checkNullProperty(){
            var check = true;
            var object = this.assetForm;
            // Mảng chứa các giá trị rỗng để xét null, và các trường rỗng để hiện thông báo
            this.nullValueProperty = [];
            this.nullFields = [];   
            // Lấy tất cả các trường rỗng push vào 1 mảng (so sánh giá trị của object)
            for(let property in object){
                if(object[property] === "" || object[property] === null){
                    this.nullValueProperty.push(property);
                    check = false;
                }
            }
            // So sánh mảng các trường rỗng với mảng ref, trường nào có trong mảng ref thì push vào mảng các trường rỗng
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
        * Mô tả : Xử lý validate nghiệp vụ
        * Created by: nbtin
        * Created date: 22:53 19/05/2022
        */
        checkValidateData(){
            var check = true;
            this.validateDataMsg = '';
            // If trong trường hợp là số nguyên hay số hữu tỉ, nếu là số hữu tỉ thì làm tròn đến 2 chữ số
            if(Number.isInteger(1/this.assetForm.LifeTime)){
                // Xét nếu tỉ lệ hao mòn năm khác 1/số năm sử dụng
                if(1/this.assetForm.LifeTime != Number(this.assetForm.DepreciationRate)/100 && this.assetForm.LifeTime != 0){
                    this.validateDataMsg = messageResource.VALIDATE_DEPRECIATION_RATE;
                    check = false;
                    return check;
                }
            }
            else {
                if(Number((1/this.assetForm.LifeTime).toFixed(4)) != Number(Number((this.assetForm.DepreciationRate)/100).toFixed(4)) && this.assetForm.LifeTime != 0){
                    this.validateDataMsg = messageResource.VALIDATE_DEPRECIATION_RATE;
                    check = false;
                    return check;
                }
            }
            // Kiểm tra nếu giá trị hao mòn năm lớn hơn nguyên giá
            if(Number(this.assetForm.DepreciationPerYear) > Number(this.assetForm.Cost)){
                this.validateDataMsg = messageResource.VALIDATE_DEPRECIATION_YEAR;
                check = false;
                return check;
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
                this.assetForm.DepartmentId = value.itemData.DepartmentId;
                this.assetForm.DepartmentName = value.itemData.DepartmentName;
                this.assetForm.DepartmentCode = value.itemData.DepartmentCode;
            } else {
                this.assetForm.DepartmentName = "";
                this.assetForm.DepartmentCode = "";
            }
        },
        /**
        * Mô tả : Lấy dữ liệu mã bộ phận sử dụng, loại tài sản từ combobox
        * Created by: nbtin
        * Created date: 08:34 25/04/2022
        */
        getTypeAsset(value){
            if(value.itemData != null){
                this.assetForm.FixedAssetCategoryId = value.itemData.FixedAssetCategoryId;
                this.assetForm.FixedAssetCategoryName = value.itemData.FixedAssetCategoryName;
                this.assetForm.DepreciationRate = value.itemData.DepreciationRate * 100;
                this.assetForm.LifeTime = value.itemData.LifeTime;
                this.assetForm.FixedAssetCategoryCode = value.itemData.FixedAssetCategoryCode;
                this.assetForm.DepreciationPerYear = (this.assetForm.DepreciationRate * this.assetForm.Cost)/100;
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
            var me = this;
            // Gọi hàm tính lại các trường trước khi 'Lưu'
            me.calAllFieldToSave();
            // Gọi hàm check xem có trường rỗng hay không trước khi Lưu
            let check = me.checkNullProperty();
            if(check == false){
                this.showValidateAlert = true;
            }
            else if (check == true){
                // Sau khi check rỗng thì mới check nghiệp vụ
                check = me.checkValidateData();
                if(check == false){
                    this.showValidateAlert = true;
                } else if(check == true){
                    // Nếu điều kiện thỏa mãn, bắt formmode để biết form trạng thái gì (0: Sửa, 1: Thêm, 2: Nhân bản)
                    if(this.formMode == 1 || this.formMode == 2){
                        let status = false;
                        let message = "";
                        console.log(me.assetForm);
                        //Gọi hàm để thêm tài sản lên api
                        await axios.post("http://localhost:5062/api/v1/FixedAssets",me.assetForm)
                        .then(function(res){
                            console.log('post status', res);
                            // data = 1 là lưu dữ liệu thành công (Execute)
                            if(res.data != 1){
                                // Xử lý nếu call POST API thất bại
                                var errMsg = res.data.data.data[0];
                                // Nếu lỗi trả về có chữ "trùng" thì hiện thông báo mã tài sản đã trùng (check trùng)
                                if(errMsg.includes("trùng")){
                                    me.isDuplicate = true;
                                    me.showValidateAlert = true;
                                }else {
                                    status = false;
                                    message = messageResource.SAVE_FAILED;
                                    me.setStatus(status, message);
                                }
                            } else {
                                status = true;
                                message = messageResource.SAVE_SUCCESS;
                                // Gán mã tự động tăng cho lần mở form tiếp theo
                                me.$emit("getAsset");
                                me.setStatus(status, message);
                            }
                            
                        })
                    } else if(this.formMode == 0){ // Nếu formmode là 0 (sửa) thì 
                        let message = "";
                        let status = "";
                        // Gọi API Put để updat
                        await axios.put(`http://localhost:5062/api/v1/FixedAssets/`+ me.assetForm.FixedAssetId, me.assetForm)
                        .then(function(res){
                            console.log(res);
                            status = true;
                            // Hiện thông báo thành công
                            message = messageResource.EDIT_SUCCESS;
                            me.$emit("getAsset");
                            me.setStatus(status, message);
                        }).catch(function(err){
                            var errMsg = err.response.data.data.data[0];
                            if(errMsg.includes("trùng")){
                                me.isDuplicate = true;
                                me.showValidateAlert = true;
                            }else {
                                status = false;
                                // Hiện thông báo thất bại
                                message = messageResource.EDIT_FAILED;
                                me.setStatus(status, message);
                            }
                            console.log(err);
                        })
                    }
                }   
            }
        },
       
    },
    computed: {
        // Lấy năm hiện tại cho trường năm theo dõi
        getThisYear(){
            const d = new Date();
            let year = d.getFullYear();
            return year;
        },
        // Format giá trị hao mòn năm
        calcDepreciationPerYear: {
            get: function () {
                
                return this.formatPrice(this.assetForm.DepreciationPerYear);
            },
                // setter
            set: function (newValue) {
                newValue = this.formatToInt(newValue);
                this.assetForm.DepreciationPerYear =  newValue;

            }
        },
        
        // Thực hiện format trường Nguyên giá đồng thời tính lại giá trị hao mòn năm
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
                this.assetForm.DepreciationPerYear = (this.assetForm.DepreciationRate * parseInt(this.assetForm.Cost))/100;
                this.assetForm.DepreciationPerYear = Math.floor(this.assetForm.DepreciationPerYear);
            }
        },
        // Thực hiện format tỷ lệ hao mòn đồng thời tính lại giá trị hao mòn năm
        calDepreciationRate: {
            get: function(){
                return this.assetForm.DepreciationRate;
            },
            set: function(newValue){
                this.assetForm.DepreciationRate =  newValue;
                this.assetForm.DepreciationPerYear = (newValue * parseInt(this.assetForm.Cost))/100;
                this.assetForm.DepreciationPerYear = Math.floor(this.assetForm.DepreciationPerYear);
            }
        }
    },
    watch: {  
        // 'assetForm.DepreciationRate': function(newValue,oldValue){
        //     // if(this.assetForm.DepreciationPerYear == (this.assetForm.Cost * oldValue)/100){
        //         console.log(oldValue);
        //         this.assetForm.DepreciationPerYear = this.assetForm.Cost * (newValue/100);
        //     // }
        // }
    },
    data() {
        return {
            assets:{},
            asset:{},
            assetForm :{
                FixedAssetCode: '',
                FixedAssetName:'',
                Quantity: 1,
                Cost: 0,
                DepreciationRate: 0,
                LifeTime: 0,
                DepreciationPerYear: 0,
                accumulate: 0,
                priceExtra: 0,
                PurchaseDate: new Date(),
                UseDate: new Date(),
                ProductionYear: 0,
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
            showImportExcelDialog: false,
            nullFields: [],
            validateDataMsg: "",
            isDuplicateCode: false,
        }
    },
}
</script>

<style>
    
</style>