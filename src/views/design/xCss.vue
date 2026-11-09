<template>
    <div style="font-size:20px;">
        <div v-if="disabledTags[node.tag]" style="text-align:center;font-size:14px;margin-top:50px;">不可编辑样式</div>
        <mu-list v-else toggle-nested style="padding:0px">
            <mu-list-item button :ripple="false" nested style="background:#F4F4F4">
                <mu-list-item-action>
                    <i class="el-icon-s-grid" ></i>
                </mu-list-item-action>
                <mu-list-item-title>布局</mu-list-item-title>
                <mu-list-item slot="nested" style="background:white;width:100%;height:280px;">
                    <div style="font-size:12px;">
                        <input type="text" class="input-padding-top" v-model="css.paddingTop" placeholder="0" >
                        <input type="text" class="input-padding-right" v-model="css.paddingRight" placeholder="0">
                        <input type="text" class="input-padding-bottom" v-model="css.paddingBottom" placeholder="0" >
                        <input type="text" class="input-padding-left" v-model="css.paddingLeft" placeholder="0">
                        <input type="text" class="input-margin-top" v-model="css.marginTop" placeholder="0">
                        <input type="text" class="input-margin-right" v-model="css.marginRight" placeholder="0">
                        <input type="text" class="input-margin-bottom" v-model="css.marginBottom" placeholder="0">
                        <input type="text" class="input-margin-left" v-model="css.marginLeft" placeholder="0">
                        <div class="div-element">元素</div>
                        <div class="div-padding">内边距</div>
                        <div class="div-margin">外边距</div>
                        <div class="div-width" title="需填写单位为 'px' 或 '%'">
                            宽：<input class="samir-input" style="width: 50px;" type="text" v-model="css.width" placeholder="0" />
                        </div>
                        <div class="div-height" title="需填写单位为 'px' 或 '%'">
                            高：<input class="samir-input" style="width: 50px;" type="text" v-model="css.height" placeholder="0" />
                        </div>
                    </div>
                    <div style="margin-top:410px;">
                        <span style="display:inline-block;width:50%;">
                            <mu-select label="显示模式" v-model="css.display">
                                <mu-option label="unset" value=""></mu-option>
                                <mu-option label="inline" value="inline"></mu-option>
                                <mu-option label="inline-block" value="inline-block"></mu-option>
                                <mu-option label="block" value="block"></mu-option>
                                <mu-option label="flex" value="flex"></mu-option>
                                <mu-option label="inline-flex" value="inline-flex"></mu-option>
                                <mu-option label="table" value="table"></mu-option>
                            </mu-select>
                        </span>
                        <span style="display:inline-block;width:50%;">
                            <mu-select label="浮动" v-model="css.float">
                                <mu-option label="none" value=""></mu-option>
                                <mu-option label="left" value="left"></mu-option>
                                <mu-option label="right" value="right"></mu-option>
                            </mu-select>
                        </span>
                    </div>
                </mu-list-item>
            </mu-list-item>

            <mu-list-item button :ripple="false" nested style="background:#F4F4F4">
                <mu-list-item-action>
                    <i class="el-icon-document" ></i>
                </mu-list-item-action>
                <mu-list-item-title>文字</mu-list-item-title>
                <mu-list-item slot="nested" style="background:white;width:100%;height:350px;">
                    <div class="layout-m-p-box">
                        <div style="width:48%;display:inline-block;">
                            <mu-select label="字符" v-model="css.fontWeight" full-width>
                                <mu-option label="常规" value="normal"></mu-option>
                                <mu-option label="加粗" value="bold"></mu-option>
                                <mu-option label="极细" value="lighter"></mu-option>
                            </mu-select>
                        </div>
                        &nbsp;
                        <div style="width:48%;display:inline-block;">
                            <mu-text-field style="width:100%;" v-model="css.fontSize" label="大小" suffix="px" placeholder="0" ></mu-text-field>
                        </div>
                        <div style="width:48%;display:inline-block;">
                            <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> 颜色值 </span>
                            <el-color-picker show-alpha size="mini" v-model="css.color" :predefine="predefineColors"></el-color-picker>
                        </div>
                        <div style="width:48%;display:inline-block;">
                            <mu-text-field style="width:100%;" label="行间距" v-model="css.lineHeight" suffix="px" placeholder="0" ></mu-text-field>
                        </div>
                        <div style="width:48%;display:inline-block;">
                            <mu-select label="对齐方式" v-model="css.textAlign" full-width>
                                <mu-option label="居左" value="left"></mu-option>
                                <mu-option label="居中" value="center"></mu-option>
                                <mu-option label="居右" value="right"></mu-option>
                                <mu-option label="两端对齐" value="justify"></mu-option>
                            </mu-select>
                        </div>
                        <div style="width:48%;display:inline-block;">
                            <mu-select label="文本修饰" v-model="css.textDecoration" full-width>
                                <mu-option label="无" value="none"></mu-option>
                                <mu-option label="下划线" value="underline"></mu-option>
                                <mu-option label="中划线" value="line-through"></mu-option>
                            </mu-select>
                        </div>
                        <div>
                            不透明度
                            <el-slider :step="0.05" :min="0" :max="1" v-model="css.opacity" :show-input="false" ></el-slider>
                        </div>
                    </div>
                </mu-list-item>
            </mu-list-item>

            <mu-list-item button :ripple="false" nested style="background:#F4F4F4">
                <mu-list-item-action>
                    <i class="el-icon-s-platform" ></i>
                </mu-list-item-action>
                <mu-list-item-title>背景</mu-list-item-title>
                <mu-list-item slot="nested" style="background:white;width:100%;height:60px;">
                    <div class="layout-m-p-box">
                        <div style="position: absolute;top: 10px;">
                            <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> 颜色值 </span>
                            <el-color-picker show-alpha size="mini" v-model="css.background" :predefine="predefineColors"></el-color-picker>
                        </div>
                    </div>
                </mu-list-item>
            </mu-list-item>

            <mu-list-item button :ripple="false" nested style="background:#F4F4F4">
                <mu-list-item-action>
                    <i class="el-icon-full-screen" ></i>
                </mu-list-item-action>
                <mu-list-item-title>边框</mu-list-item-title>
                <mu-list-item slot="nested" style="background:white;width:100%;height:700px;">
                    <div class="layout-m-p-box">
                        <div>
                            <div style="margin-top:10px;">边框</div>
                            <div>
                                <mu-tooltip placement="top" content="上边框">
                                    <div class="div-border-top" :class="{'div-border-selected':borderSelected == 'Top'}" @click="changeBorderSelected('Top')"></div>
                                </mu-tooltip>
                                <mu-tooltip placement="right" content="右边框">
                                    <div class="div-border-right" :class="{'div-border-selected':borderSelected == 'Right'}" @click="changeBorderSelected('Right')"></div>
                                </mu-tooltip>
                                <mu-tooltip placement="top" content="全边框">
                                    <div class="div-border-center" :class="{'div-border-selected':borderSelected == 'all'}" @click="changeBorderSelected('all')"></div>
                                </mu-tooltip>
                                <mu-tooltip placement="left" content="左边框">
                                    <div class="div-border-left" :class="{'div-border-selected':borderSelected == 'Left'}" @click="changeBorderSelected('Left')"></div>
                                </mu-tooltip>
                                <mu-tooltip placement="bottom" content="底边框">
                                    <div class="div-border-bottom" :class="{'div-border-selected':borderSelected == 'Bottom'}" @click="changeBorderSelected('Bottom')"></div>
                                </mu-tooltip>
                            </div>
                            <div style="width:48%;display:inline-block;">
                                <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> 颜色值 </span>
                                <el-color-picker show-alpha size="mini" v-model="broderColor" :predefine="predefineColors"></el-color-picker>
                            </div>
                            <div style="width:48%;display:inline-block;">
                                <mu-text-field style="width:100%;" v-model="borderWidth" label="宽度值" suffix="px" placeholder="0" ></mu-text-field>
                            </div>
                            <div>
                                <mu-select label="样式" v-model="borderStyle" full-width>
                                    <mu-option label="无边框" value="none"></mu-option>
                                    <mu-option label="实线" value="solid"></mu-option>
                                    <mu-option label="虚线" value="dashed"></mu-option>
                                    <mu-option label="点线" value="dotted"></mu-option>
                                </mu-select>
                            </div>
                            <div>
                                <mu-select label="border-collapse" v-model="css.borderCollapse" full-width>
                                    <mu-option label="unset" value=""></mu-option>
                                    <mu-option label="collapse" value="collapse"></mu-option>
                                    <mu-option label="separate" value="separate"></mu-option>
                                </mu-select>
                            </div>
                            <div style="width:100%;display:inline-block;">
                                <mu-text-field v-model="css.borderSpacing" label="border-spacing" suffix="px" placeholder="0" ></mu-text-field>
                            </div>
                        </div>
                        <div>
                            <div style="margin-top:10px;">圆角</div>
                            <div>
                                <mu-tooltip placement="top-end" content="左上角">
                                    <div class="div-radius-lt" :class="{'div-border-selected':radiusSelected == 'TopLeft'}" @click="changeRadiusSelected('TopLeft')"></div>
                                </mu-tooltip>
                                <mu-tooltip placement="top-start" content="右上角">
                                    <div class="div-radius-rt" :class="{'div-border-selected':radiusSelected == 'TopRight'}" @click="changeRadiusSelected('TopRight')"></div>
                                </mu-tooltip>
                                <mu-tooltip placement="top" content="全角">
                                    <div class="div-radius-all" :class="{'div-border-selected':radiusSelected == 'all'}" @click="changeRadiusSelected('all')"></div>
                                </mu-tooltip>
                                <mu-tooltip placement="bottom-end" content="左下角">
                                    <div class="div-radius-lb" :class="{'div-border-selected':radiusSelected == 'BottomLeft'}" @click="changeRadiusSelected('BottomLeft')"></div>
                                </mu-tooltip>
                                <mu-tooltip placement="bottom-start" content="右下角">
                                    <div class="div-radius-rb" :class="{'div-border-selected':radiusSelected == 'BottomRight'}" @click="changeRadiusSelected('BottomRight')"></div>
                                </mu-tooltip>
                            </div>
                            <div style="width:100%;display:inline-block;">
                                <mu-text-field style="width:100%;" label="角度值" v-model="borderRadius" suffix="px" placeholder="0" ></mu-text-field>
                            </div>
                        </div>
                    </div>
                </mu-list-item>
            </mu-list-item>

            <mu-list-item button :ripple="false" nested style="background:#F4F4F4">
                <mu-list-item-action>
                    <i class="el-icon-copy-document" ></i>
                </mu-list-item-action>
                <mu-list-item-title>阴影</mu-list-item-title>
                <mu-list-item slot="nested" style="background:white;width:100%;height:500px;">
                    <div class="layout-m-p-box">
                        <div style="margin-top:10px;">
                            <mu-select label="阴影" v-model="boxShadow.type" full-width>
                                <mu-option label="内阴影" value="inset"></mu-option>
                                <mu-option label="外阴影" value="outset"></mu-option>
                            </mu-select>
                        </div>
                        <div style="width:100%;">
                            <span style="line-height: 40px;margin-right:10px;position: relative;left: 0px;top: -10px;"> 颜色值 </span>
                            <el-color-picker show-alpha size="mini" v-model="boxShadow.color" :predefine="predefineColors"></el-color-picker>
                        </div>
                        <div style="width:48%;display:inline-block;margin-right:5px;">
                            <mu-text-field style="width:100%;" label="X" v-model="boxShadow.x" suffix="px" placeholder="0" ></mu-text-field>
                        </div>
                        &nbsp;
                        <div style="width:48%;display:inline-block;">
                            <mu-text-field style="width:100%;" label="Y" v-model="boxShadow.y" suffix="px" placeholder="0" ></mu-text-field>
                        </div>
                        &nbsp;
                        <div style="width:48%;display:inline-block;;margin-right:5px;">
                            <mu-text-field style="width:100%;" label="模糊" v-model="boxShadow.blur" suffix="px" placeholder="0" ></mu-text-field>
                        </div>
                        &nbsp;
                        <div style="width:48%;display:inline-block;">
                            <mu-text-field style="width:100%;" label="扩散" v-model="boxShadow.spread" suffix="px" placeholder="0" ></mu-text-field>
                        </div>
                    </div>
                </mu-list-item>
            </mu-list-item>
        </mu-list>
    </div>
