<template>

    <div class="app" @lifecycle="lifecycle">

        <!-- 搜索框 -->
        <div class="seach_bg">

            <div class="seach_box">
               <div class="seach_box_input">
                    <input class="input" v-model="value" type="text" placeholder="请输入想要查找的课程" >
                     
               </div>
                <div class="icon" v-if="iconShow" @click="clearInput">
                       <icon 
                        ref="reflectName"
                        style="width:50px; height:50px;" 
                        :eeui="{content: 'md-close', fontSize:'35px', color:'#cccccc'}" >
                    </icon>
                </div>
                <text class="seach_box_text"  @click="search">搜索</text>
            </div>
            
        </div>
    
        <scroller class="menu" v-if="courseListShow">
            <div v-for="(item, index) in lists" :key="index" :class="[active === index ? 'menu-item-active' : 'menu-item']" @click="selectMenu(index)">
        
                <text class="menu-item-text">{{item.name}}</text>
            </div>
            <div class="bottom-placeholder"></div>
        </scroller>

        <scroll-view ref="myScroll" class="course"  v-if="courseListShow">
            <template v-for="(item, index) in lists" >
                <!-- 滑动头 -->
                <scroll-header class="course-layer" @stateChanged="stateChanged(index, $event)" :key="index" >
                    <text class="course-layer-text">{{item.name}}</text>
                </scroll-header>
                <!-- 内容 -->
                <div v-for="(course, findex) in item.list" :class="[findex === 0 ? 'course-item-first' : 'course-item']" :key="findex" @click="goto(course.id,course.stuNum,course.stuNo)" >
                    <image class="course-item-picture" :src="'http://10.12.84.20:3001'+course.icon"/>
                    <div class="course-item-info">
                        <text class="course-item-title">{{course.courseName}}</text>
                      <text class="course-item-desc">开课教师：{{course.courseTeacher}}</text>
                         <!-- <text  class="course-item-extra">课程编号：{{course.courseNo}}</text> -->
                          <text   class="course-item-extra1">限定人数：{{course.stuNum}}  报名人数：{{course.stuNo}}</text>
                        <text class="course-item-extra">{{course.courseInfo}}</text>
                        <div class="course-item-price">
                            <text v-if="course.selectNum > 0" class="course-item-number">{{course.selectNum}}</text>
                        </div>
                    </div>
                </div>
            </template>
            <div class="bottom-placeholder"></div>
        </scroll-view>
   

     
  

         <scroll-view ref="myScroll" class="course" v-else>
            <div v-for="(course, index) in searchList" :key="index" :class="[findex === 0 ? 'course-item-first' : 'course-item']" @click="goto(course.id)">
                    <image class="course-item-picture" :src="'http://10.12.84.20:3001'+course.icon"/>
                    <div class="course-item-info">
                        <text class="course-item-title">{{course.courseName}}</text>
                            <text class="course-item-desc">开课教师：{{course.courseTeacher}}</text>
                          <text   class="course-item-extra1">限定人数：{{course.stuNum}}  报名人数：0</text>
          
                        <text class="course-item-extra">{{course.courseInfo}}</text>
                        <div class="course-item-price">
                            <text v-if="course.selectNum > 0" class="course-item-number">{{course.selectNum}}</text>
                        </div>
                    </div>
            </div>

          
            <div class="bottom-placeholder"></div>
        </scroll-view>
    

    </div>

</template>

