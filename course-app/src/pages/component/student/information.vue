<template>
  <div class="page">
    <div class="top_box"></div>

    <div class="middel">
      <div class="center_box" v-for="(item,index) in meList" :key="index">
        <div class="content">
          <div class="left">
            <text class="zt">{{item.title}}</text>
          </div>
          <div class="right">
            <img
              v-if="item.imgUrl"
              class="head_img"
              :src="item.imgUrl"
              style="width:100px;height:100px;"
              alt
            />
            <text>{{item.name}}</text>
          </div>
        </div>
      </div>
    </div>

    <div class="middel">
            <div class="center_box" v-for="(item,index) in setting" :key="index">
                <div class="content" >
                  <div class="left">
                        <icon 
                        ref="reflectName"
                        style="width:50px; height:50px;" 
                        :eeui="{content: item.className, fontSize:'40px', color:'#cccccc'}" >
                    </icon>
                    <text class="zt">{{item.title}}</text>
                  </div>
                    <div class="right">
                         <icon 
                        ref="reflectName"
                        style="width:50px; height:50px;" 
                        :eeui="{content: 'tb-right', fontSize:'35px', color:'#cccccc'}" >
                    </icon>
                    </div>
                </div>  
        </div>
    </div>
  </div>
</template>

<script>
const eeui = app.requireModule("eeui");
const stream = weex.requireModule("stream");
const storage = weex.requireModule("storage");
export default {
  data() {
    return {
      list: [],
      meList: [
        {
          title: "头像",
          imgUrl: "../../static/tx.jpg",
          name: ""
        },
        {
          title: "昵称",
          name: "md-chatboxes"
        },
        {
          title: "学校",
          name: "贺州学院"
        },
        {
          title: "专业",
          name: "信息学院"
        },
        {
          title: "年龄",
          name: "21"
        }
      ],
      setting: [
        {
          title: "意见反馈",
          className: "tb-edit"
        },
        {
          title: "设置",
          className: "md-settings"
        }
      ]
    };
  },
  created() {
    
  },
  methods: {}
};
</script>

<style scoped>
.page {
  background-color: #f5f5f5;
}
.top_box {
  height: 130px;
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
  margin-top: 80px;
  border-radius: 100%;
  margin-left: 45px;
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
  height: 130px;
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
