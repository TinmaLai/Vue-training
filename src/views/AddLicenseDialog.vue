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
                        <MISAInput/>
                    
                    </div>
                    <div class="col-4">
                        <label>Ngày bắt đầu sử dụng<span style="color: red">*</span></label>
                        <MISADatepicker/>
                    
                    </div>
                    <div class="col-4">
                        <label>Ngày ghi tăng<span style="color: red">*</span></label>
                        <MISADatepicker/>
                    
                    </div>
                </div>
                <div class="row">
                     <div class="col-12">
                        <label>Ghi chú</label>
                        <MISAInput/>
                    
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
							<input ref="licenseSearchContent" placeholder="Tìm kiếm theo mã, tên tài sản" type="text">
						</div>
						<button class="m-second-button">Chọn tài sản</button>
					</div>
					<div class="detail-grid">
						<div class="contain-detail-table">
							<table class="detail-table m-table">
								<thead>
									<th style="padding-left: 16px" class="text-center">STT</th>
									<th class="text-left">Mã tài sản</th>
									<th class="text-left">Tên tài sản</th>
									<th class="text-left">Bộ phận sử dụng</th>
									<th class="text-right">Nguyên giá</th>
									<th class="text-right">Hao mòn năm</th>
									<th class="text-right" >Giá trị còn lại</th>
								</thead>
								<tbody>
									<tr 
										v-for="(asset,index) in fixedAssets"
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
						<table class="detail-table-footer">
							<thead>
								<th width="40"></th>
								<th width="100"></th>
								<th width="130"></th>
								<th width="220"></th>
								<th width="120" class="text-right">123213</th>
								<th width="128"></th>
                                <th width="160"></th>
							</thead>
						</table>
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
    </div>
</template>

<script>
export default {
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
            fixedAssets:[
				{
					FixedAssetId: 1,
					FixedAssetCode: 'TS-1561',
					FixedAssetName: 'Xe Subaru',
					DepartmentName: 'Phòng hội trường lớn',
					Cost: 16000000,
					DepreciationPerYear: 0,
					PriceExtra: 16000000
				}
			],
        }
    },
}
</script>

<style>

</style>