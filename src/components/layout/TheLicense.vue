<template>
    <div>
        <div class="license-content">
			<div class="content-heading">
				<div class="heading">Ghi tăng tài sản</div>
				<div class="heading-action">
					<button 
					class="m-button" 
					title="CTRL + ALT + F"  
					@click="showAddLicenseDialog()"
					v-shortkey="['ctrl','alt','f']"
					@shortkey="showAddLicenseDialog()"
					>Thêm</button>
					<div class="heading-dropdown">
						<div class="heading-icons">
							<div class="layout-select"></div>
							<span class="layout-select-arrow"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="license-dashboard">
				<div class="master-license">
					<div class="master-toolbar">
						<div class="m-field-input-icon">
							<div class="btn-icon">
								<div class="search-icon"></div>
							</div>
							<input ref="licenseSearchContent" 
							@change="searchEnterBtn()"
							@focus="this.$refs.licenseSearchContent.select()" 
							placeholder="Tìm kiếm theo số chứng từ, nội dung" 
							type="text">
						</div>
						<div class="toolbar-action">
							<div class="print-icon">

							</div>
							<div class="more-icon">

							</div>
						</div>
					</div>
					<div class="master-grid">
						<div class="contain-master-table" ref="MainMasterTable">
							<table class="master-table m-table">
								<thead>
									<th class="text-center"><MISACheckbox/></th>
									<th class="text-center">STT</th>
									<th class="text-left">Số chứng từ</th>
									<th class="text-center">Ngày chứng từ</th>
									<th class="text-center">Ngày ghi tăng</th>
									<th class="text-right">Tổng nguyên giá</th>
									<th class="text-left">Nội dung</th>
									<th></th>
								</thead>
								<div class="loading-table" style="top: 100px" v-show="isLoading"></div>
								<div class="text-no-data" v-if="licenses.length == 0">
									Hiện tại không có dữ liệu.
								</div>
								<tbody v-show="!isLoading">
									<tr 
									v-for="(license,index) in licenses"
									:key="license.LicenseId"
									@click.exact="selectRow($event,license)"
									v-on:click.ctrl="ctrlSelect(license)"
									v-on:click.shift="shiftSelect(license)"
									@dblclick="showEditLicenseForm(license)"
									:class="{'activedCheckbox' : license.checked}"
									>
										<td class="text-center" >
											<MISACheckbox 
											:isCheckBox="license.checked"
											/>
										</td>
										<td class="text-center" ref="TableAction">{{index + 1}}</td>
										<td class="text-left" style="color: #1aa4c8">{{license.LicenseCode}}</td>
										<td class="text-center" >{{formatDate(license.UseDate)}}</td>
										<td class="text-center">{{formatDate(license.WriteUpdate)}}</td>
										<td class="text-right">{{formatMoney(license.Total)}}</td>
										<td class="text-left">{{license.Description}}</td>
										<td class="master-table-item table-action" :class="{'activedCheckbox' : license.checked}">
										
											<div class="edit"  title="Sửa chứng từ">
											
											</div>
											<div class="delete" title="Xóa chứng từ">

											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="contain-master-table-footer" ref="FooterMasterTable"
              @scroll="
                this.$refs.MainMasterTable.scrollLeft =
                  this.$refs.FooterMasterTable.scrollLeft
              ">
							<table class="master-table-footer">
								<thead>
									<th width="40" style="min-width:40px;"></th>
									<th width="55" style="min-width:55px;"></th>
									<th width="200" style="min-width:200px;"></th>
									<th width="150" style="min-width:150px;"></th>
									<th width="160" style="min-width:160px;"></th>
									<th width="150" class="text-right" style="min-width:150px ;padding-right: 20px;">{{formatMoney(calTotalMoney('Total'))}}</th>
									<th width="400" style="min-width:400px;"></th>
									<th></th>
								</thead>
							</table>
						</div>
						<div class="master-pagination-footer">
							<div class="page-navigation">
								<p class="content-details">Tổng số <b>{{this.totalRecord}} </b> bản ghi</p>
								
								<MISACombobox
								:tag="'DropdownPagination'"
								class="dropdown-pagination"
								@getComboSelected="getPageSize"
								/>
								<MISAPagination
									v-model="pageNumCurrent"
									:pageCount="calTotalPage"
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
				<div class="detail-license">
					<div class="detail-toolbar">
						<div style="font-size: 16px; font-weight: 700">
							Thông tin chi tiết
						</div>
						<div class="toggle-size-icon">

						</div>
					</div>
					<div class="detail-grid">
						<div class="contain-detail-table">
							<table class="detail-table m-table">
								<thead>
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
										v-for="(asset,index) in fixedAssetsLicense"
										:key="asset.FixedAssetId">
							
										<td>{{index+1}}</td>
										<td class="text-left">{{asset.FixedAssetCode}}</td>
										<td class="text-left">{{asset.FixedAssetName}}</td>
										<td class="text-left">{{asset.DepartmentName}}</td>
										<td class="text-right">{{formatMoney(asset.Cost)}}</td>
										<td class="text-right">{{formatMoney(asset.DepreciationPerYear)}}</td>
										<td class="text-right">{{formatMoney(asset.PriceExtra)}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						
					</div>
					
				</div>
			</div>

        </div>
		<AddLicenseDialog
			v-if="isShowDialog"  
			@closeLicenseDialog="toggleLicenseDialog" 
			:formMode="formMode"
			:licenseSelected="licenseSelected"
			@getStatusSave="handleStatusSave"
			@getLoadingLicense="getLoadingLicense"
		/>
		<ToastMessage 
        :isShowToast="isShowToast" 
        :status="saveStatus" 
        :message="messageToToast"/>
		<DeleteLicenseAlert
			:isShowAlert="isShowDeleteAlert"
			:message="deleteMessage"
			:deleteInfor="deleteField"
			@getDelOption="getDelOption"
		/>
    </div>
</template>

<script>
import AddLicenseDialog from '../../views/AddLicenseDialog.vue';
import ToastMessage from '../base/MISAToastMessage.vue';
import axios from 'axios';
import moment from 'moment';
import messageResource from '../../resources/resource';
import DeleteLicenseAlert from '../../views/DeleteLicenseAlert.vue';

export default {
	components:{
		ToastMessage,
		AddLicenseDialog,
		DeleteLicenseAlert
	},
	async mounted() {

		await this.searchLicense();
		await this.getAllLicense();
		
	},
	computed: {
		/**
		* Mô tả: Tính lại tổng số trang của pagination
		* @param
		* @return
		* Created by: nbtin
		* Created date: 16:31 16/06/2022
		*/
		calTotalPage(){
			return Math.ceil(this.currentTotalRecord/this.pageSize);
		}
	},
	methods:{
		/**
		* Mô tả: Lấy lại toàn bộ license mỗi khi cần loading
		* @param
		* @return
		* Created by: nbtin
		* Created date: 17:37 16/06/2022
		*/
		async getLoadingLicense(){
            this.isLoading = true;
            var me = this;
            
            me.searchLicense();
            me.getAllLicense();
            
        },
		/**
		* Mô tả: Xử lí chọn xóa hoặc không xóa ở alert
		* @param
		* @return
		* Created by: nbtin
		* Created date: 17:04 16/06/2022
		*/
		async getDelOption(isDel,licenseId){
			if(isDel == false){
                this.isShowDeleteAlert = false; 
            } else{
                var me = this;
                
                // Gọi API để xóa theo danh sách id được tick checkbox
                await axios.delete(`http://localhost:5062/api/v1/License/`+licenseId)
				.then(function(res){
                    console.log(res);
                    // Hiện thông báo xóa thành công
                    me.handleStatusSave(true, res.data + messageResource.DELETE_SUCCESS);
					me.getLoadingLicense();
                    
                }).catch(function(err){
                    console.log(err);
                    // Hiện thông báo xóa thất bại
                    me.handleStatusSave(false,messageResource.DELETE_FAILED);
                })
				me.isShowDeleteAlert = false;
            }     
		},
		/**
		* Mô tả: Hàm xóa chứng từ
		* @param
		* @return
		* Created by: nbtin
		* Created date: 16:32 16/06/2022
		*/
		async deleteLicense(license){
			var me = this;
			await axios.get("http://localhost:5062/api/v1/License/"+license.LicenseId)
			.then(function(res){
				// console.log(res);
				me.deleteMessage = messageResource.DELETE_LICENSE_ALERT;
				me.deleteField = res.data;
				me.isShowDeleteAlert = true;
			}).catch(function(err){
				console.log(err);
			})
		},
		/**
		* Mô tả: Tính tổng tiền
		* @param
		* @return
		* Created by: nbtin
		* Created date: 15:52 16/06/2022
		*/
		calTotalMoney(field){
			let init = 0;
			var total = this.licenses.reduce((item1, item2) => {
				return item1 + item2[field];
			},init);
			return total;
		},
		/**
		* Mô tả: Hiện dialog thêm chứng từ
		* @param
		* @return
		* Created by: nbtin
		* Created date: 19:55 15/06/2022
		*/
		showAddLicenseDialog(){
			this.isShowDialog = true;
			this.formMode = 1;
		},
		/**
		* Mô tả: Hiện form sửa chứng từ
		* @param
		* @return
		* Created by: nbtin
		* Created date: 19:48 15/06/2022
		*/
		async showEditLicenseForm(thisLicense){
			
			this.formMode = 0;
			var paramAxios = {
				licenseMasterId: thisLicense.LicenseId
			}
			var me = this;
			await axios.get("http://localhost:5062/api/v1/LicenseDetail/getLicenseInsertById",{
				params: paramAxios
			})
			.then(function(res){
				console.log(res);
				me.licenseSelected = res.data;
				me.isShowDialog = true;
			}).catch(function(err){
				console.log(err);
			})
		},
		/**
		* Mô tả: Hàm tìm kiếm chứng từ từ ô input
		* @param
		* @return
		* Created by: nbtin
		* Created date: 19:25 15/06/2022
		*/
		searchEnterBtn(){
			this.pageNumCurrent = 1;
			this.pageNumber = 1;
			this.searchLicense();
		},
		/**
		* Mô tả: Lấy tất cả chứng từ (số bản ghi là chính)
		* @param
		* @return
		* Created by: nbtin
		* Created date: 17:51 15/06/2022
		*/
		async getAllLicense(){
			var me = this;
			await axios.get("http://localhost:5062/api/v1/License")
			.then(function(res){
				me.totalRecord = res.data.length;
			}).catch(function(err){
				console.log(err);
			})
		},
		/**
        * Mô tả : Hàm call api để search
        * @param
        * @return
        * Created by: nbtin
        * Created date: 00:36 22/05/2022
        */
        async searchLicense(){
            var me = this;
            // Gán lại các giá trị tham số để chuẩn bị call api
            var searchInputValue = this.$refs.licenseSearchContent.value;

           
            // param call API
            var paramAxios = {
                filterContent: searchInputValue,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }
            this.isLoading = true;
            // Gọi API để thực hiện filter, phân trang
            await axios.get('http://localhost:5062/api/v1/License/filter',
            {
                params: paramAxios
            }).then(function(res){
                // console.log('res search:', res.data.licenses);
                me.licenses = res.data.licenses;
                me.licenses.forEach(element => {
                    element.checked = false;
                });
                console.log(me.licenses);
                // Gán lại số bản ghi tìm dược để chia lại số trang
                me.currentTotalRecord = res.data.count;
                // Loading khi search
                me.isLoading = false;
            }).catch(function(err){
                console.log(err);
                
            }).then(function(){
                me.isLoading = false;
            })
        },
		/**
		* Mô tả: Hàm ấn chọn vào hàng
		* @param
		* @return
		* Created by: nbtin
		* Created date: 19:28 15/06/2022
		*/
		async selectRow($event,thisLicense){
			if($event.target.classList.contains("edit")){
				this.showEditLicenseForm(thisLicense);
				return;
			} else if($event.target.classList.contains("delete")){
				this.deleteLicense(thisLicense);
				return;
			}
			thisLicense.checked = !thisLicense.checked;
			var me = this;
			// Bỏ check hết tất cả các ô còn lại
			this.licenses.forEach(element => {
				if(element.checked == true && element.LicenseId != thisLicense.LicenseId){
					element.checked = false;
				}
			});
			// CAll api để hiện bảng detail phía dưới
			var paramAxios = {
				licenseId: thisLicense.LicenseId
			}
			if(thisLicense.checked == true){
				await axios.get("http://localhost:5062/api/v1/LicenseDetail/getDetailAssets", {params: paramAxios})
				.then(function(res){
					me.fixedAssetsLicense = res.data;
					me.fixedAssetsLicense.forEach(element => {
						element.PriceExtra = element.Cost - element.DepreciationPerYear;
					});
					
				}).catch(function(err){
					console.log(err);
				})
			} else {
				// Bỏ tick thì reset trắng mảng detail
				me.fixedAssetsLicense = [];
			}
			this.previousClickFocus = thisLicense.LicenseId;
			
		},
		/**
		* Mô tả: Xử lý ctrl click, shift click
		* @param
		* @return
		* Created by: nbtin
		* Created date: 00:13 16/06/2022
		*/
		ctrlSelect(thisLicense){
			// Ctrl + click
			thisLicense.checked = !thisLicense.checked;
			this.previousClickFocus = thisLicense.LicenseId;
		},
		shiftSelect(thisLicense){
			// Shift + click
			// Chạy từ hàng focus cuối cùng đến hàng focus hiện tại
			for(let i = 0; i < this.licenses.length; i++){
				if(this.licenses[i].LicenseId == this.previousClickFocus){
					for(let j = i;;j++){
						this.licenses[j].checked = true;
						if(this.licenses[j].LicenseId == thisLicense.LicenseId) break;
					}
					break;
				}
			}
		},
		/**
        * Mô tả : Lấy số bản ghi trong một trang đc emit lên từ combobox ở component con
        * @param
        * @return
        * Created by: nbtin
        * Created date: 12:00 22/05/2022
        */
        getPageSize(event){
			// console.log(event);
            this.pageSize = event.itemData.pageSize;
            // Đưa về trang đầu tiên khi thay đổi pageSize
			this.pageNumCurrent = 1;
            this.pageNumber = 1;
            this.searchLicense();
        },
		/**
		* Mô tả: Xử lí chuyển trang pagination
		* @param
		* @return
		* Created by: nbtin
		* Created date: 18:35 15/06/2022
		*/
		clickCallback(pageNumber){
			this.pageNumber = pageNumber;
			this.searchLicense();
		},
		/**
		* Mô tả: Đóng dialog thêm license
		* @param
		* @return
		* Created by: nbtin
		* Created date: 11:34 15/06/2022
		*/
		toggleLicenseDialog(){
			this.isShowDialog = false;
		},
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
		* Mô tả: Định dạng ngày tháng
		* @param
		* @return
		* Created by: nbtin
		* Created date: 17:20 15/06/2022
		*/
		formatDate(date) {
			return moment(date).format("DD/MM/YYYY");
		},
	},
    data() {
		return {
			isLoading: true,
			pageNumCurrent: 1,
			totalRecord: 0,
			currentTotalRecord: 0,
			licenses: [
				{
					TotalCost: 0,
				}
			],
			fixedAssetsLicense:[
				
			],
			licenseSelected: {},
			isShowDialog: false,
			isHover: false,
			messageToToast: '',
			isShowToast: false,
			saveStatus: null,
			pageNumber: 1,
			pageSize: 15,
			formMode: -1,
			previousClickFocus: '',
			isShowDeleteAlert: false,
			deleteMessage: '',
			deleteField: '',
		}
	},
}
</script>

<style>

</style>