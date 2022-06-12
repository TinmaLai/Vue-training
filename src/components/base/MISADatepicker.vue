<template>
    <div class="datepicker-container">
        <Datepicker
        class="mt-input input-datepicker"
        format="dd/MM/yyyy"
        textInput
        selectText="Chọn"
        cancelText="Hủy"
        v-model="date"
        autoApply
        @update:modelValue="selectDate"
        :inputClassName="this.date === null ? 'danger' : 'dp-custom-input'"
        />
        <div class="datepicker-icon"></div>
        <span v-if="!this.date" class="toast-message-null"><small>Không được bỏ trống ô này.</small></span>
    </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
// import {ref} from 'vue';

export default {
    components:{
        Datepicker
    },
    props: ['modelValue','control'],
    emits: ['update:modelValue'],
    methods:{
        /**
        * Mô tả: Get dữ liệu từ datepicker để gửi lên component cha
        * @param
        * @return
        * Created by: nbtin
        * Created date: 21:38 30/05/2022
        */
        selectDate(value){
            this.$emit('getDate',value);
        }
    },
    watch: {
        /**
        * Mô tả: Nhận binding từ component cha vào (lúc sửa chẳng hạn)
        * @param
        * @return
        * Created by: nbtin
        * Created date: 21:38 30/05/2022
        */
        control:function(newValue){
            this.date = newValue;
        }
    },
    data() {
        return {
            date: new Date(),
            isAlert: false,
        }
    },
}
</script>

<style>
    .dp-custom-input{
        border: 1px solid #afafaf; 
    }
</style>