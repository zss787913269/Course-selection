<template>
  <div class="page" @lifecycle="lifecycle">
    <div class="top_box">
      <!-- <div class="setting" @click="edit">
                   <div class="flex">
                         <icon 
                        ref="reflectName"
                        style="width:50px; height:50px;" 
                        :eeui="{content: 'md-color-filter', fontSize:'40px', color:'pink'}" >
                    </icon>
                    
                    <text class="edit">编辑</text>
                   </div>

      </div>-->
      <div class="tx" @click="uploadImg">
        <div class="head_img">
            <!-- ../../static/tx.jpg -->
          <img class="img" :src="path" style="width:200px;height:200px;" alt />
        </div>

        <text class="name">{{name}}</text>
      </div>
    </div>

    <div class="middel">
      <div class="center_box" v-for="(item,index) in meList" :key="index">
        <div class="content" @click="goto(index)">
          <div class="left">
            <icon
              ref="reflectName"
              style="width:50px; height:50px;"
              :eeui="{content: item.className, fontSize:'40px', color:'#cccccc'}"
            ></icon>
            <text class="zt">{{item.title}}</text>
          </div>
          <div class="right">
            <icon
              ref="reflectName"
              style="width:50px; height:50px;"
              :eeui="{content: 'tb-right', fontSize:'35px', color:'#cccccc'}"
            ></icon>
          </div>
        </div>
      </div>
    </div>

    <div class="middel">
      <div class="center_box" v-for="(item,index) in setting" :key="index">
        <div class="content" @click="goOpinion(index)">
          <div class="left">
            <icon
              ref="reflectName"
              style="width:50px; height:50px;"
              :eeui="{content: item.className, fontSize:'40px', color:'#cccccc'}"
            ></icon>
            <text class="zt">{{item.title}}</text>
          </div>
          <div class="right">
            <icon
              ref="reflectName"
              style="width:50px; height:50px;"
              :eeui="{content: 'tb-right', fontSize:'35px', color:'#cccccc'}"
            ></icon>
          </div>
        </div>
      </div>
    </div>

    <div></div>

    <!-- <div class="ws" @click="loginOut"> -->

    <div class="ws" @click="loginOut">
      <div class="login_out">
        <text class="login_out_text">退出登录</text>
      </div>
    </div>
  </div>
</template>

