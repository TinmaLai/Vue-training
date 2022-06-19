<template>
    <div id="overlay" class="overlay"></div>
    <div class="m-dialog license-dialog" style="height: auto">
		<MISALoading
			v-if="isLoadingSubmitBtn" 
		/>
        <div class="top-form-row">
            <p class="heading">Thêm chứng từ ghi tăng</p>
            <button class=" close-form-btn" @click="closeAddLicenseDialog"></button>
        </div>
        <div class="add-license-content">
            <div class="license-form-heading">Thông tin chứng từ</div>
            <div class="add-license-form">
                <div class="row">
                    <div class="col-4">
                        <label>Mã chứng từ <span style="color: red">*</span></label>
                        <MISAInputLicense 
							:title="'Mã chứng từ không được để trống'" 
							:placeholder="'Nhập mã chứng từ'" 
							:fieldName="'Mã chứng từ'"
							maxlength="255"
							ref="txtLicenseCode"
							v-model="this.licenseInsert.LicenseCode"
							@blur="this.nullToastStatusArray[0] = this.$refs.txtLicenseCode.isAlert"
							@focus="this.nullToastStatusArray[0] = false"
						/>
						
                    </div>
                    <div class="col-4">
                        <label>Ngày bắt đầu sử dụng <span style="color: red">*</span></label>
                        <MISADatepicker
							@getDate="newValue => this.licenseInsert.UseDate = newValue"
                            :control="this.licenseInsert.UseDate"
							:area="'license'"
							:fieldName="'Ngày sử dụng'"
						/>
                    
                    </div>
                    <div class="col-4">
                        <label>Ngày ghi tăng <span style="color: red">*</span></label>
                        <MISADatepicker
							@getDate="newValue => this.licenseInsert.WriteUpdate = newValue"
                            :control="this.licenseInsert.WriteUpdate"
							:area="'license'"
							:fieldName="'Ngày ghi tăng'"
							/>
                    </div>
                </div>

                <div class="row" style="margin-top: 11px;">
                     <div class="col-12">
                        <label>Ghi chú</label>
                        <MISAInput
							ref="txtDescription" 
							v-model="this.licenseInsert.Description"
							:placeholder="'Nhập ghi chú'" 
							:fieldName="'Tên tài sản'"
							maxlength="255"
							:isRequired="false"
						/>
                    </div>
                </div>
            </div>
            <div class="license-form-heading">Thông tin chi tiết</div>
            <div class="add-license-detail">
                <div class="detail-license">
					<div class="detail-toolbar">
						<div class="m-field-input-icon">
							<div class="btn-icon">
								<div class="search-icon"></div>
							</div>
							<input ref="licenseSearchContent" @change="searchAssetLicense" placeholder="Tìm kiếm theo mã, tên tài sản" type="text">
						</div>
						<button class="m-second-button" @click="showSelectAssetDlg">Chọn tài sản</button>
					</div>
					<div class="detail-grid">
						<div class="contain-detail-table">
							<table class="detail-table m-table">
								<thead style="z-index: 1">
									<th class="text-center">STT</th>
									<th class="text-left">Mã tài sản</th>
									<th class="text-left">Tên tài sản</th>
									<th class="text-left">Bộ phận sử dụng</th>
									<th class="text-right">Nguyên giá</th>
									<th class="text-right">Hao mòn năm</th>
									<th class="text-right" >Giá trị còn lại</th>
								</thead>
								<tbody>
									<tr 
										v-for="(asset,index) in filterArray"
										:key="asset.FixedAssetId">
							
										<td>{{index+1}}</td>
										<td class="text-left">{{asset.FixedAssetCode}}</td>
										<td class="text-left">{{asset.FixedAssetName}}</td>
										<td class="text-left">{{asset.DepartmentName}}</td>
										<td class="text-right">{{formatMoney(asset.Cost)}}</td>
										<td class="text-right">{{formatMoney(asset.DepreciationPerYear)}}</td>
										<td class="text-right" style="position: relative">
											{{formatMoney(asset.PriceExtra)}}
											<div class="master-table-item table-action">
												<div class="contain-action-icon">
													<div class="edit" @click="showEditAssetForm(asset,index)" title="Sửa tài sản">
													
													</div>
												</div>
												<div class="contain-action-icon">
													<div class="delete" @click="removeLicenseAsset(asset)" title="Xóa tài sản">

													</div>
												</div>
											</div>
										</td>
										
									</tr>
								</tbody>
							</table>
						</div>
						<table class="detail-table-footer" :class="{'d-opacity-none': this.filterArray.length == 0}">
							<thead>
								<th width="520"></th>
								<th width="140" class="text-right">{{formatMoney(calTotalMoney('Cost'))}}</th>
								<th width="165" class="text-right">{{formatMoney(calTotalMoney('DepreciationPerYear'))}}</th>
                                <th width="165" class="text-right">{{formatMoney(calTotalMoney('PriceExtra'))}}</th>
							</thead>
						</table>
                        <div class="master-pagination-footer">
							<div class="page-navigation">
								<p class="content-details">Tổng số <b>{{this.fixedAssetsLicense.length}}</b> bản ghi</p>
								
								<MISACombobox
								:tag="'DropdownPagination'"
								class="dropdown-pagination"
								:control="15"
								@getComboSelected="getPageSize"
								/>
								<MISAPagination
									v-model="pageNumCurrent"
									:pageCount="calPageCount"
									:prev-text="'pre'"
									:prev-link-class="'prev-link-class'"
									:next-text="'next'"
									:next-link-class="'next-link-class'"
									:container-class="'m-pagination'"
									:click-handler="clickCallback"
									
								>
								</MISAPagination>
							</div>
						</div>
					</div>
					
				</div>
            </div>
        </div>
        <div class="form-action">
            <button 
            class="m-second-button ignore-btn" 
            @click="closeAddLicenseDialog"
            
			title="HỦY"
            >Hủy</button>
            <button 
            id="form-save-button" 
            class="m-button" 
            @click="saveLicense"
			title="CTRL + F"
            v-shortkey="['ctrl','f']" @shortkey="saveLicense()"
            
            >Lưu</button>
        </div>
		<SelectAssetLicense
			v-if="this.isShowAddAssetDlg"
			:oldAssetsLicenseArray="this.assetsLicenseArray"
			@getSelectedAssetArray="getSelectedAssetArray"
			@closeSelectAssetDlg="this.isShowAddAssetDlg = false"
		/>
		<EditAssetLicenseDialog
			v-if="this.isShowEditAssetDlg"
			@closeEditLicenseAssetForm="closeEditLicenseAssetForm"
			:formMode="formMode"
			:index="indexSelected"
			@getDetailJsonFE="getDetailJsonFE"
			:jsonSelected="jsonSelected"
			:licenseAssetSelected="licenseAssetSelected"
			:departmentNameSelected="departmentNameSelected"
			@handleStatusSave="handleStatusSave"
		/>
		<ValidateAlert
			:isShowAlert="showValidateAlert"
			:message="this.errMessage"
			@selectOption="this.showValidateAlert = false"
			style="z-index: 2"
        />
		<CancelAlert 
        :isShowAlert="showCancelAlert"
        :formMode="this.formMode"
        @getCancelOption="handleCancelOption"
		v-shortkey="['esc']" @shortkey="this.showCancelAlert = false"
		style="z-index: 3"
        />
		<MISAToastMessage
			:isShowToast="isShowToast" 
            :status="saveStatus" 
            :message="messageToToast"
		/>
		
    </div>