</template>

<script>
const NEED_PX = {
    marginTop:true,
    marginRight:true,
    marginBottom:true,
    marginLeft:true,
    paddingTop:true,
    paddingRight:true,
    paddingBottom:true,
    paddingLeft:true,
    fontSize:true,
    lineHeight:true,
    borderTopWidth:true,
    borderRightWidth:true,
    borderBottomWidth:true,
    borderLeftWidth:true,
    borderTopLeftRadius:true,
    borderTopRightRadius:true,
    borderBottomLeftRadius:true,
    borderBottomRightRadius:true,
    borderSpacing:true
}
const DISABLED_TAGS = {
    'text':true,
    'template':true
}
export default {
    data(){
        if(this.node['x-css'] && JSON.stringify(this.node['x-css']) != '{}'){
            return Object.assign({}, this.node['x-css'])
        }
        return{
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ],
            disabledTags: DISABLED_TAGS,
            borderSelected:'',
            broderColor:'',
            borderWidth:null,
            borderStyle:'',
            radiusSelected:'',
            borderRadius:null,
            boxShadow:{
                type:'',
                color:'',
                x:null,
                y:null,
                blur:null,
                spread:null
            },
            css:{
                marginTop:null,
                marginRight:null,
                marginBottom:null,
                marginLeft:null,
                paddingTop:null,
                paddingRight:null,
                paddingBottom:null,
                paddingLeft:null,
                width:null,
                height:null,
                fontWeight:'',
                fontSize:null,
                color:'',
                lineHeight:null,
                textAlign:'',
                textDecoration:'',
                opacity:null,
                background:'',
                borderTopColor:'',
                borderTopWidth:null,
                borderTopStyle:'',
                borderRightColor:'',
                borderRightWidth:null,
                borderRightStyle:'',
                borderBottomColor:'',
                borderBottomWidth:null,
                borderBottomStyle:'',
                borderLeftColor:'',
                borderLeftWidth:null,
                borderLeftStyle:'',
                borderTopLeftRadius:null,
                borderTopRightRadius:null,
                borderBottomLeftRadius:null,
                borderBottomRightRadius:null,
                boxShadow:'',
                float:'',
                display:'',
                borderCollapse:'',
                borderSpacing:null
            }
        }
    },
    props:{
        node:{}
    },
    created(){
        
    },
    methods:{
        changeBorderSelected(value){
            this.borderSelected = value
        },
        changeRadiusSelected(value){
            this.radiusSelected = value
        },
        calcStyle(){
            return this.createMarkup(this.css)
        },
        createMarkup(obj) {
            var keys = Object.keys(obj);
            if (!keys.length) return '';
            var i, len = keys.length;
            var result = '';

            for (i = 0; i < len; i++) {
                var key = keys[i];
                var val = obj[key];
                if(val && val != 0){
                    result += this.hyphenate(key) + ':' + this.addPx(key, val) + ';';
                }
            }
            return result;
        },
        hyphenate(str) {
            return str.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
        },
        addPx(key, val){
            if(NEED_PX[key]) {
                return val + 'px';
            } else {
                return val;
            }
        }
    },
    watch:{
        css:{
            handler(newVal,oldVal){
                let style = this.calcStyle()
                let attr = JSON.parse(JSON.stringify(this.node.attrsMap))
                if(style){
                    attr.style = style
                } else {
                    delete attr.style
                }
                this.$set(this.node, 'x-css', this.$data)
                this.$set(this.node, 'attrsMap', attr)
            },
            deep:true
        },
        boxShadow:{
            handler(newVal,oldVal){
                this.css.boxShadow = `${this.boxShadow.x || 0}px ${this.boxShadow.y || 0}px ${this.boxShadow.blur || 0}px ${this.boxShadow.spread || 0}px ${this.boxShadow.color} ${this.boxShadow.type == 'outset' ? '' : this.boxShadow.type}`
            },
            deep:true
        },
        borderRadius(newVal, oldVal){
            if(!this.radiusSelected || this.radiusSelected.trim().length == 0){
                return
            }
            if(this.radiusSelected == 'all') {
                this.css.borderTopLeftRadius = newVal
                this.css.borderTopRightRadius = newVal
                this.css.borderBottomLeftRadius = newVal
                this.css.borderBottomRightRadius = newVal
            } else {
                this.css[`border${this.radiusSelected}Radius`] = newVal
            }
        },
        broderColor(newVal, oldVal){
            if(!this.borderSelected || this.borderSelected.trim().length == 0){
                return
            }
            if(this.borderSelected == 'all') {
                this.css.borderTopColor = newVal
                this.css.borderRightColor = newVal
                this.css.borderBottomColor = newVal
                this.css.borderLeftColor = newVal
            } else {
                this.css[`border${this.borderSelected}Color`] = newVal
            }
        },
        borderWidth(newVal, oldVal){
            if(!this.borderSelected || this.borderSelected.trim().length == 0){
                return
            }
            if(this.borderSelected == 'all'){
                this.css.borderTopWidth = newVal
                this.css.borderRightWidth = newVal
                this.css.borderBottomWidth = newVal
                this.css.borderLeftWidth = newVal
            } else {
                this.css[`border${this.borderSelected}Width`] = newVal
            }
        },
        borderStyle(newVal, oldVal){
            if(!this.borderSelected || this.borderSelected.trim().length == 0){
                return
            }
            if(this.borderSelected == 'all'){
                this.css.borderTopStyle = newVal
                this.css.borderRightStyle = newVal
                this.css.borderBottomStyle = newVal
                this.css.borderLeftStyle = newVal
            } else {
                this.css[`border${this.borderSelected}Style`] = newVal
            }
        }
    }
}
</script>


