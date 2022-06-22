<template>
    <div class="overlay"></div>
    <div class="edit-asset-license m-dialog" style="height: auto">
        <MISALoading v-if="isLoadingSubmitBtn" />
        <div class="top-form-row">
            <p class="heading">Sửa tài sản {{this.licenseAssetSelected.FixedAssetName}}</p>
            <button class=" close-form-btn" 
            v-shortkey="['esc']"
            @shortkey="closeEditForm()"
            @click="closeEditForm()"></button>
        </div>
        <div class="edit-asset-license-content">
            <div class="row">
                <div class="col-8">
                    <label>Bộ phận sử dụng</label>
                    <MISAInput
                    disabled="true"
                    :controlledContent="this.licenseAssetSelected.DepartmentName"
                    />
                </div>
            </div>
            <div class="row">
                <p class="heading" style="font-size: 14px; margin-bottom: 0">Nguyên giá</p>
            </div>
            <div class="row">
                    <div class="col-5">Nguồn hình thành</div>
                    <div class="col-3">Giá trị</div>
                    <div class="col-4"></div>
                </div>
            <div class="content-budget-source">
                <div class="row"
                v-for="(source,index) in moneySources"
                :key="index">
                    <div class="col-5">
                        <MISACombobox
                            :tag="'sourceInformation'"
                            :control="source.nameSource"
                            :index="index"
                            @getComboSelected="getValueBudget"
                            ref="budgetCombobox"
                            @loopCheckCombobox="loopCheckCombobox"
                        />
                        
                    </div>
                    <div class="col-3 contain-license-input">
                        <MISAInputLicense
                            ref="budgetInput"
                            :modelValue="formatMoney(source.cost)"
                            @update:modelValue="newValue => source.cost = formatToInt(newValue)"
                            :notNumber="true"
                        />
                        
                    </div>
                    <div class="col-4">
                        <div class="action-budget-source">
                            <div class="add-budget" @click="addBudget" title="Thêm nguồn chi phí"></div>
                            <div v-if="this.moneySources.length > 1" class="remove-budget" @click="removeBudget(index)" title="Xóa nguồn chi phí"></div>
                        </div>

                    </div>
                </div>
            </div>

            
            <div class="row">
                <div class="col-5">
                    <MISAInput
                        :controlledContent="'Tổng'"
                        style="margin-top: 0"
                        :disabled="true"
                    />
                </div>
                <div class="col-3 contain-license-input">
                    <MISAInput
                        :controlledContent="formatMoney(calTotalCost())"
                        style="margin-top: 0"
                        
                        :disabled="true"
                    />
                </div>
                <div class="col-4"></div>
            </div>
        </div>
        <div class="form-action">
            <button 
            class="m-second-button ignore-btn" 
            @click="this.$emit('closeEditLicenseAssetForm')"
            v-shortkey="['esc']" @shortkey="closeEditForm()"
            >Hủy</button>
            <button 
            id="form-save-button" 
            class="m-button" 
            @click="saveBudgetSource"
            v-shortkey="['ctrl','f']" @shortkey="saveBudgetSource()"
            
            >Lưu</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import messageResource from '../resources/resource';

