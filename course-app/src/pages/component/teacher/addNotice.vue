<template>
  <div>
    <!-- 头部 -->
    <div class="comment_title">
      <text class="new_coment">发布通知</text>
    </div>
    <div class="content">
      <div class="content-title">
        <text class="class-name">标题：</text>
        <input class="content-input" type="text" v-model="name" placeholder="请输入标题" />
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
          placeholder="请输入内容"
        ></textarea>
      </div>
   
      <!-- 弹出层结束 -->
    </div>
    <!-- 内容结束 -->
    <div class="publish">
      <wxc-button text="发布" type="green" size="big" @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </div>
    <!-- 发布成功 -->
  </div>
</template>
<script>
const eeui = app.requireModule("eeui");
const storage = weex.requireModule("storage");
const stream = weex.requireModule("stream");

import { WxcRadio, WxcMask, WxcCell, WxcProgress, WxcButton } from "weex-ui";

export default {
  data() {
    return {
      name: "",
      info: "",

    };
  },
  methods: {
    wxcButtonClicked() {
      storage.getItem("id", res => {
        let teacherId = JSON.parse(res.data);
        let notice = {};
        notice.title = this.name;
        notice.msg = this.info;
        notice.createTime = this.getTime()
        notice.uid =  teacherId.id
        notice.type = 1
        notice.createName = ""
         stream.fetch(
          {
            method: "POST",
            url: "http://10.12.84.20:3001/notice/teacherNotice",
            type: "json",
            body: notice,
            headers: {
              "Content-Type": "application/json"
            }
          },
          function(res) {
            console.log(res.data);
            if (res.ok) {
              if (res.data.code == 200) {
                eeui.toast({
                  message: "发布成功",
                  gravity: "middle"
                });
                eeui.closePage({ url: "./teacherMsg.js",})
              }
            }
          }
        );
      });
    },
    getTime(){
        let t= new Date();
        let y = t.getFullYear();
        let m = t.getMonth()+1;
        let d = t.getDate()
        let s = t.getHours()
        let f = t.getMinutes()
        return y+"-"+m+"-"+d + " "+s+":"+f
    },
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
  margin-top: 20px;
}
.info-textarea {
  margin-left: 20px;
  height: 350px;
  font-size: 26px;
  background-color: #e7dcdc;
  margin-right: 20px;
}
</style>