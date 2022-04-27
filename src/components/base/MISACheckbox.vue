<template>
  <!-- Nếu true thì nhận giá trị css -->
  <div
    class="m-checkbox"
    :class="{
      'm-checkbox-selected': isCheckBox,
    }"
  ></div>
</template>
<script>
export default {
  name: "the-checkbox",
  props:["isCheckBox","tag"],
  methods:{

  },
  data() {
    return {
      isChecked: false,
      checkAll:false,
    };
  },
};
</script>
<style>
@import url(../../css/mainDemo.css);
</style>