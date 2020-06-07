<template>
  <div class="page">
   
    <div class="top_box">
      <div class="top">
        <div class="left">
          <img :src="'http://10.12.84.20:3001'+icon" style="width:200px;height:220px;margin-left:20px;" alt />
          <!-- <div style="width:200px;height:220px">

          </div> -->
        </div>
        <div class="right" >
          <div>
            <text class="courseName">{{courseName}}</text>
          </div>
          <div class="shang">
            <div class="shang_left">
              <text class="title_name">{{couseName}}</text>
              <text class="teacher">任课老师：{{courseTeacher}}</text>
            </div>
            <div class="shang_right" >
              <text v-if="joinShow" class="join" @click="cancelJoin"> 取消加入</text>
              <text v-else class="join_active" @click="joinCourse">加入课程</text>
            </div>
          
          </div>
          <div class="xia">
            <div class="xia_top">
              <text class="people">{{comment.length}}条评价</text>
            </div>
            <div class="xia_bottom">
              <div>
                  <text>限定人数 : {{maxCount}}  报名人数：{{count}} </text>
                <text>上课地点 : {{address}}</text>
                <text>开课学院 : {{courseCollege}}</text>
              </div>

              <div class="like" @click="likeCourse">
                <div v-if="likeShow" class="like-item">
                  <text class="like-text">收藏</text>
                  <icon
                    ref="reflectName"
                    style="width:50px; height:50px;"
                    :eeui="{content: 'md-star-outline', fontSize:'50px', color:'#cccccc'}"
                  ></icon>
                </div>

                <div v-else class="like-item">
                  <text class="like-text">已收藏</text>
                  <icon
                    ref="reflectName"
                    style="width:50px; height:50px;"
                    :eeui="{content: 'md-star', fontSize:'50px', color:'#F46D44'}"
                  ></icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div>
          <text class="bottom_title new_coment">课程简介</text>
          <div class="line"></div>
          <text class="course_text">{{courseInfo}}</text>
        </div>
      </div>
      <div class="lines">

      </div>
    <div class="bottom2">
       
          <text class="bottom_title new_coment">最新评价</text>
          <div class="line"></div>

          <div v-if="isshow" class="no-common">
            <text class="no-text">暂无评价</text>
          </div>

         <div class="recommend_course" >
             <scroll-view ref="myScroll" class="course">

      
          <div v-for="(i,index) in comment" :key="index" >

            
          <div class="common-top" >
               <div>
                   <img class="img"  :src="'http://10.12.84.20:3001/img/'+i.studentMsg.icon" style="width:70px;height:70px;" alt="">
               </div>
               <div class="common-name">
                 <text class="name">{{i.studentMsg.studetName}}</text>
                   <text>{{i.commentMsg.createTime}}</text>
               </div>
          </div>
          <div class="common-main">
              <text>{{i.commentMsg.msg}}</text>
          </div>
         
          <div class="line"></div>
            </div>
          <div class="bottom-placeholder"></div>
        </scroll-view>

    
        </div>
    </div>

    </div>

    <div class="mybtn" @click="showAlert">
      <text>发表评论</text>
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
      lists: [],
      courseTeacher: "",
      courseInfo: "",
      courseTeacher: "",
      couseName: "",
      icon: "",
      address: "",
      courseCollege: "",
      courseName: "",
      joinShow: false,
      likeShow: true,
      comment:[],
      studentNo:"",//学生id
      courseNo:"",
      stulen:"",
      maxCount:"",
      count:"",
      isshow:""

    };
  },

  mounted() {
   
    this.studentifLikeCourse();
    this.getCourse();
    this.studentHasCourse();
     this.getCommon();
    for (let i = 1; i <= 20; i++) {
      this.lists.push(i);
    }
    // this.$refs.reflectName.setHasMore(true);
    //
    setTimeout(() => {
      this.lists.splice(2, 1, "改变第三项文字");
      // splice 详细用法http://www.w3school.com.cn/jsref/jsref_splice.asp
    }, 1000);
  },
  methods: {
    likeCourse() {
    
      // false 代表已经收藏


      let that = this;
      storage.getItem("id", res => {
        var ss = JSON.parse(res.data);

      

        let courseId = app.config.params.id;

        let body = JSON.stringify({ courseNo: courseId, studentNo: ss.id });

// 10.12.84.20

         if(this.likeShow == false){
            stream.fetch(
          {
            method: "POST",
            url: "http://10.12.84.20:3001/api/studentLikeCanel",
            type: "json",
            body: body,
            headers: {
              "Content-Type": "application/json"
            }
          },
          function(res) {
            if (res.ok) {
              console.log(res.data);
                that.likeShow = true;
            
            }
          }
        );
        }else if(this.likeShow == true){
           stream.fetch(
          {
            method: "POST",
            url: "http://10.12.84.20:3001/api/studentlLikeCourse",
            type: "json",
            body: body,
            headers: {
              "Content-Type": "application/json"
            }
          },
          function(res) {
            if (res.ok) {
                console.log(res.data);
               that.likeShow = false;
            }
          }
        );
        }

       
      });
    },
    studentifLikeCourse() {
      let that = this;

      storage.getItem("id", res => {
        var ss = JSON.parse(res.data);
         that.studentNo = ss.id
        let courseId = app.config.params.id;

        let body = JSON.stringify({ courseNo: courseId, studentNo: ss.id });

        stream.fetch(
          {
            method: "POST",
            url: "http://10.12.84.20:3001/api/studentifLikeCourse",
            type: "json",
            body: body,
            headers: {
              "Content-Type": "application/json"
            }
          },
          function(res) {
            if (res.ok) {
              if (!res.data) {
                that.likeShow = true;
              } else {
                that.likeShow = false;
              }
            }
          }
        );
      });
    },
    studentHasCourse() {
      let that = this;

      storage.getItem("id", res => {
        var ss = JSON.parse(res.data);

        let courseId = app.config.params.id;

        let body = JSON.stringify({ courseNo: courseId, studentNo: ss.id });

        stream.fetch(
          {
            method: "POST",
            url: "http://10.12.84.20:3001/api/getStudenthasCourse",
            type: "json",
            body: body,
            headers: {
              "Content-Type": "application/json"
            }
          },
          function(res) {
            if (res.ok) {
              if (!res.data) {
                that.joinShow = false;
              } else {
                that.joinShow = true;
              }
            }
          }
        );
      });
    },

    cancelJoin(){
          let that = this
          this.count-- 
          that.joinShow = !that.joinShow 

                storage.getItem("id", res => {
                var ss = JSON.parse(res.data);

                let courseId = app.config.params.id;

                let body = JSON.stringify({ courseNo: courseId, studentNo: ss.id });
        // 10.12.84.20
                stream.fetch(
                  {
                    method: "POST",
                    url: "http://10.12.84.20:3001/api/cancelCouse",
                    type: "json",
                    body: body,
                    headers: {
                      "Content-Type": "application/json"
                    }
                  },
                  function(res) {
                    if (res.ok) {
                  
                    }
                  }
                );
              });



    },

    joinCourse() {
     
      
     let that = this

        if(this.count >= this.maxCount){
             eeui.toast("人员已满，无法加入")
             
        }else{


           that.joinShow = !that.joinShow 



              storage.getItem("id", res => {
                var ss = JSON.parse(res.data);

                let courseId = app.config.params.id;

                let body = JSON.stringify({ courseNo: courseId, studentNo: ss.id });
        // 10.12.84.20
                stream.fetch(
                  {
                    method: "POST",
                    url: "http://10.12.84.20:3001/api/studentJoinCourse",
                    type: "json",
                    body: body,
                    headers: {
                      "Content-Type": "application/json"
                    }
                  },
                  function(res) {
                    if (res.ok) {
                        that.count ++ 
                    }
                  }
                );
              });
        }


    },

    getCourse() {
      let that = this;
      let id = app.config.params.id;
      this.maxCount = app.config.params.stuNum;
      this.count = app.config.params.stuNo;


      that.courseNo = id
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
          if (res.ok) {

            that.courseTeacher = res.data[0].courseTeacher;
            that.courseInfo = res.data[0].courseInfo;
            that.courseTeacher = res.data[0].courseTeacher;
            that.couseName = res.data[0].couseName;
            that.icon = res.data[0].icon;
            that.address = res.data[0].address;
            that.courseCollege = res.data[0].courseCollege;
            that.courseName = res.data[0].courseName;    
            
          }
        }
      );
    },
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
              console.log(res.data); 
              that.comment = res.data.data



              if(that.comment.length == 0)
              {
              that.isshow= true
            }
              
            }
          }
        );
    
    },
    showAlert(){


      console.log("学生id"+this.studentNo)
      console.log("课程id"+this.courseNo)

      let that = this

      let createTime = this.getTime()

        eeui.input({
                title: "输入评价",
                maxLength:120,
                buttons: ["取消", "确定"],
                inputs:[{
                    type: 'text',
                }]
            }, function(result) {
                if (result.status == "click" && result.title == "确定") {
                    console.log(result.data[0])

                     let body = JSON.stringify({
                       createTime:createTime,
                       courseNo:that.courseNo,
                       studentNo:that.studentNo,
                       msg:result.data[0]
                     });

                    stream.fetch(
                      {
                        method: "POST",
                        url: "http://10.12.84.20:3001/comment/publishComment",
                        type: "json",
                        body: body,
                        headers: {
                          "Content-Type": "application/json"
                        }
                      },
                      function(res) { 
                        if (res.ok) {
                                that.isshow = false
                                that.getCommon()
                                 eeui.toast({
                                  message: "评论成功",
                                  gravity: "middle"
                                });
                        }
                      }
                    );


                }
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
   
  }
};
</script>

<style scope>
.right{
  margin-left: 20px;
}
.no-common{
  margin-top: 20px;
  margin-left: 20px;
 
}
.no-text{
   font-size: 30px;
}
.common-main{
  margin:20px;
}

.mybtn{
  width: 150px;
  height: 50px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cccccc;
  position: absolute;
  top:650px;
  right: 50px;
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

.item_text{
  margin-top: 10px;
  font-size: 18px;
}
.course_item{
  padding: 10px;
  display: flex;
  flex-direction: row;
  /* justify-content: center;
  align-items: center; */
  flex: 1;

}
.lines{
  height: 20px;
  background-color: #ccc;
  width: 730px;
}
.like-item{
display: flex;
  flex-direction: row;
  align-items: center;
}
.like {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  margin-right: 20px;
}
.like-text {
  margin-top: 4px;
  font-size: 26px;
}
.courseName {
  font-size: 32px;
}
.tuijian {
  font-size: 28px;
  color: #a8a8b0;
}
.people {
  font-size: 26px;
  color: #999999;
}
.xia_bottom {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.xia_top {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.title_name {
  font-size: 34px;
  color: #000000;
  font-weight: bold;
}
.teacher {
  margin-top: 2px;
  font-size: 28px;
  color: #333333;
}
.shang {
  margin-top: 20px;
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
.join {
  font-size: 26px;
  color: #999999;
}
.join_active {
  font-size: 26px;
  color: #333333;
}
.comment_box {
  margin-top: 15px;
}
.name {
  font-size: 24px;
  color: #89b5d8;
}
.new_coment {
  font-size: 30px;
  margin-bottom: 15px;
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
  background-color:#363a44;
  
}
.top_box {
  margin-top: 52px;
  background-color: #fff;
  width: 730px;
  margin-left: 10px;
  border-radius: 15px;
}
.top {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}
.line {
  width: 730px;
  height: 1px;
  background-color: #ccc;
  /* margin: 15px 0; */
}
.bottom_title {
  margin-top: 15px;
  margin-left: 20px;
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
  width: 700px;
  height: 900px;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 15px;
  margin-left: 25px;
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
  margin-top: 20px;
  font-size: 30px;
  margin-left: 20px;
  margin-bottom: 20px;
  color: #333;
}
.bottom{
  height: 300px;
}

.course{
   /* margin-bottom: 100px; */
  height: 600px;
  /* height: 100%; */
}
</style>