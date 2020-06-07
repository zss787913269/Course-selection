<template>
  <div  @lifecycle="lifecycle">
    <!-- 头部 -->
    <div class="comment_title">
      <text class="new_coment">添加课程</text>
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
         <text  > 添加课程封面 </text>  
           <img    src="../../static/add.png" style="width:180px;height:180px;" alt="">
      </div>
   
      <img    v-else :src="path" style="width:180px;height:180px;" >
    </div>
      
    <!-- 内容结束 -->
    <div class="publish">
      <wxc-button text="发布" type="green" size="big" @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </div>

     
           <!-- <img src="/storage/emulated/0/Tencent/QQ_Images/-52d95cec9fc7884.jpg" style="width:700px;height:170px;" alt=""> -->
    

    <!-- <div @click="sendImg">
      <text>发送</text>
    </div> -->
    <!-- <div>
     
        <img src="/storage/emulated/0/Tencent/QQ_Images/-52d95cec9fc7884.jpg" style="width:700px;height:170px;" alt="">
    </div>
    -->

    <!-- 发布成功 -->

    <!-- 发布成功 -->
  </div>
</template>
<script>
const eeui = app.requireModule("eeui");
const storage = weex.requireModule("storage");
const stream = weex.requireModule("stream");
const picture = app.requireModule("eeui/picture");
const network = app.requireModule("eeui/network");
let path = "";

import { WxcRadio, WxcMask, WxcCell, WxcProgress, WxcButton } from "weex-ui";

export default {
  data() {
    return {
      path:"",
      name: "",
      info: "",
      time: "",
      credit: "",
      college: "",
      address: "",
      typeId: "",
      stuNum: "",
      show: false,
      overlayCanClose: true,
      isFalse: false,
      hasAnimation: true,
      showMask: false,
      list: [
        { title: "专业必修课", value: 1 },
        { title: "公共选修课", value: 2, checked: true },
        { title: "专业选修课", value: 3 }
      ],
      checkedInfo: { title: "选项2", value: 2 }
    };
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
      picture.create(
        {
          gallery: 1
        },
        function(res) {
          if (res.lists) {
            path = res.lists[0].path;
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
      this.checkedInfo = e;
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


      // if(this.)



   eeui.toast('账号或密码错误');

      let that = this


      storage.getItem("id", res => {
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
          },
          function(resl) {
            console.log(resl.result.imgpath);

            let teacherId = JSON.parse(res.data);
            let course = {};
            course.name = that.name;
            course.info = that.info;
            course.address = that.address;
            course.college = that.college;
            course.credit = that.credit;
            course.time = that.time;
            course.typeId = that.checkedInfo.value;
            course.courseTeacherId = teacherId.id;
            course.stuNum = that.stuNum;
            course.imgpath = '/img/'+resl.result.imgpath;

            stream.fetch(
              {
                method: "POST",
                url: "http://10.12.84.20:3001/teacher/teacherAddCourse",
                type: "json",
                body: course,
                headers: {
                  "Content-Type": "application/json"
                }
              },
              function(ress) {
                console.log(ress.data);
                if (ress.ok) {
                  if (ress.data.code == 200) {
                    eeui.toast({
                      message: "发布成功",
                      gravity: "middle"
                    });
                    eeui.closePage({ url: "./myCoursePage.js" });
                  }
                }
              }
            );
          }
        );
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
  height: 80px;
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