<style scoped>
    .icon{
        margin-left: -120px;
    }
    .app {
        flex: 1;
        flex-direction: row;
    }
    .menu {
        margin-top: 180px;
        flex: 2;
        background-color: #f3f5f7;
    }
    .seach_bg{
        position: absolute;
        width: 750px;
        height: 170px;
        background-color: #3F424D;
    }
    .seach_box{
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 750px;
        height: 100px;
    }
    .seach_box_input{
        border-radius: 50px;
        margin-left: 30px;
        width: 600px;
        height: 80px;
        background-color: #ffffff;
    }
    .seach_box_text{
        font-size: 28px;
        color: #ffffff;
        margin-right: 30px;
    }
    .input{
        margin-left: 30px;
       width: 550px;
        height: 80px;
    }
   
    .menu-item,
    .menu-item-active {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        height: 112px;
        background-color: #f3f5f7;
    }
    .menu-item-active {
        background-color: #ffffff;
    }
    .menu-item-label {
        width: 24px;
        height: 24px;
        margin-right: 6px;
    }
    .menu-item-text {
        flex: 1;
        color: #666666;
        text-align: center;
        font-size: 28px;
        text-overflow: ellipsis;
      
    }
    .course {
        flex: 7;
        margin-top: 200px;
    }
    .course-layer {
        justify-content: center;
        background-color: #f3f5f7;
        
        height: 52px;
    }
    .course-layer-text {
        color: #666666;
        font-size: 30px;
        padding-left: 28px;
    }
    .course-item,
    .course-item-first {
        flex-direction: row;
        align-items: flex-start;
        padding: 0 32px 32px 32px;
    }
    .course-item-first {
        padding-top: 32px;
    }
    .course-item-picture {
        width: 150px;
        height: 160px;
        margin-top: 12px;
        margin-right: 20px;
    }
    .course-item-info {
        margin-top: 10upx;
        flex: 1;
    }
    .course-item-title {
        color: #333333;
        font-size: 32px;
        margin-top: 4px;
    }
    .course-item-desc {
        color: #333333;
        font-size: 26px;
        /* margin-top: 4px; */
    }
    .course-item-extra1 {
        color: rgb(7, 7, 7);
        font-size: 26px;
        margin-top: 4px;
    }

    .course-item-extra {
        lines:2;
        text-overflow:ellipsis;
        color: #999999;
        font-size: 22px;
        margin-top: 4px;
    }
    .course-item-price {
        flex-direction: row;
        align-items: center;
    }
    .course-item-money {
        flex: 1;
        color: #f01414;
        font-size: 28px;
        margin-right: 16px;
    }
    .course-item-remove,
    .course-item-add {
        font-size: 48px;
        width: 72px;
        height: 72px;
        color: #00a0dc;
    }
    .course-item-number {
        color: #666666;
        font-size: 26px;
        text-align: center;
        padding: 0 3px;
    }
    .bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 750px;
        height: 132px;
        justify-content: flex-end;
    }
    .bottom-placeholder {
        width: 750px;
        height: 112px;
    }
    .bottom-box-cart {
        position: absolute;
        left: 24px;
        top: 0;
        width: 132px;
        height: 132px;
    }
    .bottom-box-cart-bg {
        position: absolute;
        top: 0;
        right: 0;
        width: 132px;
        height: 132px;
        background-color: #07111b;
        border-radius: 66px;
    }
    .bottom-box-cart-icon,
    .bottom-box-cart-icon-not {
        margin-top: 10px;
        margin-left: 10px;
        width: 112px;
        height: 112px;
        border-radius: 56px;
        font-size: 52px;
        background-color: #00a0dc;
        color: #ffffff;
    }
    .bottom-box-cart-icon-not {
        background-color: #333333;
        color: #999999;
    }
    .bottom-box-cart-num {
        position: absolute;
        top: 0;
        right: 2px;
        font-size: 26px;
        text-align: center;
        padding: 0 11px;
        height: 36px;
        line-height: 36px;
        color: #ffffff;
        background-color: #ff0000;
        border-radius: 18px;
    }
    .bottom-info {
        flex-direction: row;
        align-items: center;
        padding-left: 176px;
        height: 112px;
        background-color: #07111b;
    }
    .bottom-info-price,
    .bottom-info-price-not {
        color: #ffffff;
        font-size: 34px;
        font-weight: 600;
        padding-right: 20px;
    }
    .bottom-info-price-not {
        color: #999999;
    }
    .bottom-info-desc {
        flex: 1;
        border-left-width: 2px;
        border-left-style: solid;
        border-left-color: #0b1b2b;
        padding-left: 20px;
        font-size: 24px;
        color: #999999;
    }
    .bottom-info-button,
    .bottom-info-button-not {
        background-color: #00b43c;
        color: #ffffff;
        font-weight: 600;
        width: 210px;
        height: 112px;
        line-height: 112px;
        text-align: center;
        font-size: 24px;
    }
    .bottom-info-button-not {
        background-color: #333333;
        color: #999999;
    }
    .cart {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 112px;
        justify-content: flex-end;
        background-color: rgba(7, 17, 27, 0.6);
    }
    .cart-head {
        flex-direction: row;
        align-items: center;
        background-color: #f3f5f7;
        height: 80px;
        padding: 0 36px;
    }
    .cart-head-title {
        flex: 1;
        color: #333333;
        font-size: 28px;
    }
    .cart-head-clear {
        color: #00a0dc;
        font-size: 26px;
    }
    .cart-list {
        background-color: #ffffff;
    }
    .cart-item,
    .cart-item-first {
        flex-direction: row;
        align-items: center;
        height: 96px;
        margin: 0 36px;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: rgba(28, 70, 110, 0.1);
    }
    .cart-item-first {
        border-top-width: 0;
    }
    .cart-item-title {
        flex: 1;
        color: #333333;
        font-size: 28px;
    }
    .cart-item-money {
        color: #f01414;
        font-size: 30px;
        margin-right: 16px;
    }
    .cart-item-price {
        flex-direction: row;
        align-items: center;
    }
    .cart-item-remove,
    .cart-item-add {
        font-size: 48px;
        width: 72px;
        height: 72px;
        color: #00a0dc;
    }
    .cart-item-number {
        color: #666666;
        font-size: 26px;
        text-align: center;
        padding: 0 3px;
    }
