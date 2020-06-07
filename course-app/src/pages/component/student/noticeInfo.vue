<template>
    <div class="main">
            <div class="comment-box" v-for="item in list" :key = "item.id">
                <text class="title">{{item.title}}</text>
                <div class="msg">
                   <text class="conent">   &nbsp;&nbsp;{{item.msg}}
                   </text>
                </div>
                <div class="bottom">
                    <text class="time">{{item.createTime}}</text>
                    <text class="name">发布人：{{item.createName}}</text> 
                </div>
            </div>
    </div>
</template>
<script>
const navigationBar = app.requireModule('navigationBar');
const stream = weex.requireModule("stream");
export default {
    data(){
        return {
            list:[]
        }
    },
    mounted(){
         navigationBar.setTitle({backgroundColor:"#333333", title:"通知",titleColor:"#ffffff" })
         this.getNoticeInfo()


    },
    methods:{
        getNoticeInfo(){
            let that  = this
            let id = app.config.params.id
            let body = JSON.stringify({ id});
        stream.fetch(
            {
                method: "POST",
                url: "http://10.12.84.20:3001/notice/getNoticeById",
                type: "json",
                body: body,
                headers: {
                "Content-Type": "application/json"
                }
            },
            function(res) {
                 
                    that.list = res.data.data
              
            }
         );
                
        }
    }


}
</script>

<style  scope>
.title{
    text-align: center;
    margin-top: 20px;
    font-size: 36px;
    font-weight: 500;
    color: #4d4f53;
}

.conent{
    margin-top: 30px;
    font-size: 28px;
    margin-left: 20px;
    line-height: 38px;
    margin-right: 20px;
    color: #333333;
}
.bottom{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 20px;
    margin-right: 20px;
}
.time,.name{
    font-size: 24px;
}
.name{
    margin-top: 20px;
}
    
</style>