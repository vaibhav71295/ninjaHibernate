
var app = angular.module("myapp", []);
app.controller("ListController", ['$scope','$http',function($scope,$http) {
		
		 var url = "http://localhost:8080/book";
         
            $http.get(url).success( function(response) {
               $scope.Books = response;
			   var x=$scope.Books;
			for (var i = 0; i < x.length; i++) {
				$scope.editingData[$scope.Books[i].id] = false;
			}
			   //console.log($scope.library);
            });




   /* $scope.Books = [
        {
			'id'  : 1,
            'name':'java',
            'author':'CR',
            
        },
        {
			'id'  : 2,
            'name':'3 mistakes of my life',
            'author':'chetan bhagat',
        },
        {
            'id'  : 3,
            'name':'mybook',
            'author':'vaibhav',
        }]; */
			//$scope.Books=bookListModel.list;
			$scope.ini=function() {
			var x=$scope.Books;
			for (var i = 0; i < x.length; i++) {
				$scope.editingData[$scope.Books[i].id] = false;
			}
		};
        $scope.addNew = function(book){
			var i= $scope.Books[$scope.Books.length-1].id+1;
            $scope.Books.push({ 
                'id': i, 
                'name': "",
                'author': "",
            });
			$scope.editingData[i] = true;
			var purl="http://localhost:8080/insertBook/"+i+"/ / ";
		    //var a={ id:i,name:" ", author:" "};
		    $http({
		             method  : 'GET',
		             url     : purl,
		             //data    : {id: 1,name:"hello",author:"asdas"}, //forms user object
		             headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		            }).success( function(response) {
		                console.log(response);
		       //console.log($scope.library);
		         });
			
        };
    
        $scope.remove = function(){
            var newDataList=[];
			var flag=0;
            $scope.selectedAll = false;
            angular.forEach($scope.Books, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
					flag++;
                }
            });
				if(flag==0)
					alert("Nothing Selected");
				else
            $scope.Books = newDataList;
        };
    
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.Books, function(book) {
            book.selected = $scope.selectedAll;
        });
    };    
	
	$scope.editingData = {};
			
				$scope.modify = function(book){
				$scope.editingData[book.id] = true;
			};


			$scope.update = function(book){
				if(book.name==""||book.author=="")
					alert("Fields cannot be empty");
				else
				{
					var purl="http://localhost:8080/updateBook/"+book.id+"/"+book.name+"/"+book.author;
				    //var a={ id:i,name:" ", author:" "};
				    $http({
				             method  : 'GET',
				             url     : purl,
				             //data    : {id: 1,name:"hello",author:"asdas"}, //forms user object
				             headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
				            }).success( function(response) {
				                console.log(response);
				       //console.log($scope.library);
				         });	
				$scope.editingData[book.id] = false;
				}
			};
    
    
}]);



//   angular.module('myapp').service("bookListModel", ['$rootScope', function($rootScope) {
//    var book1 = {
//			id: 1,
//            name: "Fowler",
//            author: "abcd",
//        },
//		book2 = {
//			id: 2,
//            name: "koko",
//            author: "qwe",
//        },
//		book3 = {
//			id: 3,
//            name: "popo",
//            author: "ijk",
//        },
//		book4 = {
//			id: 4,
//            name: "roro",
//            author: "zxc",
//        };
//        
//    
//    this.list = [book1,book2,book3,book4];
//    
//    
//             
//}]);  