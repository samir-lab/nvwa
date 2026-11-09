<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
body{
  min-width: 1320px;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width:3px;
  height: 5px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  box-shadow:inset006pxrgba(0,0,0,0.3);
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
  border-radius:2px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:2px;
  background:#1565C0;
  box-shadow:inset006pxrgba(0,0,0,0.3);
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background:#1565C0;
}
</style>