export default {
    props:["formMode","jsonSelected","index","licenseAssetSelected","departmentNameSelected","fixedAssetName"],
    mounted(){
        console.log("json selected: ", this.jsonSelected);
        console.log("department name:", this.departmentNameSelected);
        if(this.jsonSelected != undefined){
            this.moneySources = JSON.parse(this.jsonSelected);
        }
    },
    computed:{
        /**
        * Mô tả: computed format ngay trên ô input theo hàm format viết sẵn
        * @param
        * @return
        * Created by: nbtin
        * Created date: 22:03 17/06/2022
        */
        // costFormatComputed: {
        //     get: function () {
        //         return this.formatMoney(this.costFormat)
                
        //         // this.assetForm.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        //     },
        //         // setter
        //     set: function (newValue) {
        //         newValue = this.formatToInt(newValue);
        //         //  newValue.toString().replaceAll('.','');
        //         this.costFormat = newValue;
        //     }
        // },
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
        * Mô tả: Tắt form
        * @param
        * @return
        * Created by: nbtin
        * Created date: 09:26 20/06/2022
        */
        closeEditForm(){
            this.$emit('closeEditLicenseAssetForm');
        },
        /**
        * Mô tả: 
        * @param
        * @return
        * Created by: nbtin
        * Created date: 15:46 18/06/2022
        */
        calTotalCost(){
            // var total = 0;
            var total = this.moneySources.reduce((item1,item2) => {
                return item1 + Number(item2.cost);
            },0);
            return total;
        },
        /**
        * Mô tả: Hàm format định dạng tiền
        * @param
        * @return
        * Created by: nbtin
        * Created date: 21:57 17/06/2022
        */
		formatMoney(value){
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
        /**
        * Mô tả: Hàm check rỗng các trường trong form
        * @param
        * @return
        * Created by: nbtin
        * Created date: 10:49 17/06/2022
        */
        checkNullValue(){
            var check = true;
            // Check trống các ô
            this.$refs['budgetCombobox'].forEach(element => {
                if(element.itemSelected == null || element.control == ""){
                    element.isAlert = true;
                    check = false;
                }
            });
            this.$refs['budgetInput'].forEach(element => {
                if(element.$refs.inputTxt.value === "" || element.$refs.inputTxt.value == undefined){
                    element.isAlert = true;
                    check = false;
                }
            });
            // Check trùng combobox
            let budgetComboboxArray = this.$refs['budgetCombobox'];
            this.$refs['budgetCombobox'].forEach(element => {
                if(element.itemSelected != null && element.control != ""){
                    element.isAlert = false;
                }
            });
            // chạy vòng for dể check trùng
            for(let i = 0; i < budgetComboboxArray.length; i++){
                for(let j = 0; j < budgetComboboxArray.length; j++){
                    if(budgetComboboxArray[i].content == budgetComboboxArray[j].content && j != i){
                        budgetComboboxArray[i].isAlert = true;
                        check = false;
                    } 
                }
            }
            this.canSubmit = check;
        },
        /**
        * Mô tả: Quét lại một lần mỗi khi blur khỏi combobox để bỏ alert 
        * @param
        * @return
        * Created by: nbtin
        * Created date: 22:50 18/06/2022
        */
        loopCheckCombobox(){
            this.$refs['budgetCombobox'].forEach(element => {
                if(element.itemSelected != null && element.control != ""){
                    element.isAlert = false;
                }
            });
        },
        /**
        * Mô tả: Xử lý lưu lại nguồn hình thành tài sản
        * @param
        * @return
        * Created by: nbtin
        * Created date: 10:44 17/06/2022
        */
        async saveBudgetSource(){
            
            console.log(JSON.stringify(this.moneySources));
            this.checkNullValue();
            if(this.formMode == 1){
                if(this.canSubmit){
                    this.isLoadingSubmitBtn = true;
                    setTimeout(()=>{
                        this.isLoadingSubmitBtn = false;
                        this.$emit("getDetailJsonFE",JSON.stringify(this.moneySources),this.index);
                        // Emit lên toast message, thành công là true, thất bại là false
                        this.$emit("handleStatusSave",true, messageResource.SAVE_SUCCESS);
                    },1000);
                }
            } else if (this.formMode == 0){
                if(this.canSubmit){
                    
                    var me = this;
                    var updateLicenseAsset = {}; 
                    this.isLoadingSubmitBtn = true;
                    updateLicenseAsset.DetailJson = JSON.stringify(this.moneySources);
                    await axios.put("http://localhost:5062/api/v1/LicenseDetail/"+this.licenseAssetSelected.LicenseDetailId,updateLicenseAsset)
                    .then(function(res){
                        console.log(res);
                        setTimeout(()=>{
                            me.isLoadingSubmitBtn = false;
                            me.$emit("closeEditLicenseAssetForm");
                            // Emit lên toast message, thành công là true, thất bại là false
                            me.$emit("handleStatusSave",true, messageResource.SAVE_SUCCESS);
                        },1000);
                        
                    }).catch(function(err){
                        console.log(err);
                    })
                }
            }
        },
        /**
        * Mô tả: Lấy giá trị từ combobox nguồn hình thành
        * @param
        * @return
        * Created by: nbtin
        * Created date: 11:09 17/06/2022
        */
        getValueBudget(e,index){
            if(e.itemData != undefined){
                this.moneySources[index].nameSource = e.itemData.budget;
                this.moneyNameSources.push(e.itemData.budget);
                 
            }

        },
        /**
        * Mô tả: Thêm nguồn khi ấn nút cộng
        * @param
        * @return
        * Created by: nbtin
        * Created date: 00:48 18/06/2022
        */
        addBudget(){
            this.moneySources.push({ nameSource: "",
                    cost: 0});
        },
        /**
        * Mô tả: Xóa đi nguồn hình thành
        * @param
        * @return
        * Created by: nbtin
        * Created date: 08:40 18/06/2022
        */
        removeBudget(index){
            // this.moneySources = this.moneySources.filter()
            console.log(this.moneySources);
            console.log(index);
            if(index > -1){
                this.moneySources.splice(index,1);
            }
            console.log(this.moneySources);
        }
    },
    data() {
        return {
            canSubmit: false,
            // Mảng check trùng
            moneyNameSources:[],
            // Mảng to gồm cả tên cả số tiền
            moneySources:[
                {
                    nameSource: "Ngân sách Tỉnh",
                    cost: 1000000
                },
            ],
            costFormat: 0,
            test: '',
            isLoadingSubmitBtn: false,
        }
    },
}
</script>

<style>
    .contain-license-input input{
        text-align: right;
        padding-right: 16px;
        margin-top: 0;
    }
</style>