</style>
<script>
    const eeui = app.requireModule('eeui');
    const stream = weex.requireModule('stream') || {};
    
const storage = weex.requireModule("storage");

    export default {
        data() {
            return {
                active: 0,
                lists: [],
                courseList:[],
                name:'',
                cartShow: false,
                cartNum: 0,
                cartMoney: 0,
                value:'',
                searchList:[],
                show:"",
                courseListShow:true,
                iconShow:false,
                len:""
            }
        },

        mounted() {
            
        },
        watch: {
            value(newValue,oldValue){

                if(newValue == ""){
                    this.courseListShow = true
                    this.iconShow = false
                }else{
                    this.iconShow = true
                }
            }
        },

        methods: {
               lifecycle(e){
                if (e.status == 'resume') 
	            {
                   this.getCourse()
	            }
            },
            clearInput(){
                this.value = ""
            },
            search(){
                let that = this
             

               if(this.value != ""){
                   this.courseListShow = false
               }

                const body = JSON.stringify({
                    courseName:that.value
                })
                // 10.12.84.20
                stream.fetch({
                    method: 'POST',
                    url: 'http://10.12.84.20:3001/api/searchCourse',
                    type:'json',
                    body: body,
                    headers:{
                        "Content-Type":"application/json"
                    }
                    }, function(res) {
                       if(res.ok){  

                        console.log(res.data)
                        if(res.data.code == 200){
                             that.searchList = res.data.data
                        }else if(res.data.code == 400){
                            that.searchList = res.data.data
                           
                        }
                        }
                    })

                    
               
            },
        
            // 获取课程详细信息
            getCourse(){
                let that = this
                 stream.fetch({
                    method: 'GET',
                    url: 'http://10.12.84.20:3001/api/getCourse',
                    type:'json'
                    }, function(res) {
                       if(res.ok){  
                            that.lists = res.data
                             for(let i of that.lists){
                                 if(i.list){
                                    //  console.log(i.list)
                                     for(let j in i.list){
                                const body = JSON.stringify({
                                    id:i.list[j].id
                                })
                            stream.fetch({
                                method: 'POST',
                                url: 'http://10.12.84.20:3001/teacher/getStudentNum',
                                type:'json',
                                body: body,
                                headers:{
                                    "Content-Type":"application/json"
                                }
                                }, function(res) {
                                    i.list[j].stuNo = res.data.length
                                })

                                     }
                                 }
                             }
                           
                        }
                    })
            },
            // 点击进入详细信息
            goto(id,stuNum,stuNo){

            let that = this;

            storage.getItem("id", res => {
                var ss = JSON.parse(res.data);
                let body = JSON.stringify({ studentNo: ss.id,courseNo:id });
                stream.fetch(
                {
                    method: "POST",
                    url: "http://10.12.84.20:3001/histroy/histroyAddforStudent",
                    type: "json",
                    body: body,
                    headers: {
                    "Content-Type": "application/json"
                    }
                },
                function(res) {
                    if (res.ok) {
                         console.log(res.data)
                    }
                }
                );
            });

                eeui.openPage({
                    url: './Info.js',
                    pageType:'app',
                    params:{id,stuNo,stuNum},
                    statusBarType: 'immersion'
                });
            },
            //  点击菜单自动切换
            selectMenu(index) {
                let position = 0;
             
                for (let i = 0; i < this.lists.length; i++) {
                    if (i === index) {
                        break;
                    }
                    position+= this.lists[i].list.length + 1;
                }
                this.active = index;
                this.$refs.myScroll.scrollToPosition(position);
            },

            stateChanged(index, data) {
                if (data.status === "float") {
                    this.active = index;
                }
            },

            calculate() {
                let number = 0;
                let money = 0;
                for (let i = 0; i < this.lists.length; i++) {
                    let courses = this.lists[i].courses;
                    for (let j = 0; j < courses.length; j++) {
                        number+= courses[j].selectNum;
                        money+= courses[j].selectNum * courses[j].price;
                    }
                }
                this.cartNum = number;
                this.cartMoney = money;
            },

            cartClear() {
                for (let i = 0; i < this.lists.length; i++) {
                    let courses = this.lists[i].courses;
                    for (let j = 0; j < courses.length; j++) {
                        if (courses[j].selectNum > 0) {
                            this.$set(courses[j], 'selectNum', 0);
                        }
                    }
                }
                this.cartNum = 0;
                this.cartMoney = 0;
                this.cartShow = false;
            },

           
        }
    }
</script>