<style>
.input-padding-top{
    text-align: center;
    width:25px;
    position: absolute;
    top: 35px;
    left:100px;
    z-index: 4;
    background: none;
    border: none;
    outline:none;
}
.input-padding-right{
    text-align: center;
    width:25px;
    position: absolute;
    top: 65px;
    left:135px;
    z-index: 4;
    background: none;
    border: none;
    outline:none;
}
.input-padding-bottom{
    text-align: center;
    width:25px;
    position: absolute;
    top: 95px;
    left:100px;
    z-index: 4;
    background: none;
    border: none;
    outline:none;
}
.input-padding-left{
    text-align: center;
    width:25px;
    position: absolute;
    top: 65px;
    left:63px;
    z-index: 4;
    background: none;
    border: none;
    outline:none;
}
.input-margin-top{
    text-align: center;
    width:25px;
    position: absolute;
    top: 8px;
    left:100px;
    z-index: 4;
    background: none;
    border: none;
    outline:none;
}
.input-margin-right{
    text-align: center;
    width:25px;
    position: absolute;
    top: 65px;
    left:165px;
    z-index: 4;
    background: none;
    border: none;
    outline:none;
}
.input-margin-bottom{
    text-align: center;
    width:25px;
    position: absolute;
    top: 122px;
    left:100px;
    z-index: 4;
    background: none;
    border: none;
    outline:none;
}
.input-margin-left{
    text-align: center;
    width:25px;
    position: absolute;
    top: 65px;
    left:33px;
    z-index: 4;
    background: none;
    border: none;
    outline:none;
}
.div-element{
    text-align: center;
    line-height: 25px;
    position: absolute;
    background: #8BB4C0;
    width:43px;
    height:25px;
    top:65px;
    left:90px;
    z-index: 3;
    border: 1px solid #808080;
}
.div-padding{
    position: absolute;
    background: #C2CE89;
    width:103px;
    height:88px;
    top:33px;
    left:60px;
    z-index: 2;
    border: 1px dashed rgb(85, 116, 81);
}
.div-margin{
    position: absolute;
    background: #F9CC9D;
    width:163px;
    height:142px;
    top:6px;
    left:30px;
    z-index: 1;
    border: 1px dashed rgb(10, 10, 10);
}
.layout-m-p-box{
    font-size:12px;
    display: block;
    width: 90%;
    position: absolute;
    left: 10px;
    height: 100%;
    color: black;
}
.div-width{
    position: absolute;
    left: 30px;
    top: 155px;
}
.div-height{
    position: absolute;
    left: 120px;
    top: 155px;
}
.samir-input{
    outline: none;
    border: none;
    border-bottom: 1px solid #19a15f;
}
.samir-input:focus{
    box-shadow: 0px 1px 0px #6eec98;
}