<script>
const eeui = app.requireModule("eeui");
const storage = weex.requireModule("storage");
const stream = weex.requireModule("stream");
const network = app.requireModule("eeui/network");
const picture = app.requireModule("eeui/picture");
let path = null;
export default {
  data() {
    return {
      sid:"",
      path: "",
      name: "",
      list: [],
      meList: [
        {
          title: "已选课程",
          className: "md-bookmarks"
        },
        {
          title: "我的收藏",
          className: "tb-footprint"
        },
        {
          title: "我的资料",
          className: "ios-filing"
        },
        {
          title: "浏览历史",
          className: "tb-footprint"
        }
      ],
      setting: [
        {
          title: "意见反馈",
          className: "tb-edit"
        }
      ]
    };
  },

  created() {
    var that = this;

 
    storage.getItem("id", res => {
      storage.getItem("role", event => {
        // console.log("角色Id"+event.data)

        let ss = JSON.parse(res.data);
        let role = event.data;
        const body = JSON.stringify({
          id: ss.id,
          role: role
        });

        that.sid = ss.id

        stream.fetch(
          {
            method: "POST",
            url: "http://10.12.84.20:3001/api/getStuInfo",
            type: "json",
            body: body,
            headers: {
              "Content-Type": "application/json"
            }
          },
          function(res) {
            if (res.ok) {
              if (role == 1) {
                //   console.log(res.data)
                that.name = res.data.studetName;
                if(that.path == ""){
                    
                    that.path = "../../static/tx.jpg"
                }else{
                     that.path = "http://10.12.84.20:3001/img/"+res.data.icon
                }
                    console.log("请求后头像路径---"+that.path)
                    if(that.path == "http://10.12.84.20:3001/img/"){
                        that.path =  "../../static/tx.jpg"
                    }

            //   http://10.12.84.20:3001/img/-52d95cec9fc7884.jpg

              } else if (role == 2) {
                that.name = res.data.teacherName;
                // taht.path = res.data.icon
              }
            }
          }
        );
      });
    });
  },

  methods: {
    lifecycle(e) {
      let that = this;
      if (e.status == "resume") {

        
 that.path = path ;
       
      
        if (path != null) {
            that.getImgPath()
            
               console.log("页面恢复头像路径---"+that.path)
        }
      }
    },

    //把图片保存到服务器 服务器返回图片路径
    getImgPath() {
        let that = this
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
        function(res) {
        //   console.log("返回的头像路径"+res.result.imgpath);
          that.editStuImg(res.result.imgpath)
        }
      );
    },

    // 修改学生头像
    editStuImg(pathurl){
        let that = this
        let body = JSON.stringify({ id: that.sid ,icon:pathurl});
         eeui.ajax(
        {
          url: "http://10.12.84.20:3001/api/editStu",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
              id:that.sid,
              icon:pathurl
          }
        },
        function(res) {
        
        }
      );
    },
    // 选择图片
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

    downLoad() {
      network.download(
        {
          url: "http://cdn.instapp.io/nat/samples/audio.mp3",
          headers: {
            "x-app": "nat/0.0.8",
            "x-sign": "bfbbf4c1f087d972"
          },
          target: "/instapp/nat/download"
        },
        ret => {
          console.log(ret);
        }
      );
    },
    goOpinion(index) {
      if (index === 0) {
        eeui.openPage({
          url: "./opinion.js",
          pageType: "app",
          statusBarType: "immersion"
        });
      }
    },
    goto(index) {
      if (index == 0) {
        eeui.openPage({
          url: "../component/selectedCourse.js",
          pageType: "app",
          statusBarType: "immersion"
        });
      } else if (index == 1) {
        eeui.openPage({
          url: "../component/likeCourse.js",
          pageType: "app",
          statusBarType: "immersion"
        });
      } else if (index == 3) {
        eeui.openPage({
          url: "../component/histroy.js",
          pageType: "app",
          statusBarType: "immersion"
        });
      } else if (index == 2) {
        eeui.openPage({
          url: "../component/studentMsg.js",
          pageType: "app",
          statusBarType: "immersion"
        });
      }
    },
    loginOut() {
      storage.getItem("homeName", res => {
        eeui.closePageTo(res.data);
      });
    },
    edit() {
      eeui.openPage({
        url: "../component/information.js",
        pageType: "app",
        statusBarType: "immersion"
      });
    }
  }
};
</script>

<style scoped>
.ws {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.login_out {
  margin-top: 40px;
  width: 700px;
  height: 90px;
  /* border-width: 1px; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
}
.login_out_text {
  font-size: 32px;
  color: red;
}
.page {
  background-color: #f5f5f5;
  height: 1500px;
}
.top_box {
  height: 450px;
  width: 750px;
  background-color: #363a44;
}
.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.name {
  text-align: center;
  color: #fff;
  margin-top: 20px;
  font-size: 34px;
}
.tx {
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.head_img {
  width: 200px;
  height: 200px;
  border-radius: 100%;
}
.middel {
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
  width: 660px;
  background-color: #fff;
  border-radius: 10px;
  border-bottom-color: #f1f1f1;
}
.midde2 {
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 40px;
  width: 660px;
  background-color: #fff;
  border-radius: 20px;
  border-bottom-color: #f1f1f1;
}
.center_box {
  width: 660px;
  display: flex;
  flex-direction: row;
  background-color: f1f1f1;
}
.content {
  width: 660px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  border-bottom-width: 0.5px;
  border-bottom-color: #ccc;
}
.left {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
}
.right {
  margin-right: 30px;
}
.zt {
  margin-left: 20px;
  font-size: 32px;
}
.setting {
  position: absolute;
  margin-top: 90px;
  right: 80px;
}
.edit {
  color: #f5f5f5;
  font-size: 30px;
}
</style>
