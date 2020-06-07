<template>
  <div class="page">
    <div class="top_box" v-for="(item,index) in lists" :key="index">
      <div class="top">
        <!-- 编辑课程 -->
        <div class="position" @click="goEditCourse">
          <div class="flex-position">
            <text class="edit">编辑课程</text>
            <img src="../../static/p3.png" style="width:40px;height:40px;margin-left:10px" />
          </div>
        </div>
        <!-- 删除课程 -->

        <div class="position-btn">
          <wxc-button
            class="btn"
            text="删除课程"
            type="red"
            size="small"
            @wxcButtonClicked="wxcButtonClicked"
          ></wxc-button>
        </div>

        <div class="left">
          <img :src="'http://10.12.84.20:3001'+item.icon" style="width:100px;height:100px" alt />
          <!-- <img class="img" src="../../static/tx.jpg" style="width:100px;height:100px" alt /> -->
        </div>
        <div class="right">
          <div class="shang">
            <div class="shang_left">
              <text class="title_name">{{item.courseName}}</text>
              <text class="teacher">任课老师：{{item.courseTeacher}}</text>
            </div>
          </div>

          <div class="xia">
            <div class="xia_bottom">
              <div>
                <text>上课地点 : {{item.address}}</text>
                <text>开课学院 : {{item.courseCollege}}</text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div>
          <div class="seeStudent"> 
          <text class="bottom_title new_coment">课程简介</text>
          <text class="stu" @click="goStu(item.id)">查看学生列表 {{count}}人</text>
          </div>
          <div class="line"></div>
          <text class="course_text">{{item.courseInfo}}</text>
        </div>
      </div>
    </div>
    <!-- <div class="comment">
      <div class="comment_title">
        <text class="new_coment">学生列表 {{count}}人</text>
      </div>
      <div class="line"></div>
      <div class="box">
        <scroll-view ref="reflectName" class="list">
          <div class="comment_box" v-for="(item,index) in studentList" :key="index">
            <div class="left">
              <img class="img" src="../../static/tx.jpg" style="width:50px;height:50px" alt />
              <div class="left_title">
                <text class="name">{{item.studetName}} {{item.college}} {{item.studentClass}}班</text>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </scroll-view>
      </div>
    </div> -->



      <div class="bottom2">
       
          <text class="bottom_title new_coment">最新评价</text>
          <div class="line"></div>
         <div class="recommend_course" >
             <scroll-view ref="myScroll" class="course">

      
           <div class="no-common" v-if="!isshow">  <text class="no-text">暂无评论 </text></div>

          <div     v-for="(i,index) in comment" :key="index" >

                   
      
          <div class="common-top" >
               <div>
                   <img class="img" :src="'http://10.12.84.20:3001/img/'+i.studentMsg.icon" style="width:70px;height:70px;" alt="">
               </div>
               <div class="common-name">
                 <text class="name">{{i.studentMsg.studetName}}</text>
                   <text >{{i.commentMsg.createTime}}</text>
               </div>
          </div>
          <div class="common-main">
              <text class="common-text">{{i.commentMsg.msg}}</text>
          </div>
         
          <div class="line"></div>
            </div>
          <div class="bottom-placeholder"></div>
        </scroll-view>

    
        </div>
    </div>


    

    <wxc-dialog
      title="提示"
      content="是否删除"
      :show="show"
      :single="false"
      :is-checked="isChecked"
      :show-no-prompt="false"
      @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
      @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"
      @wxcDialogNoPromptClicked="wxcDialogNoPromptClicked"
    ></wxc-dialog>
  </div>
</template>

