define({ "api": [
  {
    "type": "GET",
    "url": "/api/users/:id",
    "title": "获得某个用户",
    "description": "<p>根据数据库判断是否有这个人的存在</p>",
    "name": "login",
    "parameter": {
      "fields": {
        "path参数": [
          {
            "group": "path参数",
            "type": "Number",
            "optional": false,
            "field": "account",
            "description": ""
          },
          {
            "group": "path参数",
            "type": "Number",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3001/v1/api/users/5a45cefd080d7c39a036ca55"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/student/student.controller.ts",
    "groupTitle": "User"
  }
] });
