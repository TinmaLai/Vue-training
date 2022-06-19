<template>
    <div class="overlay-parent"></div>
    <div class="loading-icon">

    </div>
</template>

<script>
export default {

}
</script>

<style>
    .overlay-parent{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.5;
        z-index: 4;
    }
    .loading-icon{
        background-image: url(../../asset/icons/loading.gif);
        background-size: 50px;
        height: 100%;
        width: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        z-index: 10;
        position: absolute;
    }
</style>