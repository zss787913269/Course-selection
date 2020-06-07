<template>
    <div>

        <div class="title">
            <text class="op">意见反馈</text>  
        </div>

        <div class="box">

            <textarea class="textarea" placeholder="请输入您的建议"   v-model="value"  cols="50" rows="30"></textarea>
            
            <input class="phone" type="text"  v-model="phone" placeholder="你的联系方式(QQ号/手机号/Email)">
            
            <text class="me">联系我们  QQ号：787913269</text>
        </div>

        <div class="btn" >
                <text class="blue" @click="send">发送</text>
        </div>

    </div>
</template>
<script>
const eeui = app.requireModule('eeui');
const stream = weex.requireModule("stream")

    export default {
        data(){
            return {
                value:"",
                phone:""
            }
        },
        mounted() {
        
                    
        },
        methods: {
             send(){
             if(this.value == ""){
                eeui.toast('不能发送空白内容');
             }else{


                 var that = this
                const body = JSON.stringify({ 
                        "msg":that.value,
                        "phone":that.phone});

                      

                stream.fetch({
                    method: 'POST',
                    url: 'http://10.12.84.20:3001/histroy/createOp',
                    type:'json',
                    body: body,
                    headers:{
                        "Content-Type":"application/json"
                    }
                    }, function(res) {
                        
                        if(res.ok){
                            eeui.toast("发送成功！您的反馈帮助我们做出更好的优化")
                            that.value = ""
                            that.phone = ""
                        }
                
                    })






             }
         }
        },
    }
</script>

<style scoped>
.title{
    height: 100px;
    background-color: #363a44;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;   
}
.op{
    color: #ffffff;
    font-size: 30px;
}
.box{
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
}
.textarea{
    background-color: #ccc;
}
.phone{
    height: 100px;
    border-bottom: 1px solid #333;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #d9dde1;


}
.me{
    font-size: 30px;
    margin-top: 10px;
}
.btn{
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

}
.blue{
 
    border-width: 1px;
    border-style: solid;
    border-color: pink;
    font-size: 30px;
    width: 200px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: green;
    border-radius: 15px;
    color: #ffffff;
}

</style>
