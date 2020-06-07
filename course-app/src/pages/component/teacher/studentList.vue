<template>
   


      <div class="comment">
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
    </div>



</template>

<script>
const eeui = app.requireModule("eeui");
const stream = weex.requireModule("stream") || {};
const storage = weex.requireModule("storage");
export default {
    data() {
        return {
            studentList:[]
        }
    },
    mounted() {
        this.getStudent()
    },
    methods: {
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
            console.log(res.data)
          that.studentList = res.data.data;
          that.count = res.data.count;
        }
      );
    }
    },

}
</script>

<style scope>
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