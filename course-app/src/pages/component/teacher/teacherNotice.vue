<template>
  <div class="page">
    <div class="comment">
      <div class="comment_title">
        <text class="new_coment">通知</text>
          <text class="selects" @click="deletes" v-if="showDelete">删除</text>
           <text class="select" @click="select">选择</text>
      </div>
   
      <div class="line"></div>
      <div class="box">
        <scroll-view
          ref="reflectName"
          class="list"
          :eeui="{pullTips: true}"
          @itemClick="itemClick"
          @refreshListener="refreshListener"
        >
          <div class="comment_box" v-for="(item,index) in msg" :key="item.id">
            <div class="left" @click="goNotice(item.id)">
              <img class="img" src="../../static/n.png" style="width:80px;height:80px" alt />
              <div class="left_title">
                <text class="name">{{item.title}} </text>
                <div class="time">
                     <text class="coment_text">{{item.msg}}</text>
                    <div class="notice-buttom">
                        <text class="coment_text_time">{{item.createTime}}  </text>
                      <text class="coment_text_time">   发布人：{{item.createName}}</text>
                      
                    </div>
                    <div class="icon" v-if="show" @click.stop="seleteSome(item,index)">
                    <icon 
                        ref="myicon"
                        style="width:50px; height:50px;" 
                        :eeui="{content: item.isSelected ? Nocheck : checked, fontSize:'35px', color: item.isSelected ? '#cccccc' : '#000000'}" >
                    </icon>

                    </div>
                    
                </div>
              </div>
            </div>

            <div class="line"></div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
const eeui = app.requireModule("eeui");
const stream = weex.requireModule('stream') || {};
import { WxcButton } from "weex-ui";
const storage = weex.requireModule('storage')

export default {
  data() {
    return {
      lists: [],
      msg:[],
      show:false,
      Nocheck:'ios-checkmark-circle-outline',
      checked:'ios-checkmark-circle',
      checkedColor:"#000000",
      color2:"#cccccc",
      ids:[],
      showDelete:false

    };
  },
  components: {
    WxcButton
  },
  mounted() {

    this.getNotice()

    for (let i = 1; i <= 20; i++) {
      this.lists.push(i);
    }
    this.$refs.reflectName.setHasMore(true);
    //
    setTimeout(() => {
      this.lists.splice(2, 1, "改变第三项文字");
      // splice 详细用法http://www.w3school.com.cn/jsref/jsref_splice.asp
    }, 1000);
  },
  methods: {
    getNotice(){


            let that = this

      storage.getItem("id",(res)=>{
          
        
        //  console.log("id是---"+JSON.parse(res.data).id);
             const body = JSON.stringify({ uid:JSON.parse(res.data).id });
             
                stream.fetch({
                    method: 'POST',
                    url: 'http://10.12.84.20:3001/notice/findNoticesByTeacher',
                    type:'json',
                    body: body,
                    headers:{
                        "Content-Type":"application/json"
                    }
                    }, function(res) {
                    //   console.log(res.data);
                        if(res.ok){  
                         that.msg = res.data.data 
                        
                        }
                       
                    })

        
      })

    },
    seleteSome(item,index){

          let that = this
      // 多选
        this.msg[index].isSelected = !this.msg[index].isSelected


      

        that.ids = []
        for(let i of this.msg){
          if(!i.isSelected){
              that.ids.push(i.id)
          }
        }


        if(this.ids.length > 0 ){
           this.showDelete = true
        }else{
           this.showDelete = false
        }
      


    


      // 单选
        // for(let i of this.msg){
        //     i.isSelected = true
        // }

        // this.msg[index].isSelected = false


          
 
        
    },
    deletes(){
      

      let that = this
      eeui.confirm("你确定删除吗？", function(result) {
                if (result.status == "click" && result.title == "确定") {
                  
                const body = JSON.stringify({ id:that.ids});
                  
                      stream.fetch({
                          method: 'POST',
                          url: 'http://10.12.84.20:3001/notice/deletcNotice',
                          type:'json',
                          body: body,
                          headers:{
                              "Content-Type":"application/json"
                          }
                          }, function(res) {
                            console.log(res.data);
                            // that.getNotice()
                              eeui.toast("删除成功")
                              that.getNotice()

                          })
                }
            });

    },
    select(){
        this.show = !this.show
       
        
    },
    goNotice(id){

               eeui.openPage({
                    url: '../component/noticeInfo.js',
                    pageType:'app',
                    statusBarType: "immersion",
                    params:{id}
                });
    },
    itemClick(params) {
    //   eeui.toast("点击了" + (params.position + 1) + "项");
    },
    pullLoadListener() {
      let count = this.lists.length;
      if (count >= 100) {
        this.$refs.reflectName.setHasMore(false);
        return;
      }
      setTimeout(() => {
        for (let i = 1; i <= 20; i++) {
          this.lists.push(count + i);
        }
        this.$refs.reflectName.pullloaded();
      }, 1000);
    },
    refreshListener() {
      let newList = [];
      for (let i = 1; i <= 20; i++) {
        newList.push(i);
      }
      setTimeout(() => {
          this.getNotice()
        this.lists = newList;
        this.$refs.reflectName.setHasMore(true);
        this.$refs.reflectName.refreshed();
        eeui.toast("刷新数据成功");
      }, 1000);
    }
  }
};
</script>

<style scope>
.icon{
     position: absolute;
    /* margin-top: 40px; */
    right: 10px;
    margin-left: 20px;
    font-size: 24px;
    color: #ffffff;
    /* width: 40; */
    /* width: 130px; */
    height: 130px;
    /* background-color: green; */
}
.select{
    position: absolute;
    margin-top: 40px;
    right: 30px;
    font-size: 24px;
    color: #ffffff;
}
.selects{
    position: absolute;
    margin-top: 40px;
    right: 120px;
    font-size: 24px;
    color: #ffffff;
}
.notice-buttom{
  display: flex;
  margin-top: 10px;
  flex-direction: row;
}
.comment_box {
  margin-top: 30px;
}
.name {
  font-size: 28px;
  color: #333333;
}
.new_coment {
  font-size: 30px;
  text-align: center;
  color: #fff;
  
}
.box {
  width: 750px;
  flex: 1;
  margin-bottom: 50px;
}
.list {
  width: 750px;
  flex: 1;
}
.panel {
  width: 750px;
  height: 100px;
}
.panel-item {
  width: 750px;
  height: 100px;
  background-color: #ff9e14;
  flex-direction: column;
  justify-content: center;
}
.panel-text {
  font-size: 50px;
  text-align: center;
}
.page {
  background-color: #f1f1f1;
}
.top_box {
  margin-top: 25px;
  background-color: #fff;
  width: 700px;
  margin-left: 25px;
  border-radius: 15px;
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
  width: 750px;
  height: 1100px;
  background-color: #f1f1f1;
}
.comment_title {
  background-color: #363a44;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.time {
  width: 540px;
  margin-top: 6px;
}
.left {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
}
.left_title {
  margin-left: 20px;
}
.text {
  margin-top: 10px;
  margin-left: 25px;
}
.coment_text {
  lines:1;
  text-overflow:ellipsis;
  color: #707b91;
  font-size: 24px;
  margin-top: 2px;
}
.coment_text_time {
  color: #b6acac;
  font-size: 20px;
  margin-top: 2px;
}

</style>