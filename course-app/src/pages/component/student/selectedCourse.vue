<template>
  <div @lifecycle="lifecycle">
    <div class="comment_title">
      <text class="new_coment">已选课程</text>
    </div>
     <text v-if="isshow">暂无课程</text>
    <scroll-view ref="myScroll" class="course">
      <div
        v-for="(course, index) in list"
        :key="index"
        :class="[findex === 0 ? 'course-item-first' : 'course-item']"
         @click="goto(course.id,course.stuNo,course.stuNum)"
      >

      

        <image class="course-item-picture" :src="'http://10.12.84.20:3001'+course.icon" />
        <div class="course-item-info">
          <text class="course-item-title">{{course.courseName}}</text>
            <text class="course-item-desc">开课教师：{{course.courseTeacher}}</text>
          <!-- <text class="course-item-extra">课程编号：{{course.courseNo}}</text> -->
              <text   class="course-item-extra1">限定人数：{{course.stuNum}}  报名人数：{{course.stuNo}}</text>

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
<script>
const eeui = app.requireModule("eeui");
const storage = weex.requireModule("storage");
const stream = weex.requireModule("stream");

export default {
  data() {
    return {
      list: [],
      isshow:false
    };
  },
  created() {
    this.getStudentCouseList();
  },
  methods: {

    lifecycle(e) {
      
      if (e.status == "resume") {
        this.getStudentCouseList()
      }
    },
    getStudentCouseList() {
      let that = this;

      storage.getItem("id", res => {
        var ss = JSON.parse(res.data);
        let body = JSON.stringify({ id: ss.id });
        stream.fetch(
          {
            method: "POST",
            url: "http://10.12.84.20:3001/api/getCourseStudentCount",
            type: "json",
            body: body,
            headers: {
              "Content-Type": "application/json"
            }
          },
          function(res) {
            if (res.ok) {
              console.log(res.data);
              that.list = res.data;

              if(that.list.length == 0){
                that.isshow = true
              }



                 for(let i in that.list){
                                const body = JSON.stringify({
                                    id:that.list[i].id
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
                                    that.list[i].stuNo = res.data.length
                                })

                              }



            }
          }
        );
      });
    },
    goto(id,stuNo,stuNum){
          eeui.openPage({
                    url: '../tabbar/Info.js',
                    pageType:'app',
                     statusBarType: 'immersion',
                     params:{id,stuNum,stuNo},
                });
    }
  }
};
</script>
<style scope>
.comment_title {
  background-color: #363a44;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.course {
  flex: 7;
  margin-top: 50px;
}
.new_coment {
  font-size: 30px;
  text-align: center;
  color: #fff;
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
.course-item-extra {
  lines: 2;
  text-overflow: ellipsis;
  color: #999999;
  font-size: 22px;
  margin-top: 4px;
}
.course-item-price {
  flex-direction: row;
  align-items: center;
}
.bottom-placeholder {
  width: 750px;
  height: 112px;
}
</style>