</template>

<script>
import SelectAssetLicense from './SelectAssetLicense.vue';
import EditAssetLicenseDialog from './EditAssetLicenseDialog.vue'
import axios from 'axios';
import messageResource from './../resources/resource';
import CancelAlert from './CancelAlertDialog.vue';

export default {
	props:["licenseSelected","formMode"],
	components:{
		SelectAssetLicense,
		EditAssetLicenseDialog,
		CancelAlert
	},
	async mounted() {
		// Focus vào ô đầu tiên
		this.$refs.txtLicenseCode.setFocus();
		
		// Nếu form là sửa, nhận gái trị từ hàng lên
		if(this.formMode == 0){
			console.log(this.licenseSelected);
			this.licenseInsert = this.licenseSelected;
			this.licenseInsert.detailAssets.forEach(element => {
				element.PriceExtra = element.Cost - (element.DepreciationPerYear);
			});
			this.fixedAssetsLicense = this.licenseInsert.detailAssets;
			this.searchAssetArray = this.licenseInsert.detailAssets;
			this.handleFilterPaginate();
		} else if(this.formMode == 1){
			// Lấy mã mới 
			await this.getNewCode();
			// Gán giá trị ban đầu cho bảng detail
			this.searchAssetArray = this.fixedAssetsLicense;
			this.handleFilterPaginate();
		}
		
		
	},
	computed:{
		
		/**
		* Mô tả: computed array đổ ra bảng
		* @param
		* @return
		* Created by: nbtin
		* Created date: 09:17 10/06/2022
		*/
		filterArray(){
			return this.filterArrayRes;
		},
		/**
		* Mô tả: computed tính số trang
		* @param
		* @return
		* Created by: nbtin
		* Created date: 09:17 10/06/2022
		*/
		calPageCount(){
			var countPage = this.searchAssetArray.length/this.pageSize;
			// Gán là 1 khi không có bản ghi nào
			if(countPage == 0) countPage = 1;
			return countPage;
		},
		
	},

    methods:{
		/**
        * Mô tả: Xử lý giao diện của Toast message khi trạng thái là thành công hay thất bại
        * @param status: trạng thái
        * @param message: Thông báo tương úng với trạng thái
        * @return
        * Created by: nbtin
        * Created date: 07:21 24/05/2022
        */
        handleStatusSave(status,message){
            var me = this;
            this.messageToToast = message;
            if(status == true){
                // các local data này dùng để truyền đi cho component con là ToastMessage
                this.isShowToast = true;
                this.saveStatus = true;
                setTimeout(function(){
                    me.isShowToast = false;
                },1500);
            } else if(status == false){
                this.isShowToast = true;
                this.saveStatus = false;
                // các local data này dùng để truyền đi cho component con là ToastMessage
                setTimeout(function(){
                    me.isShowToast = false;
                },1500);
            }
        },
		/**
		* Mô tả: Đóng form chỉnh sửa tài sản detail
		* @param
		* @return
		* Created by: nbtin
		* Created date: 00:14 19/06/2022
		*/
		closeEditLicenseAssetForm(){
			this.isShowEditAssetDlg = false;
		},
		/**
		* Mô tả: Xử lý khi form là thêm và lưu detail json, khi đó chỉ lưu FE thôi
		* @param
		* @return
		* Created by: nbtin
		* Created date: 09:41 18/06/2022
		*/
		getDetailJsonFE(detailJson, index){
			console.log(index);
			this.filterArrayRes[index].DetailJson = detailJson;
			this.fixedAssetsLicense[index].DetailJson = detailJson;
			this.isShowEditAssetDlg = false;
		},
		/**
		* Mô tả: Mở form chỉnh sửa tài sản chứng từ (nguồn hình thành)
		* @param
		* @return
		* Created by: nbtin
		* Created date: 09:19 18/06/2022
		*/
		async showEditAssetForm(licenseAsset,index){
			
			console.log(licenseAsset);
			if(licenseAsset.LicenseDetailId == undefined){
				this.isShowEditAssetDlg = true;
				//Gán asset đc chọn để truyền vào giá trị nguồn hình thành
				this.jsonSelected = licenseAsset.DetailJson;
				this.indexSelected = index;
				this.departmentNameSelected = licenseAsset.DepartmentName;
			}
			else {
				// call api
				var me = this;
				await axios.get("http://localhost:5062/api/v1/LicenseDetail/GetMoneySource/"+licenseAsset.LicenseDetailId)
				.then(function(res){
					me.jsonSelected = res.data.DetailJson;
					me.departmentNameSelected = res.data.DepartmentName;
					me.licenseAssetSelected = licenseAsset;
					me.indexSelected = index;
					me.isShowEditAssetDlg = true;
				}).catch(function(err){
					console.log(err);
				})
				//
			}
		},
		/**
		* Mô tả: Xử lý option chọn khi cancel
		* @param
		* @return
		* Created by: nbtin
		* Created date: 21:15 16/06/2022
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
                    this.resetForm(this);
                    break;
                }
                case 'save':{
                    // Lưu và đóng form
                    this.saveLicense();
                    break;
                }
                
                
            }
		},
		/**
		* Mô tả: Hiện thông báo đóng form
		* @param
		* @return
		* Created by: nbtin
		* Created date: 21:08 16/06/2022
		*/
		closeAddLicenseDialog(){
			this.showCancelAlert = true;

		},
		/**
		* Mô tả: Hàm tính tổng tiền ở chân trang
		* @param
		* @return
		* Created by: nbtin
		* Created date: 15:40 16/06/2022
		*/
		calTotalMoney(field){
			let init = 0;
			var total = this.filterArray.reduce((item1, item2) => {
				return item1 + item2[field];
			},init)
			return total;
		},
		/**
		* Mô tả: Xóa FE ở mảng thông tin chi tiết
		* @param
		* @return
		* Created by: nbtin
		* Created date: 09:18 18/06/2022
		*/
		removeLicenseAsset(asset){
			var ids = [];
			this.fixedAssetsLicense.forEach(element =>{
				ids.push(element.FixedAssetId);
			});
			var indexRemove = ids.indexOf(asset.FixedAssetId);
			if (indexRemove > -1) {
				this.fixedAssetsLicense.splice(indexRemove, 1); 
			}
			this.searchAssetArray = this.fixedAssetsLicense;
			this.handleFilterPaginate();
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
            await axios.get("http://localhost:5062/api/v1/License/NewAssetCode").then(function(res){
                console.log(res);
                // Gán lại mã mới 
                me.licenseInsert.LicenseCode = res.data;
				
            }).catch(function(err){
                console.log("Lỗi:" +  err);
            })
        },
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
        * Mô tả : Binding data từ ô input vào object
        * Created by: nbtin
        * Created date: 14:26 02/05/2022
        */
        bindingData(field,data){
            // this.field = data;
            this.licenseInsert[field] = data; 
        },
	
		checkNullValue(){
			// console.log(this.$refs.txtLicenseCode);
			// Check trống các trường license
			if(this.$refs.txtLicenseCode.$refs.inputTxt.value == ""){
				this.nullToastStatusArray[0] = true;
				return false;
			}
			// Check số tài sản được chọn > 0
			if(this.fixedAssetsLicense.length <= 0){
				this.showValidateAlert = true;
				this.errMessage = messageResource.NULL_ASSET_LICENSE;
				return false;
			}
			return true;
		},
		/**
		* Mô tả: Hàm lưu chứng từ
		* @param
		* @return
		* Created by: nbtin
		* Created date: 08:54 15/06/2022
		*/
		saveLicense(){
			this.licenseInsert.licenseDetails = this.fixedAssetsLicense;
			let totalLicense = this.fixedAssetsLicense.reduce((item1,item2) =>{
				return item1 + item2.Cost;
			},0)
			this.licenseInsert.Total = totalLicense;
			var me = this;
			// Cờ check xem có validate lỗi gì ko, ko lỗi mới được thêm
			var checkAdd = this.checkNullValue();
			if(checkAdd == true)
				// form mode là thêm (formMode == 1)
				if(this.formMode == 1){
					let status = false;
					let message = "";
					console.log(this.licenseInsert);
					me.isLoadingSubmitBtn = true;
					axios.post("http://localhost:5062/api/v1/LicenseInsert/multiData", this.licenseInsert)
					.then(function(res){
						console.log(res)
						// data = 1 là lưu dữ liệu thành công (Execute)
						if(res.data.errorCode == "001"){
							
							setTimeout(()=>{
								var errMsg = res.data.data.data[0];
								me.errMessage = errMsg;
								me.showValidateAlert = true;
								// Nếu lỗi trả về có chữ "trùng" thì hiện thông báo mã tài sản đã trùng (check trùng)
								if(errMsg.includes("trùng")){

									me.isDuplicate = true;
									
								}else {
									status = false;
									message = messageResource.SAVE_FAILED;
									me.setStatus(status, message);
								}
								me.isLoadingSubmitBtn = false;
							},500);
							// Xử lý nếu call POST API thất bại
							
						} else {
							me.isLoadingSubmitBtn = true;
							setTimeout(()=>{
								status = true;
								message = messageResource.SAVE_SUCCESS;
								// Gán mã tự động tăng cho lần mở form tiếp theo
								me.$emit("getLoadingLicense");
								me.setStatus(status, message);
								me.isLoadingSubmitBtn = false;
							},1000);
							
						}
					}).catch(function(err){
						console.log(err);
					})
				} 
				// Nếu formmode là sửa (formMode == 0)
				else if(this.formMode == 0){
					let status = false;
					let message = "";
					axios.put("http://localhost:5062/api/v1/LicenseInsert/"+me.licenseInsert.LicenseId, me.licenseInsert)
					.then(function(res){
						if(res.data.errorCode == "001"){
							setTimeout(()=>{
								var errMsg = res.data.data.data[0];
								me.errMessage = errMsg;
								me.showValidateAlert = true;
								// Nếu lỗi trả về có chữ "trùng" thì hiện thông báo mã tài sản đã trùng (check trùng)
								if(errMsg.includes("trùng")){

									me.isDuplicate = true;
									
								}else {
									status = false;
									message = messageResource.SAVE_FAILED;
									me.setStatus(status, message);
								}
								me.isLoadingSubmitBtn = false;
							},500);
						} else {
							// status = true;
							// message = messageResource.EDIT_SUCCESS;
							// // Gán mã tự động tăng cho lần mở form tiếp theo
							// me.$emit("getAsset");
							// me.$emit("getLoadingLicense");
							// me.setStatus(status, message);
							me.isLoadingSubmitBtn = true;
							setTimeout(()=>{
								status = true;
								message = messageResource.EDIT_SUCCESS;
								// Gán mã tự động tăng cho lần mở form tiếp theo
								me.$emit("getLoadingLicense");
								me.setStatus(status, message);
								me.isLoadingSubmitBtn = false;
							},1000);
						}
					})
				}
		},
		/**
        * Mô tả : Reset form khi close form
        * Created by: nbtin
        * Created date: 11:45 08/05/2022
        */
        resetForm(control){
            control.$emit("closeLicenseDialog");
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
		* Mô tả: Show dialog chọn tài sản, gửi mảng cũ để filter
		* @param
		* @return
		* Created by: nbtin
		* Created date: 10:11 11/06/2022
		*/
		showSelectAssetDlg(){
			this.assetsLicenseArray = this.fixedAssetsLicense;
			this.isShowAddAssetDlg = true;
		},
		/**
		* Mô tả: Lấy page size lên từ combobox
		* @param
		* @return
		* Created by: nbtin
		* Created date: 15:44 10/06/2022
		*/
		getPageSize(pageSize){
			this.pageSize = pageSize.itemData.pageSize;
            // Đưa về trang đầu tiên khi thay đổi pageSize
            this.pageNumber = 1;
            this.searchAssetLicense();
		},
		/**
		* Mô tả: Hứng lại mảng tài sản đã chọn đưa vào chứng từ
		* @param
		* @return
		* Created by: nbtin
		* Created date: 15:14 10/06/2022
		*/
		getSelectedAssetArray(selectedArray){
			this.fixedAssetsLicense.push(...selectedArray);
			this.filterArrayRes = this.fixedAssetsLicense;
			this.isShowAddAssetDlg = false;

			this.handleFilterPaginate();
		},
		/**
		* Mô tả: Hàm xử lý khi có sự kiện cần ren lại bảng, như tìm kiếm, chuyển trang,..
		* @param
		* @return
		* Created by: nbtin
		* Created date: 21:28 09/06/2022
		*/
		handleFilterPaginate(){
			this.filterArrayRes = [];
			
			
			for(let i = this.oldIndexOffset; i < this.newIndexOffset; i++){
				if(this.searchAssetArray[i] != undefined){
					this.filterArrayRes.push(this.searchAssetArray[i]);
				}
				
			}
			
		},
		/**
		* Mô tả: Format tiền thành ngăn cách dấu chấm
		* @param
		* @return
		* Created by: nbtin
		* Created date: 15:29 08/06/2022
		*/
		formatMoney(value){
			if(value != undefined)
			return value.toString().replaceAll('.','').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
		/**
		* Mô tả: Hàm tìm kiếm khi enter ở ô tìm kiếm
		* @param
		* @return
		* Created by: nbtin
		* Created date: 17:01 09/06/2022
		*/
		searchAssetLicense(){	
			var searchContent = this.$refs.licenseSearchContent.value;
			this.searchAssetArray = this.fixedAssetsLicense.filter((item) => {
				return item.FixedAssetName.toLowerCase().includes(searchContent.toLowerCase()) || item.FixedAssetCode.toLowerCase().includes(searchContent.toLowerCase());
			})
			this.pageNumCurrent = 1;
			this.oldIndexOffset = 0
			this.newIndexOffset = this.pageSize;
			this.handleFilterPaginate();
			
		},

		clickCallback(pageNumber){
			this.oldIndexOffset = (pageNumber - 1) * this.pageSize;
			this.newIndexOffset = (pageNumber - 1) * this.pageSize + this.pageSize;
			this.handleFilterPaginate();
		}
	},
    data() {
        return {
			isLoadingSubmitBtn: false,
			licenseAssetSelected:{},
			indexSelected: 0,
			showCancelAlert: false,
            fixedAssetsLicense:[],
			isShowAddAssetDlg: false,
			pageNumber: 1,
			searchAssetArray: [],
			filterArrayRes: [],
			newIndexOffset: 15,
			oldIndexOffset: 0,
			pageSize: 15,
			pageNumCurrent: 1,
			nullToastStatusArray: [false,false,false],
			assetsLicenseArray: [],
			isShowEditAssetDlg: false,
			licenseInsert: {
				UseDate: new Date(),
				WriteUpdate: new Date()
			},
			showValidateAlert: false,
			errMessage: '',
			jsonSelected: "",
			departmentNameSelected: "",
			isShowToast: false,
			saveStatus: false,
			messageToToast: "",
        }
    },
}
</script>

<style>

</style>