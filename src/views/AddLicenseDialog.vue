<template>
    <div id="overlay" class="overlay"></div>
    <div class="m-dialog license-dialog" style="height: auto">
        <div class="top-form-row">
            <p class="heading">Thêm chứng từ ghi tăng</p>
            <button class=" close-form-btn" @click="closeAddStaffForm"></button>
        </div>
        <div class="add-license-content">
            <div class="license-form-heading">Thông tin chứng từ</div>
            <div class="add-license-form">
                <div class="row">
                    <div class="col-4">
                        <label>Mã chứng từ <span style="color: red">*</span></label>
                        <MISAInput
							ref="txtLicenseCode"
							@blur="this.nullToastStatusArray[0] = this.$refs.txtLicenseCode.isAlert"
							@focus="this.nullToastStatusArray[0] = false"
						/>
						<span :class="{'d-opacity' : this.nullToastStatusArray[0]}" style="opacity: 0" class="toast-message-null"><small>Không được bỏ trống ô này.</small></span>
                    </div>
                    <div class="col-4">
                        <label>Ngày bắt đầu sử dụng <span style="color: red">*</span></label>
                        <MISADatepicker
							
						/>
                    
                    </div>
                    <div class="col-4">
                        <label>Ngày ghi tăng <span style="color: red">*</span></label>
                        <MISADatepicker
							
						/>
                    </div>
                </div>
                <div class="row">
                     <div class="col-12">
                        <label>Ghi chú</label>
                        <MISAInput
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
													<div class="edit" @click="this.isShowEditAssetDlg = true" title="Sửa tài sản">
													
													</div>
												</div>
												<div class="contain-action-icon">
													<div class="delete" @click="showCloneForm" title="Xóa tài sản">

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
								<th width="40"></th>
								<th width="100"></th>
								<th width="130"></th>
								<th width="220"></th>
								<th width="140" class="text-right">{{formatMoney(12345678)}}</th>
								<th width="165" class="text-right">{{formatMoney(12345678)}}</th>
                                <th width="165" class="text-right">{{formatMoney(12345678)}}</th>
							</thead>
						</table>
                        <div class="master-pagination-footer">
							<div class="page-navigation">
								<p class="content-details">Tổng số <b>{{this.fixedAssetsLicense.length}}</b> bản ghi</p>
								
								<MISACombobox
								:tag="'DropdownPagination'"
								class="dropdown-pagination"
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
		<SelectAssetLicense
			v-if="this.isShowAddAssetDlg"
			:oldAssetsLicenseArray="this.assetsLicenseArray"
			@getSelectedAssetArray="getSelectedAssetArray"
		/>
		<EditAssetLicenseDialog
			v-if="this.isShowEditAssetDlg"
		/>
    </div>
</template>

<script>
import SelectAssetLicense from './SelectAssetLicense.vue';
import EditAssetLicenseDialog from './EditAssetLicenseDialog.vue'

export default {
	components:{
		SelectAssetLicense,
		EditAssetLicenseDialog
	},
	mounted() {
		this.$refs.txtLicenseCode.setFocus();
		/**
		* Mô tả: Gán giá trị ban đầu cho bảng
		* @param
		* @return
		* Created by: nbtin
		* Created date: 17:38 09/06/2022
		*/
		this.searchAssetArray = this.fixedAssetsLicense;
		this.handleFilterPaginate();
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
			return this.searchAssetArray.length/this.pageSize;
		}
	},
    methods:{
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
            this.pageNumCurrent = 1;
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
            fixedAssetsLicense:[],
			isShowAddAssetDlg: false,
			searchAssetArray: [],
			filterArrayRes: [],
			newIndexOffset: 15,
			oldIndexOffset: 0,
			pageSize: 15,
			pageNumCurrent: 1,
			nullToastStatusArray: [false,false,false],
			assetsLicenseArray: [],
			isShowEditAssetDlg: false
        }
    },
}
</script>

<style>

</style>