import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// grid-layout
import gridlayout from '@/plugins/gridlayout/css/gridlayout.css'
import GridItem from '@/plugins/gridlayout/GridItem.vue';
import GridLayout from '@/plugins/gridlayout/GridLayout.vue';
Vue.component('GridItem', GridItem)
Vue.component('GridLayout', GridLayout)
// art-layout
import artlayout from '@/plugins/artlayout/css/index.scss'
import ArtRow from '@/plugins/artlayout/row.js';
import ArtCol from '@/plugins/artlayout/col.js';
Vue.component('ArtRow', ArtRow)
Vue.component('ArtCol', ArtCol)


Vue.prototype.$prettyJs = require('js-beautify'); // also available under "js" export
Vue.prototype.$prettyCss = require('js-beautify').css;
Vue.prototype.$prettyHtml = require('js-beautify').html;

//muse-ui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);
import Helpers from 'muse-ui/lib/Helpers';
Vue.use(Helpers);
import Toast from 'muse-ui-toast';
Vue.use(Toast,{
  position: 'bottom',               // 弹出的位置
  time: 3000,                       // 显示的时长
  closeIcon: 'close',               // 关闭的图标
  close: true,                      // 是否显示关闭按钮
  successIcon: 'check_circle',      // 成功信息图标
  infoIcon: 'info',                 // 信息信息图标
  warningIcon: 'priority_high',     // 提醒信息图标
  errorIcon: 'warning'              // 错误信息图标
});
import Message from 'muse-ui-message';
import 'muse-ui-message/dist/muse-ui-message.css';
Vue.use(Message, {
  successIcon: 'check_circle',                    // 成功图标
  infoIcon: 'info',                               // 信息图标
  warningIcon: 'priority_high',                   // 提醒图标
  errorIcon: 'warning',                           // 错误图标
  iconSize: 24,                                   // 图标大小
  width: 350,                                     // 对话框的宽度
  maxWidth: '80%',                                // 对话框最大宽度
  className: '',                                  // 对话框的样式
  okLabel: '确定',                                 // 对话框确定按钮文字
  cancelLabel: '取消',                             // 对话框取消按钮文字
  transition: 'scale'                             // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
});
import 'muse-ui-loading/dist/muse-ui-loading.css'; 
import Loading from 'muse-ui-loading';
Vue.use(Loading);
import 'muse-ui-progress/dist/muse-ui-progress.css';
import NProgress from 'muse-ui-progress';
Vue.use(NProgress);

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 标签编辑器
import tagEditor from '@/views/design/tag-editor/index.js'
// 预览模板
import TplComp from './components/common/index.js'

Vue.config.productionTip = false

window._vue =new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
