<template>
  <div class="app">
    <tabbar ref="reflectName" class="tabbar" :tabPages="tabPages()"></tabbar>
  </div>
</template>

<style>
.app {
  flex: 1;
}

.tabbar {
  flex: 1;
  width: 750px;
}
</style>



<script>
const storage = weex.requireModule("storage");

export default {
  data() {
    return {
      id: ""
    };
  },
  created() {
  
  },
  methods: {
    tabPages() {
      let arr = [];
      const tabbarId = app.config.params.id;
      
 
      if (tabbarId == 1) {
        arr = [
          {
            title: "首页",
            selectedIcon: "md-home",
            url: "./main.js"
          },
          {
            title: "公告",
            selectedIcon: "md-book",
            url: "./notice.js"
          },
          {
            title: "我的",
            selectedIcon: "md-person",
            url: "./me.js"
          },
      
        ];
          storage.setItem('role', 1)
      }else if(tabbarId == 2){
          arr = [
          {
            title: "我的课程",
            selectedIcon: "md-home",
            url: "../component/myCoursePage.js"
          },
          {
            title: "我的",
            selectedIcon: "md-person",
            url: "../component/teacherMsg.js"
          }
        ]
         storage.setItem('role', 2)
      }else if(tabbarId == 3){
            arr = [
          {
            title: "课程管理",
            selectedIcon: "md-book",
            url: "../component/adminCourse.js"
          }
        ]
         storage.setItem('role', 3)
      }

      return arr;
    }
  }
};
</script>
