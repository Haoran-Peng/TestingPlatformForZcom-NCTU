  var FormData = require('form-data');
  var fs = require('fs');
  var http = require('http');
	var url = require('url');
	var util = require('util');
	var axios = require('axios');
	var pic = 2;
	//req 请求信息   res返回信息
	http.createServer(function(req, res){
		//res.writeHeader(200, {'Content-Type':'text/javascript;charset=UTF-8'});  //状态码+响应头属性
		res.setHeader("Access-Control-Allow-Origin", "*");  // 设置可访问的源
		res.setHeader("Access-Control-Allow-Headers", "Content-Type"); 
	 
		// 解析 url 参数
		var params = url.parse(req.url, true).query;  
		hostServer = params.url;

		var form = new FormData();
		form.append('upload', fs.createReadStream(pic));
		var formHeaders = form.getHeaders();
		var start_T = new Date().getTime();
		axios.post("http://"+hostServer+"/image", form, {
		  headers:formHeaders,
		}).then(function (response){
			var end_T = new Date().getTime();
			cost = end_T-start_T;
			res.write(cost+":");
			res.write(response.data);
			res.end();
		}).catch(function (error){
			var end_T = new Date().getTime();
			cost = end_T-start_T;
			res.write(cost+":");
			res.write("fail");
			res.end();
		})		
	}).listen(3000);
	console.log("3000 端口服务启动：")
	
    