<script>
const eeui = app.requireModule("eeui");
const stream = weex.requireModule("stream") || {};
const storage = weex.requireModule("storage");
import { WxcButton, WxcDialog } from "weex-ui";
export default {
  data() {
    return {
      lists: [],
      studentList: [],
      count: "",
      show: false,
      isChecked: false,
      comment:null,
      isshow:false,
      
    };
  },
  components: {
    WxcButton,
    WxcDialog
  },
  mounted() {
    this.getStudent();
    this.getCourse();
    this.getCommon();
  },
  methods: {

    goStu(id){


      if(this.count != 0){
        eeui.openPage({
              url: "./studentList.js",
              pageType: "app",
              statusBarType: "immersion",
              params: { id: id }
            });
      }
        
    

    },
    // 获取评论
     getCommon(){
      let that = this;
        let courseId = app.config.params.id;

        // console.log(courseId)

        let body = JSON.stringify({ courseNo: courseId});

        stream.fetch(
          {
            method: "POST",
            url: "http://10.12.84.20:3001/comment/getCourseCommentBy",
            type: "json",
            body: body,
            headers: {
              "Content-Type": "application/json"
            }
          },
          function(res) { 
            if (res.ok) {
              // console.log(res.data); 
              that.comment = res.data.data

              if(that.comment.length != 0){
                that.isshow = true
              }
              

            }
          }
        );
    
    },
    goEditCourse() {
     
     let that = this
      eeui.openPage({
        url: "./editCourse.js",
        pageType: "app",
        statusBarType: "immersion",
        params: { data: that.lists }
      });
    },
    wxcDialogCancelBtnClicked() {
      //此处必须设置，组件为无状态组件，自己管理
      this.show = false;
      console.log("点击了取消");
    },
    wxcDialogConfirmBtnClicked() {
      //此处必须设置，组件为无状态组件，自己管理
      this.show = false;

      let that = this;
      let id = app.config.params.id;
      let body = JSON.stringify({ courseNo: id });
      stream.fetch(
        {
          method: "POST",
          url: "http://10.12.84.20:3001/teacher/teacherRemoveCourse",
          type: "json",
          body: body,
          headers: {
            "Content-Type": "application/json"
          }
        },
        function(res) {
          if (res.ok) {
            if (res.data.code == 200) {
              eeui.closePage({ url: "./teacherCourseInfo.js" });

              eeui.toast({
                message: "删除成功",
                gravity: "middle"
              });
            }
          }
        }
      );
    },
    wxcDialogNoPromptClicked(e) {
      //此处必须设置，组件为无状态组件，自己管理
      this.isChecked = e.isChecked;
    },
    wxcButtonClicked() {
      this.show = true;
    },
    getCourse() {
      let that = this;
      let id = app.config.params.id;
      let body = JSON.stringify({ id: id });
      stream.fetch(
        {
          method: "POST",
          url: "http://10.12.84.20:3001/api/getCourseOneInfo",
          type: "json",
          body: body,
          headers: {
            "Content-Type": "application/json"
          }
        },
        function(res) {
          that.lists = res.data;
        }
      );
    },
    getStudent() {
      let that = this;
      let id = app.config.params.id;
      let body = JSON.stringify({ id: id });
      stream.fetch(
        {
          method: "POST",
          url: "http://10.12.84.20:3001/teacher/coureseByStudent",
          type: "json",
          body: body,
          headers: {
            "Content-Type": "application/json"
          }
        },
        function(res) {
          that.studentList = res.data.data;
          that.count = res.data.count;
        }
      );
    }
  }
};
</script>

<style scope>
.seeStudent{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

}
.stu{
  margin-right: 20px;
}
.no-common{
  margin-top: 20px;
  margin-left: 20px;
 
}
.no-text{
   font-size: 30px;
}
.course{
   /* margin-bottom: 100px; */
  height: 850x;
  /* height: 100%; */
}
.bottom2{
  background-color: #fff;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 10px;
}
.bottom_title {
  margin-top: 15px;
  margin-left: 20px;
}
.common-top{
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.common-name{
  margin-left: 20px;
}

.edit {
  font-size: 24px;
}
.btn {
  border-radius: 50%;
}
.position {
  position: absolute;
  right: 20px;
  top: 20px;
}
.position-btn {
  position: absolute;
  right: 20px;
  top: 80px;
}
.flex-position {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.courseName {
  font-size: 24px;
}
.xia_bottom {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.title_name {
  font-size: 28px;
  color: #000000;
  font-weight: bold;
}
.teacher {
  margin-top: 10px;
  font-size: 24px;
  color: #333333;
}
.shang {
  margin-top: 20px;
}
.right {
  margin-left: 20px;
}
.shang_right {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
  width: 180px;
  border-radius: 30px;
  height: 60px;
  border-width: 1px;
  border-color: #999999;
  background-color: #fff;
}
.comment_box {
  margin-top: 10px;
}
.name {
  font-size: 24px;
  color: #89b5d8;
}
.new_coment {
  font-size: 24px;
  margin-bottom: 10px;
}
.box {
  width: 750px;
  flex: 1;
}
.list {
  width: 750px;
  flex: 1;
}

.page {
  background-color: #363a44;
}
.top_box {
  margin-top: 45px;
  background-color: #fff;
  width: 730px;
  margin-left: 10px;
  border-radius: 15px;
  height: 380px;
}
.top {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}
.line {
  width: 700px;
  height: 1px;
  background-color: #ccc;
  /* margin: 15px 0; */
}
.bottom_title {
  margin-top: 15px;
  margin-left: 20px;
}
.common-text{
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-right: 10px;
}
.img {
  margin-left: 20px;
  border-radius: 50%;
}
.shang {
  width: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.comment {
  width: 730px;
  height: 700px;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 15px;
  margin-left: 10px;
  /* margin-bottom: 00px; */
}
.comment_title {
  margin-top: 20px;
  margin-left: 20px;
}
.time {
  width: 540px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
}
.left {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}
.left_title {
  margin-left: 20px;
}
.text {
  margin-top: 25px;
  margin-left: 25px;
}
.coment_text {
  color: #999999;
  font-size: 26px;
  width: 680px;
}
.course_text {
  margin-top: 10px;
  font-size: 24px;
  margin-left: 20px;
  margin-bottom: 10px;
  color: #999999;
}
</style>