<template>
  <div @lifecycle="lifecycle">
    <!-- 头部 -->
    <div class="comment_title">
      <text class="new_coment">编辑课程内容</text>
    </div>
    <div class="content">
      <div class="content-title">
        <text class="class-name">课程名字 ：</text>
        <input class="content-input" type="text" v-model="name" placeholder="请输入课程名字" />
      </div>

      <div class="line"></div>
      <div class="course-info">
        <textarea
          class="info-textarea"
          name
          id
          cols="30"
          rows="10"
          v-model="info"
          placeholder="请输入课程描述"
        ></textarea>
      </div>
      <div class="lines"></div>
      <div class="content-title">
        <text class="class-name">上课地点 ：</text>
        <input class="content-input" type="text" v-model="address" placeholder="请输入上课地点" />
      </div>
      <div class="line"></div>
      <div class="content-title">
        <text class="class-name">开课学院 ：</text>
        <input class="content-input" type="text" v-model="college" placeholder="请输入开课学院" />
      </div>
      <div class="line"></div>
      <div class="content-title">
        <text class="class-name">课程学分 ：</text>
        <input class="content-input" type="number" v-model="credit" placeholder="请输入课程学分" />
      </div>
      <div class="line"></div>
        
      <div class="content-title">
        <text class="class-name">课程人数 ：</text>
        <input class="content-input" type="number" v-model="stuNum" placeholder="请输入课程人数" />
      </div>
      <div class="line"></div>
      <div class="content-title">
        <text class="class-name">上课时间 ：</text>
        <input class="content-input" type="text" v-model="time" placeholder="请输入上课时间" />
      </div>
      <div class="lines"></div>
      <div class="course-type">
          
        <wxc-cell
          title="课程类别"
          :has-arrow="true"
          @wxcCellClicked="wxcCellClicked(1)"
          :has-top-border="false"
        ></wxc-cell>
      </div>

      <!-- 单选 -->

      <!-- 弹出层 -->

      <div>
        <wxc-mask
          height="300"
          width="402"
          border-radius="0"
          duration="200"
          mask-bg-color="#FFFFFF"
          :has-animation="hasAnimation"
          :has-overlay="true"
          :show-close="false"
          :show="show"
          @wxcMaskSetHidden="wxcMaskSetHidden"
        >
          <div class="content">
            <!-- 单选 -->
            <div class="wxc-demo">
              <scroller class="scroller">
                <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
              </scroller>
            </div>
            <!-- 单选 -->
          </div>
        </wxc-mask>
      </div>
      <!-- 弹出层结束 -->
    </div>



      <div @click="uploadImg" class="addimg">
      <div v-if="!path" class="addimg" >
         <text  > 修改课程封面 </text>  
           <img    :src="'http://10.12.84.20:3001/'+icon" style="width:180px;height:180px;" alt="">
      </div>
   
      <img    v-else :src="path" style="width:180px;height:180px;" >
    </div>




    <!-- 内容结束 -->
    <div class="publish">
      <wxc-button text="保存" type="green" size="big" @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </div>
    <!-- 发布成功 -->

    <!-- 发布成功 -->
  </div>
</template>
<script>
const eeui = app.requireModule("eeui");
const storage = weex.requireModule("storage");
const stream = weex.requireModule("stream");
const picture = app.requireModule("eeui/picture");


let path = ""

import { WxcRadio, WxcMask, WxcCell, WxcProgress, WxcButton } from "weex-ui";

export default {
  data() {
    return {
      p:"",
      path:"",
      name: "hhh",
      info: "",
      time: "",
      credit: "4",
      college: "",
      address: "",
      stuNum:"",
      typeId: "",
      icon:"",
      courseTeacherId:"",
      show: false,
      overlayCanClose: true,
      isFalse: false,
      hasAnimation: true,
      showMask: false,
      id:"",//课程Id
      list: [
        { title: "专业必修课", value: 1,checked:false },
        { title: "公共选修课", value: 2, checked: false },
        { title: "专业选修课", value: 3,checked:false },
      ],
    };
  },
   mounted() {
       


        let msg = app.config.params.data[0]

        
          // console.log(msg.icon)
        this.icon = msg.icon
        this.time = msg.courseTime
        this.name = msg.courseName
        this.info = msg.courseInfo
        this.address = msg.address
        this.college = msg.courseCollege
        this.credit = msg.credit
        this.id = msg.id
        this.courseTeacherId = msg.courseTeacherId
        this.typeId = msg.typeID
        this.stuNum = msg.stuNum

            if(msg.typeID == 1){
                this.list[0].checked = true
            } else if(msg.typeID == 2){
                this.list[1].checked = true
            }else if(msg.typeID == 3){
                this.list[2].checked = true
            }



    },
  methods: {

   lifecycle(e){
       let that = this
        if(e.status == 'resume') 
	            {
                that.path = path
	            }
     },
     uploadImg() {
       let that = this
      picture.create(
        {
          gallery: 1
        },
        function(res) {
          if (res.lists) {
            path = res.lists[0].path;
            let  p = path.split("/")


            
               that.p =  "/img/"+p[p.length-1]
           
              
          }
        }
      );
    },
   
    wxcCellClicked(e) {
      if (e == 1) {
        this.openMask();
      }
    },
    wxcRadioListChecked(e) {

      this.typeId = e.value;
    },
    openMask(e) {
      this.show = true;
      this.hasAnimation = true;
    },
    wxcMaskSetHidden() {
      this.show = false;
    },
    wxcButtonClicked() {



          if(this.p == ""){
            console.log("11111"+this.p)
            this.p = this.icon
          }else {
          
          }
         
          eeui.ajax(
          {
            url: "http://10.12.84.20:3001/teacher/upload",
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            files: {
              file: path
            }
          },function(){

          })
       
    

     
        let course = {}
 
        course.courseName = this.name;
               
        course.courseInfo = this.info;
        course.address = this.address;
        course.courseCollege = this.college;
        course.credit = this.credit;
        course.courseTime = this.time;
        course.typeID = this.typeId;
        course.id = this.id
        course.courseTeacherId = this.courseTeacherId
        course.icon = this.p 
        course.stuNum = this.stuNum

        stream.fetch(
          {
            method: "POST",
            url: "http://10.12.84.20:3001/teacher/teacherEditCourse",
            type: "json",
            body: course,
            headers: {
              "Content-Type": "application/json"
            }
          },
          function(res) {
            if (res.ok) {
              if (res.data.code == 200) {

                storage.getItem("pageName",(res)=>{
                    eeui.closePageTo(res.data)
                })

                
                eeui.toast({
                  message: "修改成功",
                  gravity: "middle"
                });
              
              }
            }
          }
        );
          eeui.toast({
                  message: "修改成功",
                  gravity: "middle"
        });

    }
  },
  components: {
    WxcRadio,
    WxcMask,
    WxcCell,
    WxcProgress,
    WxcButton
  }
};
</script>
<style scope>
.addimg{
  width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.publish {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
}
.class-name {
  font-size: 26px;
  margin-left: 20px;
}
.comment_title {
  background-color: #363a44;
  height: 130px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.new_coment {
  font-size: 30px;
  text-align: center;
  color: #fff;
}
.content-title {
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.content-input {
  height: 80px;
  width: 600px;
  margin-left: 20px;
  font-size: 26px;
}
.line {
  width: 750px;
  height: 1px;
  background-color: #333333;
}
.lines {
  width: 750px;
  height: 30px;
  background-color: #cccccc;
}
.course-info {
  margin-top: 10px;
}
.info-textarea {
  margin-left: 20px;
  height: 150px;
  font-size: 26px;
}
</style>