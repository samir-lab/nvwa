<template>
  <div
    class="context-menu"
    v-show="show"
    :style="style"
    @mousedown.stop
    @contextmenu.prevent >
    <div class="context-menu-item">
        <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "context-menu",
  data() {
    return {
      style: {}
    };
  },
  props: {
    offset: {
      type: Object,
      default: function() {
        return {
          left: 0,
          top: 0
        };
      }
    },
    show: Boolean
  },
  watch: {
    show(show) {
      if (show) {
        this.$nextTick(this.setPosition);
      }
    }
  },
  beforeDestroy() {
    let popperElm = this.$el;
    if (popperElm && popperElm.parentNode === document.body) {
      document.body.removeChild(popperElm);
    }
    document.removeEventListener("mousedown", this.clickDocumentHandler);
  },
  mounted() {
    document.body.appendChild(this.$el);
    document.addEventListener("mousedown", this.clickDocumentHandler);
  },
  methods: {
    clickDocumentHandler() {
      if (this.show) {
        this.$emit("update:show", false);
      }
    },
    setPosition() {
      let docHeight = document.documentElement.clientHeight;
      let docWidth = document.documentElement.clientWidth;
      let menuHeight = this.$el.getBoundingClientRect().height;
      let menuWidth = this.$el.getBoundingClientRect().width;
      // 增加点击处与菜单间间隔，较为美观
      const gap = 10;
      let topover =
        this.offset.top + menuHeight + gap >= docHeight
          ? menuHeight + gap
          : -gap;
      let leftover =
        this.offset.left + menuWidth + gap >= docWidth ? menuWidth + gap : -gap;
      this.style = {
        left: `${this.offset.left - leftover}px`,
        top: `${this.offset.top - topover}px`
      };
    }
  }
};
</script>
<style>
.context-menu {
  z-index: 1000;
  display: block;
  position: absolute;
}
.context-menu-item{
    border: 1px solid #FFCD43;
    border-radius: 1px;
    width: 200px;    
    padding:10px 10px;
    background: wheat;
    box-shadow: 1px 2px 2px rgb(223, 222, 221);
    cursor: pointer;
    font-weight: 500;
}
</style>