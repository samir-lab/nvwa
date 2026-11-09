let list = [
    {
        desc:'Html div', 
        tpl:`<div>div 块容器</div>`, 
        data:{}
    },
    {
        desc:'Html span', 
        tpl:`<span>span 行内容器</span>`, 
        data:{}
    },
    {
        desc:'Html label', 
        tpl:`<label>label 标签</label>`, 
        data:{}
    },
    {
        desc:'Html p', 
        tpl:`<p>p 段落</p>`, 
        data:{}
    },
    {
        desc:'Html a', 
        tpl:`<a href="https://www.trip.com" target="_blank" style="color:black">a 超链接</a>`, 
        data:{}
    },
    {
        desc:'Html img', 
        tpl:`<img src="https://dimg04.c-ctrip.com/images/AQ0h1700000116oqlC947.png" alt="Trip.com"></img>`, 
        data:{}
    },
    {
        desc:'Html table',
        tpl: `<table border="1">
                <tr>
                    <th>表头a</th>
                    <th>表头b</th> 
                    <th>表头c</th>
                </tr>
                <tr>
                    <td>Jill</td>
                    <td>Smith</td> 
                    <td>50</td>
                </tr>
                <tr>
                    <td>Eve</td>
                    <td>Jackson</td> 
                    <td>94</td>
                </tr>
            </table>`,
        data:{}
    },
    {
        desc:'Art 行布局器（48列）', 
        tpl:`<art-row :gutter="20">
                <art-col :span="16">第一列</art-col>
                <art-col :span="16">第二列</art-col>
                <art-col :span="16">第三列</art-col>
            </art-row>`, 
        data:{}
    },
    {
        desc:'element 行布局器（24列）', 
        tpl:`<el-row :gutter="20">
                <el-col :span="8">第一列</el-col>
                <el-col :span="8">第二列</el-col>
                <el-col :span="8">第三列</el-col>
            </el-row>`, 
        data:{}
    },
    {
        desc:'按钮', 
        tpl:`<el-button>默认按钮</el-button>`, 
        data:{}
    },
    {
        desc:'文字链接', 
        tpl:`<el-link>默认链接</el-link> `, 
        data:{}
    },
    {
        desc:'文本框', 
        tpl:`<el-input placeholder="请输入"></el-input>`, 
        data:{}
    },
    {
        desc:'表格',
        tpl:`<el-table :data="tableData" >
                <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>`,
        data:{
            tableData:[{
                date: '05-02',
                name: '王小虎',
                address: '上海市'
            }, {
                date: '05-04',
                name: '王小虎',
                address: '普陀区'
            }]
        }
    },
    {
        desc:'分页',
        tpl:`<el-pagination layout="prev, pager, next" :total="31"></el-pagination>`,
        data: {}
    },
    {
        desc:'Tag标签',
        tpl:`<el-tag>Tag标签</el-tag>`,
        data:{}
    },
    {
        desc:'单选框组', 
        tpl:`<el-radio-group v-model="radio">
                <el-radio label="1">备选项1</el-radio>
                <el-radio label="2">备选项2</el-radio>
                <el-radio label="3">备选项3</el-radio>
            </el-radio-group>`, 
        data:{radio:1}
    },
    {
        desc:'多选框', 
        tpl:`<el-checkbox v-model="checked" >备选项</el-checkbox>`, 
        data:{checked:true}
    },
    {
        desc:'多选框组', 
        tpl:`<el-checkbox-group v-model="checkList" >
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
            </el-checkbox-group>` ,
        data:{checkList: ['选中且禁用','复选框 A']}
    },
    {
        desc:'下拉选择器',
        tpl: `<el-select v-model="selectvalue" placeholder="请选择">
                <el-option label="黄金糕" value="选项1"></el-option>
                <el-option label="双皮奶" value="选项2"></el-option>
                <el-option label="蚵仔煎" value="选项3"></el-option>
            </el-select>`,
        data:{selectvalue:''}
    },
    {
        desc:'开关', 
        tpl:`<el-switch v-model="active">
            </el-switch>`, 
        data:{active: true}
    },
    {
        desc:'日期选择器', 
        tpl:`<el-date-picker v-model="datevalue" type="date" placeholder="选择日期"></el-date-picker>`, 
        data:{datevalue: ''}
    },
    {
        desc:'时间选择器', 
        tpl:`<el-time-picker v-model="timevalue" placeholder="任意时间点"></el-time-picker>`, 
        data:{timevalue: new Date(2016, 9, 10, 18, 40)}
    },
    {
        desc:'表单', 
        tpl:`<el-form :model="model" label-width="70px" size="mini">
                <el-form-item label="活动名称">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="model.region" placeholder="请选择活动区域">
                        <el-option label="上海" value="shanghai"></el-option>
                        <el-option label="北京" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>`, 
        data:{model: {name:'', region:''}}
    },
    {
        desc:'按钮组', 
        tpl: `<el-button-group>
                <el-button type="primary" icon="el-icon-edit"></el-button>
                <el-button type="primary" icon="el-icon-share"></el-button>
                <el-button type="primary" icon="el-icon-delete"></el-button>
            </el-button-group>`, 
        data:{}
    },
    {
        desc:'计数器', 
        tpl:`<el-input-number v-model="num" label="描述文字"></el-input-number>`, 
        data:{num:1}
    },
    {
        desc:'标签页',
        tpl:`<el-tabs v-model="activeName" >
                <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            </el-tabs>`,
        data:{activeName: 'second'}
    },
    {
        desc:'面包屑',
        tpl:`<el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            </el-breadcrumb>`,
        data:{}
    },
    {
        desc:'页头',
        tpl:`<el-page-header content="详情页面"></el-page-header>`,
        data:{}
    },
    {
        desc:'下拉菜单',
        tpl:`<el-dropdown>
                <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>`,
        data:{}
    },
    {
        desc:'步骤条',
        tpl:`<el-steps :active="stepsactive" finish-status="success">
                <el-step title="步骤 1"></el-step>
                <el-step title="步骤 2"></el-step>
                <el-step title="步骤 3"></el-step>
            </el-steps>`,
        data:{stepsactive:1}
    },
    {
        desc:'滑块', 
        tpl:`<el-slider v-model="slidervalue"></el-slider>`, 
        data:{slidervalue: 15}
    },
    {
        desc:'评分', 
        tpl:`<el-rate v-model="ratevalue"></el-rate>`, 
        data:{ratevalue: 0}
    },
    {
        desc:'进度条',
        tpl:`<el-progress :percentage="50" status="warning"></el-progress>`,
        data:{}
    },
    {
        desc:'头像',
        tpl:`<el-avatar icon="el-icon-user-solid"></el-avatar>`,
        data: {}
    },
    {
        desc:'警告框',
        tpl:`<el-alert title="成功提示的文案" type="success"></el-alert>`,
        data:{}
    },
    {
        desc:'导航菜单',
        tpl:`<el-menu default-active="2" >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
            </el-menu>`,
        data:{}
    },
    {
        desc:'折叠面板',
        tpl:`<el-collapse>
                <el-collapse-item title="一致性 Consistency" name="1">
                    <div>描述一</div>
                </el-collapse-item>
                <el-collapse-item title="反馈 Feedback" name="2">
                    <div>描述二</div>
                </el-collapse-item>
            </el-collapse>`,
        data:{}
    },
    {
        desc:'时间线',
        tpl:`<el-timeline>
                <el-timeline-item timestamp="2018-04-15">
                    活动按期开始
                </el-timeline-item>
                <el-timeline-item timestamp="2018-04-13" color="#0bbd87">
                    通过审核
                </el-timeline-item>
                <el-timeline-item timestamp="2018-04-11" color="#0bbd87">
                    创建成功
                </el-timeline-item>
            </el-timeline>`,
        data:{}
    },
    {
        desc:'分割线',
        tpl:`<el-divider></el-divider>`,
        data:{}
    },
    {
        desc:'卡片',
        tpl:`<el-card class="box-card">
                <div slot="header">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div v-for="o in 4" :key="o">
                    {{'列表内容 ' + o }}
                </div>
            </el-card>`,
        data:{}
    },
    {
        desc:'颜色选择器', 
        tpl:`<el-color-picker v-model="color"></el-color-picker>`, 
        data:{color: '#409EFF'}
    },
    // {
    //     desc:'穿梭框', 
    //     tpl:`<el-transfer v-model="value" :data="data"></el-transfer>`, 
    //     data:{value: [1, 2],data:[{key: 1, label: `备选项 1`},{key: 2, label: `备选项 2`},{key: 3, label: `备选项 3`}]}
    // }
    {
        desc:'树形控件',
        tpl:`<el-tree :data="treeData" ></el-tree>`,
        data:{
            treeData: [
                {
                    label: '一级 1',
                    children: [{label: '二级 1-1',children: [{label: '三级 1-1-1'}]}]
                }, {
                    label: '一级 2',
                    children: [{label: '二级 2-1',children: [{label: '三级 2-1-1'}]}, {label: '二级 2-2',children: [{label: '三级 2-2-1'}]}]
                }
            ]
        }
    },
    {
        desc:'走马灯',
        tpl:`<el-carousel height="100px">
                <el-carousel-item style="background-color: #99a9bf;text-align:center" v-for="item in 2" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>`,
        data:{}
    },
    {
        desc:'图片',
        tpl:`<el-image style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="contain">
            </el-image>`,
        data:{}
    }
]
export default list 