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
            <div class="content-budget-source">
                <div class="row">
                    <p class="heading" style="font-size: 14px; margin-bottom: 0">Nguyên giá</p>
                </div>
                <div class="row">
                    <div class="col-6">Nguồn hình thành</div>
                    <div class="col-2">Giá trị</div>
                    <div class="col-4"></div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <MISACombobox/>
                    </div>
                    <div class="col-2">
                        <MISAInput
                            style="margin-top: 0"
                        />
                    </div>
                    <div class="col-4">
                        <div class="action-budget-source">
                            <div class="add-budget" title="Thêm nguồn chi phí"></div>
                            <div class="remove-budget" title="Xóa nguồn chi phí"></div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <MISAInput
                        value="Tổng"
                        style="margin-top: 0"
                        disabled="true"
                    />
                </div>
                <div class="col-2">
                    <MISAInput
                        value="100.000.000"
                        style="margin-top: 0"
                        disabled="true"
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
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>