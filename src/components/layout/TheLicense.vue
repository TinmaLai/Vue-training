<template>
    <div>
        <div class="license-content">
			<div class="content-heading">
				<div class="heading">Ghi tăng tài sản</div>
				<div class="heading-action">
					<button class="m-button" title="Thêm tài sản" @click="this.isShowDialog = true">Thêm</button>
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
							<input ref="licenseSearchContent" placeholder="Tìm kiếm theo số chứng từ, nội dung" type="text">
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
									<th class="text-left">Ngày chứng từ</th>
									<th class="text-left">Ngày ghi tăng</th>
									<th class="text-right">Tổng nguyên giá</th>
									<th class="text-left">Nội dung</th>
									<th></th>
								</thead>
								<tbody>
									<tr 
									v-for="(license,index) in licenses"
									:key="license.LicenseId"
									>
										<td class="text-center">
											<MISACheckbox />
										</td>
										<td class="text-center" ref="TableAction">{{index + 1}}</td>
										<td class="text-left">{{license.LicenseCode}}</td>
										<td class="text-left" >{{license.UseDate}}</td>
										<td class="text-left">{{license.WriteUpDate}}</td>
										<td class="text-right">{{formatMoney(license.TotalCost)}}</td>
										<td class="text-left">{{license.Note}}</td>
										<td class="master-table-item table-action">
											<div class="edit" @click="showEditForm" title="Sửa chứng từ">
												
											</div>
											<div class="delete" @click="showCloneForm" title="Xóa chứng từ">

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
									<th width="150" class="text-right" style="min-width:150px ;padding-right: 20px;">123213</th>
									<th width="400" style="min-width:400px;"></th>
									<th></th>
								</thead>
							</table>
						</div>
						<div class="master-pagination-footer">
							<div class="page-navigation">
								<p class="content-details">Tổng số <b>{{this.totalRecord}}</b> bản ghi</p>
								
								<MISACombobox
								:tag="'DropdownPagination'"
								class="dropdown-pagination"
								@getComboSelected="getPageSize"
								/>
								<MISAPagination
									v-model="pageNumCurrent"
									:pageCount="5"
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
		/>
    </div>
</template>

<script>
import AddLicenseDialog from '../../views/AddLicenseDialog.vue';

export default {
	components:{
		
		AddLicenseDialog
	},
	
	methods:{
		
		/**
		* Mô tả: Format tiền thành ngăn cách dấu chấm
		* @param
		* @return
		* Created by: nbtin
		* Created date: 15:29 08/06/2022
		*/
		formatMoney(value){
			return value.toString().replaceAll('.','').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
	},
    data() {
		return {
			licenses: [
				{
					LicenseId: 1,
					LicenseCode: 'GT00001',
					UseDate: '08/06/2022',
					WriteUpDate: '08/06/2022',
					TotalCost: 45000000,
					Note: ''
				},
				{
					LicenseId: 1,
					LicenseCode: 'GT00001',
					UseDate: '08/06/2022',
					WriteUpDate: '08/06/2022',
					TotalCost: 45000000,
					Note: ''
				},
				{
					LicenseId: 1,
					LicenseCode: 'GT00001',
					UseDate: '08/06/2022',
					WriteUpDate: '08/06/2022',
					TotalCost: 45000000,
					Note: ''
				},
				{
					LicenseId: 1,
					LicenseCode: 'GT00001',
					UseDate: '08/06/2022',
					WriteUpDate: '08/06/2022',
					TotalCost: 45000000,
					Note: ''
				},
				{
					LicenseId: 1,
					LicenseCode: 'GT00001',
					UseDate: '08/06/2022',
					WriteUpDate: '08/06/2022',
					TotalCost: 45000000,
					Note: ''
				},
				{
					LicenseId: 1,
					LicenseCode: 'GT00001',
					UseDate: '08/06/2022',
					WriteUpDate: '08/06/2022',
					TotalCost: 45000000,
					Note: ''
				},
			],
			fixedAssetsLicense:[
				{
					FixedAssetId: 1,
					FixedAssetCode: 'TS-1561',
					FixedAssetName: 'Xe Subaru',
					DepartmentName: 'Phòng hội trường lớn',
					Cost: 16000000,
					DepreciationPerYear: 0,
					PriceExtra: 16000000
				},
				{
					FixedAssetId: 1,
					FixedAssetCode: 'TS-1561',
					FixedAssetName: 'Xe Subaru',
					DepartmentName: 'Phòng hội trường lớn',
					Cost: 16000000,
					DepreciationPerYear: 0,
					PriceExtra: 16000000
				},
				{
					FixedAssetId: 1,
					FixedAssetCode: 'TS-1561',
					FixedAssetName: 'Xe Subaru',
					DepartmentName: 'Phòng hội trường lớn',
					Cost: 16000000,
					DepreciationPerYear: 0,
					PriceExtra: 16000000
				},
				{
					FixedAssetId: 1,
					FixedAssetCode: 'TS-1561',
					FixedAssetName: 'Xe Subaru',
					DepartmentName: 'Phòng hội trường lớn',
					Cost: 16000000,
					DepreciationPerYear: 0,
					PriceExtra: 16000000
				},
				{
					FixedAssetId: 1,
					FixedAssetCode: 'TS-1561',
					FixedAssetName: 'Xe Subaru',
					DepartmentName: 'Phòng hội trường lớn',
					Cost: 16000000,
					DepreciationPerYear: 0,
					PriceExtra: 16000000
				},
				{
					FixedAssetId: 1,
					FixedAssetCode: 'TS-1561',
					FixedAssetName: 'Xe Subaru',
					DepartmentName: 'Phòng hội trường lớn',
					Cost: 16000000,
					DepreciationPerYear: 0,
					PriceExtra: 16000000
				},
			],
			isShowDialog: false,
			isHover: false,
		}
	},
}
</script>

<style>

</style>