<template>
  <div class="page" @lifecycle="lifecycle">
    <div class="top_box">
      <div class="tx">
        <div class="head_img">
          <img class="img" src="../../static/tx.jpg" style="width:200px;height:200px;" alt />
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
      <div class="center_box"   v-for="(item,index) in setting" :key="index">
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
export default {
  data() {
    return {
      name: "",
      list: [],
      meList: [
        {
          title: "我的课程",
          className: "md-chatboxes"
        },
        {
          title: "发布通知",
          className: "md-chatboxes"
        },
        {
          title: "我的通知",
          className: "md-chatboxes"
        }
      ],
      setting: [
        {
          title: "意见反馈",
          className: "tb-edit"
        },
        
      ]
    };
  },
  created() {
    var that = this;
    storage.getItem("id", res => {
      storage.getItem("role", event => {
        let ss = JSON.parse(res.data);
        let role = event.data;
        const body = JSON.stringify({
          id: ss.id,
          role: role
        });
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
                that.name = res.data.studetName;
              } else if (role == 2) {
                that.name = res.data.teacherName;
              }
            }
          }
        );
      });
    });
  },

  methods: {
     lifecycle(e) {
       
      if (e.status == "resume") {
        
      } 
    },
    goto(index) {
      if (index == 0) {
        eeui.openPage({
          url: "../component/myCoursePage.js",
          pageType: "app",
          params: "t",
          statusBarType: "immersion"
        });
      }else if(index == 1){
           eeui.openPage({
          url: "../component/addNotice.js",
          pageType: "app",
          statusBarType: "immersion"
        });
      } 
      else if (index == 2) {
        eeui.openPage({
          url: "../component/myNotice.js",
          pageType: "app",
          statusBarType: "immersion"
        });
      }
    },
    goOpinion(index) {
       
      if (index == 0) {
        eeui.openPage({
          url: "../tabbar/opinion.js",
          pageType: "app",
          statusBarType: "immersion"
        });
      }
    },
    loginOut() {
      eeui.openPage({
        url: "../index.js",
        pageType: "app",
        statusBarType: "immersion"
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
