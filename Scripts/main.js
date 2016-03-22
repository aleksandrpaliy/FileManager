var model = {
//	this_catalog:"E:\\-=STUDY=-\\C#\\AngularJS vs Botstrap3",
    this_catalog: "C:\\Users\\User\\Desktop\\FileMenager",

    info_size:[{Less_10:"6",More10_Less50:"2",More50:"1"}],

	catalog_files:[{
		id:"cat0",
		name:"C:",
		path:"C:",
		info_name:[
		{ name: "main", type: "Catalog" },
		{ name: "second catalog", type: "Catalog" },
		{ name: "first file", type: "File" },
		{ name: "second file", type: "File" }]
	},
	{
		id:"cat1",
		name:"Users",
		path:"C://Users",
		info_name:[
		{ name: "main", type: "Catalog" },
		{ name: "second catalog", type: "Catalog" },
		{ name: "first file", type: "File" }]
	},
	{
		id:"cat2",
		name:"User",
		path:"C://Users//User",
		info_name:[
		{ name: "main", type: "Catalog" },
		{ name: "second catalog", type: "Catalog" },
		{ name: "first file", type: "File" },
		{ name: "second file", type: "File" },
		{ name: "Therd file", type: "File" }]
	},
	{
		id:"cat3",
		name:"Desktop",
		path:"C://Users//User//Desctop",
		info_name:[
		{ name: "main", type: "Catalog" },
		{ name: "second catalog", type: "Catalog" },
		{ name: "first file", type: "File" },
		{ name: "second file", type: "File" },
		{ name: "Therd file", type: "File" }]
	},
	{
		id:"cat4",
		name:"FileMenager",
		path:"C://Users//User//Desctop//FileMenager",
		info_name:[
		{ name: "main", type: "Catalog" },
		{ name: "second catalog", type: "Catalog" },
		{ name: "first file", type: "File" },
		{ name: "second file", type: "File" },
		{ name: "Therd file", type: "File" }]
	}],
    
	files: [{ name: "Script", type: "Directory", path: "C:\\Users\\User\\Desktop\\test\\Script", size: "2030" },
	{name:"style",type:"Directory",path:"",size:"1024"},
	{ name: "index", type: "File", path: "", size: "0.04" }],

};

var MenagerApp = angular.module("MenagerApp",[]);


MenagerApp.controller("HeadCntr", ['$scope', '$http', '$compile', function ($scope, $http, $compile) {
    angular.element(document.getElementById('this_catalog'))
    $scope.data = model;
	$scope.give_file_type = function (param) {
	if(param == "Catalog")return "image/Catalog.png"
	else return "image/File.png"
	}
	$scope.$watch('data', function (newValue, oldValue) {
	    console.log("произошло изменение модели");
//	    $scope.$apply();
	})
	$scope.ajax_request = function (param) {
	    $http({ method: 'POST', url: 'Services/AnswerForClient.asmx/HelloWorld', data: { path:param } }).success(function (params) {
	        model.files[{}] = [];
	        for (i = 0; i < params.d.data.main_data.length; i++) {
	            model.files[i] = params.d.data.main_data[i];
	        }
	        model.catalog_files = new Array();
	        for (i = 0; i < params.d.data.data_menager.length; i++) {
	            console.log("work!");
	            model.catalog_files[i] = params.d.data.data_menager[i];
	        }
	        model.info_size = [];
	        model.info_size[0] = params.d.data.inf_size;
//	        model.info_size = params.d.data.inf_size;
	        console.log("Обновление модели прошло успешно!");
	        console.log(model.info_size);
	    })
	}

}]).directive("manager", function ($compile) {
    return {
        restrict:'AE',
		replace:true,
		controller: "HeadCntr",
		scope:{
		    r_data: '='
		},
//		template:"<p>Paliy</p>",
		link: function (scope, element, attrs) {
		    var q = attrs['r_data'];
		    data = scope[q];
		    console.log("Срабатывание директивы!");
		    return scope.$watch(scope.data, function (newValue, oldValue) {
		        var rozmetka = "";
		        rozmetka += "<button ng-repeat=\"data in data.catalog_files\" ng-click=\"ajax_request(data.path)\" class=\"btn btn-info\" ng-mouseover=\"cat1 = true\" ng-mouseleave=\"cat1 = false\" ng-init=\"cat1 = false\">{{data.name}}></button>";
		        element.append($compile(rozmetka)(scope));
//			    for (i = 0; i < scope.data.catalog_files.length; i++) {
			        //----------------------------------------------------------------
//			        var str = "<button ng-click=\"ajax_request()\" class=\"btn btn-info\" ng-mouseover=\"" + scope.data.catalog_files[i].id + " = true\" ng-mouseleave=\"" + scope.data.catalog_files[i].id + " = false\" ng-init=\"" + scope.data.catalog_files[i].id + " = false\">" + scope.data.catalog_files[i].name + "></button>";
			        //				var el = angular.element(str);
//			        var content = $compile(str)(scope);
//			        element.append(content);
			        //----------------------------------------------------------------
//			    }
			    for (i = 0; i < scope.data.catalog_files.length; i++) {
			        var str = "<div class=\"info_catalog\" ng-show=\"" + scope.data.catalog_files[i].id + "\"><h2>Catalog :  " + scope.data.catalog_files[i].name + "</h2><table class=\"table\"><thead><th>Name</th><th>Type</th></thead>";
			        str += "<tbody>";
			        for (j = 0; j < scope.data.catalog_files[i].info_name.length; j++) {
			            str += "<tr><td>" + scope.data.catalog_files[i].info_name[j].name + "</td>";
			            str += "<td><img height=\"20px\" width=\"20px\" src=\"" + scope.give_file_type(scope.data.catalog_files[i].info_name[j].type) + "\"></td></tr>";
			        }
			        str += "</tbody>";
			        str += "</table></div>";
			        var content = $compile(str)(scope);
			        element.append(content);
			    }
			    
			})
		}
	}
})








