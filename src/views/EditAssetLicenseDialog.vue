<template>
    <div id="overlay" class="overlay"></div>
    <div class="edit-asset-license m-dialog" style="height: auto">
        <div class="top-form-row">
            <p class="heading">Sửa tài sản</p>
            <button class=" close-form-btn" @click="closeAddStaffForm"></button>
        </div>
        <div class="edit-asset-license-content">
            <div class="row">
                <div class="col-8">
                    <label>Bộ phận sử dụng</label>
                    <MISAInput
                    disabled="true"
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
                            
                        />
                        
                    </div>
                    <div class="col-3 contain-license-input">
                        <MISAInputLicense
                            ref="budgetInput"
                            :modelValue="formatMoney(source.cost)"
                            @update:modelValue="newValue => source.cost = formatToInt(newValue)"
                        />
                        
                    </div>
                    <div class="col-4">
                        <div class="action-budget-source">
                            <div class="add-budget" @click="addBudget" title="Thêm nguồn chi phí"></div>
                            <div class="remove-budget" title="Xóa nguồn chi phí"></div>
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
                        :controlledContent="'100.000.000'"
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
            @click="closeAddStaffForm"
            v-shortkey="['esc']" @shortkey="closeAddStaffForm()"
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
export default {
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
            console.log(this.$refs['budgetCombobox']);
            this.$refs['budgetCombobox'].forEach(element => {
                if(element.itemSelected == null && element.control == ""){
                    element.isAlert = true;
                }
            });
            console.log(this.$refs['budgetInput']);
            this.$refs['budgetInput'].forEach(element => {
                if(element.$refs.inputTxt.value === "" || element.$refs.inputTxt.value == undefined){
                    element.isAlert = true;
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
        saveBudgetSource(){
            this.checkNullValue();
            console.log(JSON.stringify(this.moneySources));
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
                this.moneySources[index].budget = e.itemData.budget;
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
            this.moneySources.push({ nameSource: "Ngân sách tỉnh",
                    cost: 1000000});
        }
    },
    data() {
        return {
            // Mảng check trùng
            moneyNameSources:[],
            // Mảng to gồm cả tên cả số tiền
            moneySources:[
                {
                    nameSource: "Ngân sách tỉnh",
                    cost: 1000000
                },
                {
                    nameSource: "aasdad",
                    cost: 1000000
                },
                {
                    nameSource: "aasdad",
                    cost: 1000000
                },
                
            ],
            costFormat: 0,
            test: '',
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