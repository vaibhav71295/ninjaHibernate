	  //console.log("hi");
	  var bo = angular.module("bo", []);
		bo.controller("bookController", function($scope,$http) {
         //function bookController($scope,$http) {
            var url = "data.txt";
         
            $http.get(url).success( function(response) {
               $scope.library = response;
			   var x=$scope.library;
			for (var i = 0; i < x.length; i++) {
				$scope.editingData[$scope.library[i].id] = false;
			}
			   //console.log($scope.library);
            });
			
			$scope.addRow = function(){	

			var i= $scope.library[$scope.library.length-1].id+1;
			$scope.library.push({ 'id':i,'name':"", 'author':""});
				$scope.editingData[i] = true;
			};
			
			$scope.removeRow=function(id){
				$scope.library.splice(id, 1);
				
			}
			$scope.updateName=function(){
				var x=$scope.library;
				for(var i=0;i<x.length;i++){
					if(x[i].id==$scope.id)
						x[i].name=$scope.newname;
				}
				
			}
			
			$scope.editingData = {};
			
				$scope.modify = function(book){
				$scope.editingData[book.id] = true;
			};


			$scope.update = function(book){
				$scope.editingData[book.id] = false;
			};
			
         });