MenagerApp.controller("MainCntr", ['$scope', '$http', '$compile', function ($scope, $http, $compile) {
    $scope.data = model;
    $scope.ajax_request = function (param) {
        $http({
            method: 'POST',
            url: 'Services/AnswerForClient.asmx/HelloWorld',
            data: { path: param }
        }).success(function (parametr) {
            model.files = [];
            for (i = 0; i < parametr.d.data.main_data.length; i++) {
                model.files[i] = parametr.d.data.main_data[i];
            }
            model.catalog_files = new Array();
            for (i = 0; i < parametr.d.data.data_menager.length; i++) {
                console.log("work!");
                model.catalog_files[i] = parametr.d.data.data_menager[i];
            }

            model.info_size = [];
            model.info_size[0] = parametr.d.data.inf_size;
            console.log("Обновление модели прошло успешно!");
            console.log(parametr);
        })
    }
    $scope.give_file_type = function (param) {
        if (param == "Directory") return "image/Catalog.png"
        else return "image/File.png"
    }
    $scope.interprite_success = function (param) {
        if (param) { return "success"; }
        else { return "danger"; };
    }
    $scope.interprite_active = function (param) {
        console.log("access!!");
        if (param) { return "Посещен"; }
        else { return "Не посещен"; }
    }
//    $scope.$broadcast("OnThisDir", test_qwe);
    

    

}]).directive("tableData", function ($compile) {
    return{
        restrict:'E',
        replace: true,
        controller: "MainCntr",
        scope:{
            data:'='
        },
        link: function (scope, element, attrs) {
            var attrs_data = scope.data[attrs["data"]];
            var rozmetka = "";
            rozmetka += "<table class=\"table\">"
            rozmetka += "<thead id=\"table_main\"><tr><th width=\"300px\">Name</th><th>Type</th><th>Size</th></tr></thead>";
            rozmetka += "<tbody>";
            rozmetka += "<tr class=\"info\" ng-repeat=\"data in data.files\">";
            rozmetka += "<td class=\"link_table\" width=\"400px\" ng-click=\"ajax_request(data.path)\">{{data.name}}</td>";
            rozmetka += "<td><img src=\"{{give_file_type(data.type)}}\" width=\"20px\" height=\"20px\"></td>";
            rozmetka += "<td>{{data.size}} Mb</td>";
            rozmetka += "</tr>";
            var content = $compile(rozmetka)(scope);
            element.append(content);
        }
    }
})


