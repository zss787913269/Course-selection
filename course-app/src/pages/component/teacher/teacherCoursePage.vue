<template>
  <div @lifecycle="lifecycle">
    <div class="comment_title">
      <text class="new_coment">我的课程</text>
    </div>

    <!-- 还没发布课程 -->
    <div class="publish-course-box" v-if="show">
      <img class="img" src="../../static/findBook.png" style="width:220px;height:250px;" alt />
      <text class="text">暂无课程</text>
      <wxc-button
        class="btn"
        text="+点击发布课程"
        type="white"
        size="big"
        @wxcButtonClicked="wxcButtonClicked"
      ></wxc-button>
    </div>
    <!-- 课程滑动选择 -->

    <scroll-view ref="myScroll" class="course">
      <div v-for="(item,index) in list" :key="index">
        <div class="felx" @click="toCourseInfo(item.id)">
          <div class="course-BOX" style="margin-left:20px">
            <image class="course-item-picture" :src="'http://10.12.84.20:3001'+item.icon" />
            <div class="course-item-info">
              <text class="course-item-title">{{item.courseName}}</text>

              <text class="course-item-desc">上课时间：{{item.courseTime}}</text>

              <div class="text-box">
                <div class="address-box">
                  <icon
                    ref="reflectName"
                    style="width:20px; height:20px;"
                    :eeui="{content: 'ios-walk', fontSize:'24px', color:'#333333'}"
                  ></icon>
                  <text class="course-item-extra">上课地点：{{item.address}}</text>
                </div>
                <div class="p-box">
                  <icon
                    ref="reflectName"
                    style="width:24px; height:24px;"
                    :eeui="{content: 'tb-people', fontSize:'24px', color:'#333333'}"
                  ></icon>
                  <text class="course-item-extra">限定人数：{{item.stuNum}}</text>
                </div>
              </div>
            </div>
          </div>
          <icon
            ref="reflectName"
            style="width:50px; height:50px;"
            :eeui="{content: 'tb-right', fontSize:'35px', color:'#cccccc'}"
          ></icon>
        </div>
        <div class="line"></div>
      </div>
    </scroll-view>

    <div class="position" @click="wxcButtonClicked">
      <img src="../../static/p3.png" style="width:100px;height:100px;" />
    </div>
  </div>
</template>
<script>
const eeui = app.requireModule("eeui");
const storage = weex.requireModule("storage");
const stream = weex.requireModule("stream");
import { WxcButton } from "weex-ui";

export default {
  data() {
    return {
      list: [],
      show: false,
      courseId:''
    };
  },
  created() {
    this.getTeacherCourse();
 
  },
  methods: {
    wxcButtonClicked() {
      eeui.openPage({
        url: "./addCourse.js",
        pageType: "app",
        statusBarType: "immersion",
      });
    },
    getTeacherCourse() {
      let that = this;

      storage.getItem("id", res => {
        var ss = JSON.parse(res.data);
        let body = JSON.stringify({ id: ss.id });
        stream.fetch(
          {
            method: "POST",
            url: "http://10.12.84.20:3001/teacher/teacherCourseList",
            type: "json",
            body: body,
            headers: {
              "Content-Type": "application/json"
            }
          },
          function(res) {
            // that.courseId = res.data.msg[0].id

            if (res.ok) {
              if (res.data.code == 401) {
                that.show = true;
              } else if (res.data.code == 200) {
                that.show = false;
                that.list = res.data.msg;

              }
            }
          }
        );
      });
    },
    toCourseInfo(id) {

      eeui.openPage({
        url: "./teacherCourseInfo.js",
        pageType: "app",
        statusBarType: "immersion",
        params: { id: id }
      });
    },
    lifecycle(e) {
       let pageName = eeui. getPageInfo().pageName
      if (e.status == "resume") {
        this.getTeacherCourse();
        storage.setItem("pageName",pageName)
      } if (e.status == "ready") {
        storage.setItem("pageName",pageName)
      }
    }
  },
  components: {
    WxcButton
  }
};
</script>
<style scope>
.position {
  position: absolute;
  bottom: 80px;
  right: 15px;
}
.felx {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.line {
  margin-top: 15px;
  height: 1px;
  background-color: #333333;
}
.comment_title {
  background-color: #363a44;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.course-BOX {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin-top: 10px; */
  /* background-color: pink; */
}
.course {
  flex: 7;
  margin-top: 20px;
}
.new_coment {
  font-size: 26px;
  color: #ffffff;
}
.publish-course-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
}
.text {
  font-size: 26px;
  color: #cccccc;
  margin-top: 80px;
}
.btn {
  border-radius: 50%;
  margin-top: 20px;
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
  width: 90px;
  height: 100px;
  margin-top: 12px;
  margin-right: 20px;
}
.course-item-info {
  margin-top: 10upx;
  flex: 1;
}
.course-item-title {
  color: #333333;
  font-size: 28px;
  margin-top: 4px;
}
.desc-box {
  background-color: pink;
}
.course-item-desc {
  margin-top: 4px;
  color: #0084ff;
  font-size: 22px;
}
.course-item-extra {
  color: #999999;
  font-size: 22px;
  margin-top: 2px;
}
.course-item-price {
  flex-direction: row;
  align-items: center;
}
.bottom-placeholder {
  width: 750px;
  height: 112px;
}
.address-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.p-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 50px;
}
.text-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
}
</style>