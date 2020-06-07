<template>
    <div class="app">       
        <div class="bg">
           <image src="../static/zym.png" class="img"></image>
        </div>

        <div class="login_box">
            <div class="top">
                <text class="top_text">欢迎登录学生选课系统</text>
            </div>

            <div class="stuNo"> 
                <text class="stu_text">账号</text>
                <div class="input_box">
                        <input class="input" type="text" v-model="account" placeholder="请输入您的账号">
                </div>
                
            </div>

            <div class="passwo">
                <text class="passwo_text">密码</text>
              <div class="input_box">
                    <input class="input" type="password" v-model="password" placeholder="请输入你的密码">
              </div>
            </div>

            <div class="other">
                <text class="idZ">
                    请选择您的身份
                </text>
                <text class="botton">
                     忘了密码？
                 </text>
            </div>
            <!-- 身份选择 -->
            <div class="remember" > 
                
                <div class="remember_box" v-for="(item,index) in list" :key="index" @click="clickRole(index)">
                     <icon    
                        v-if="active==index" 
                        ref="reflectName"
                        style="width:50px; height:50px;" 
                        :eeui="{content: 'tb-round-check-fill', fontSize:'50px', color:'#4BAADB'}" >
                     </icon>
                <!-- md-radio-button-off -->

                  <icon  
                        v-else
                        ref="reflectName"
                        style="width:50px; height:50px;" 
                        :eeui="{content: 'md-radio-button-off', fontSize:'50px', color:'#4BAADB'}" >
                 </icon>

                <text class="remember_text">{{item.name}}</text>
             </div>
             
            </div>

            <div class="login_text_box">
                <div class="button" @click="openTabBar">
                    <text class="btnt">登录</text>
                </div>
            </div>

           
        </div>

        
    </div>
</template>


<script>
    const eeui = app.requireModule('eeui');
      const stream = weex.requireModule('stream')
       const storage = weex.requireModule('storage')

    export default {
        data(){
            return {
                account:"",
                password:"",
                role:"1",
                active:"",
                list:[
                    {   
                        name:"学生",
                    },
                    {
                        name:"老师"
                    },
                    {
                        name:"管理员"
                    }
                ]
            }
        },
        created(){
                let homeName = eeui. getPageInfo().pageName
    
                storage.setItem("homeName",homeName)
     
        },  
        methods: {
            ps(){
                storage.getItem("id",(res)=>{
                    // console.log(res)
                    var ss = JSON.parse(res.data)
                    // console.log(ss.id)
                    // eeui.alert(ss.id)
                })
            },
            clickRole(index){
               
                this.role = index + 1
                this.active =index
                // eeui.alert(this.role)
            },
            openTabBar() {
                var that = this
                const body = JSON.stringify({ 
                        "account":that.account,
                        "password":that.password,
                        "role":that.role});

                      

                stream.fetch({
                    method: 'POST',
                    url: 'http://10.12.84.20:3001/api/login',
                    type:'json',
                    body: body,
                    headers:{
                        "Content-Type":"application/json"
                    }
                    }, function(res) {
                        
                         
                        if(res.ok){

                        let code = res.data.data.code
                            storage.setItem('id', res.data)
                            eeui.openPage({
                                url: './tabbar/home.js',
                                pageType: 'app',
                                statusBarType: 'immersion',
                                params:{id:that.role}
                                
                            });
                        }else{
                               eeui.toast('账号或密码错误');
                              return 
                          }
                
                    })

                
            }
        }
    }
</script>

<style>
.idZ{
    margin-left: -50px;
}
.other{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.remember_text{

    font-size: 26px;
    text-align: center;
}
.remember{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 60px;
    margin-top: 5px;
}
.remember_box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 26px;

}
    .img{
        width: 750px;
        height: 480px;  
    }
    .bg{
        width: 750px;
        height: 480px;
        border: 1px solid #ccc;
        /* background-image: linear-gradient(to top,#a80077,#444b40); */
        background-image: linear-gradient(to right, #b3ffab, #12fff7);
    }

    .app {

         /* justify-content: center; */
        align-items: center; 
        background-color: #f1f1f1;
        /* background-image: linear-gradient(to top,#a80077,#444b40); */

       
    }
   
    .top{
        margin-top: 60px;
        margin-left: 60px;

    }
   
    .top_text{
        font-size: 36px;
    }
    .stuNo{
        margin-top: 50px;
        margin-left: 60px;

    }
    .passwo{
        margin-top: 30px;
        margin-left: 60px;
        
    }
   
    .login_box{
        position: absolute;
        margin-top: 220px;
        width: 710px;
        height: 900px;
        border-radius: 30px;
        background-color:#ffffff ;
    }
    .input_box{
        background-color: #EDF9FD;
        border: 1px solid #ccc;
        border-radius: 45%;
        width: 600px;
        height: 100px;
        margin-top: 20px;
    
    }
    .input{
        width: 550px;
        height: 100%;
        margin-left: 30px;
    }
    .login_text_box{
        justify-content: center;
        align-items: center;
        margin-top: 40px;
    }
    .passwo_text{
        margin-left: 10px;
         font-size: 36px;
    }
    .stu_text{
        font-size: 36px;
        margin-left: 10px;
    }
    .button{
        justify-content: center;
        align-items: center;
        background-color: #4BAADB;
        width: 600px;
        height: 100px;
        border: 1px solid #ccc;
        border-radius: 45%;

    }
     .btnt{
        color: #ffffff;
        font-size: 32px;
        font-weight: 400;
    }
    
</style>