.div-border-top{
    position: relative;
    top:10px;
    left:70px;
    width: 20px;
    height: 20px;
    border: 1px solid black;
    border-top-width: 2px;
    cursor: pointer;
}
.div-border-right{
    position: relative;
    top:13px;
    left:93px;
    width: 20px;
    height: 20px;
    border: 1px solid black;
    border-right-width: 2px;
    cursor: pointer;
}
.div-border-bottom{
    position: relative;
    top:-25px;
    left:70px;
    width: 20px;
    height: 20px;
    border: 1px solid black;
    border-bottom-width: 2px;
    cursor: pointer;
}
.div-border-left{
    position: relative;
    top:-27px;
    left:47px;
    width: 20px;
    height: 20px;
    border: 1px solid black;
    border-left-width: 2px;
    cursor: pointer;
}
.div-border-center{
    position: relative;
    top:-7px;
    left:70px;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    cursor: pointer;
}

.div-border-selected{
    border-color: #19A15F !important;
}

.div-radius-lt{
    position: relative;
    top:10px;
    left:50px;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-top-left-radius: 10px;
    border-right: none;
    border-bottom: none;
    cursor: pointer;
}
.div-radius-rt{
    position: relative;
    top:-10px;
    left:90px;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-top-right-radius: 10px;
    border-left: none;
    border-bottom: none;
    cursor: pointer;
}
.div-radius-all{
    position: relative;
    top:-10px;
    left:70px;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 2px;
    cursor: pointer;
}
.div-radius-lb{
    position: relative;
    top:-10px;
    left:50px;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-bottom-left-radius: 10px;
    border-right: none;
    border-top: none;
    cursor: pointer;
}
.div-radius-rb{
    position: relative;
    top:-30px;
    left:90px;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-bottom-right-radius: 10px;
    border-left: none;
    border-top: none;
    cursor: pointer;
}

</style>