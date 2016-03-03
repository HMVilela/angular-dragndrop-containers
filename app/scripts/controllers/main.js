'use strict';

/**
 * @ngdoc function
 * @name embradetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the embradetApp
 */
angular.module('embradetApp')
  .controller('MainCtrl', ['$scope', '$http',function($scope, $http) {
  		$scope.handleDrop = function(item, bin) {
    		Alert('Item ' + item + ' has been dropped into ' + bin);
  		}

  		var containersId = [];
  		var containersArray = []; 
  		var items = [];

  		//lê os dados do JSON e salva nos 3 arrays acima
   		$http.get('data/data.json').success(function(data) {
  			items = data;    		
  			var flags = [];
  			//insere valores unicos no array
			for(var i = 0; i < data.length; i++) {
    			if(flags[data[i].column]) 
    				continue;
    			flags[data[i].column] = true;
    			containersId.push(data[i].column);
			}
			containersId = containersId.sort();
			console.log(containersId);//array com os ids de containers que conterão itens
			console.log(items);//array com todos os itens do json
			for (var j = 0; j < containersId.length; j++) {
				containersArray[containersId[j]] = items.filter(function (item) {
					return item.column === containersId[j];
				}); 
			}
			console.log(containersArray);//array de containers, com array de itens de cada posição

			$scope.containers = containersArray;
    	});

    	$scope.removeItem = function (containerId, itemIndex) {
    		containersArray[containerId].splice(itemIndex, 1);
    		console.log(containersArray);
    	}

    	$scope.addItem = function (name, container) {
    		items.push({name: name, column: container});
    		$scope.containers = containersArray;
    		console.log(containersArray);
    	}

    	$scope.changeItem = function (name, container) {
    		items.push({name: name, column: container});
    		$scope.containers = containersArray;
    		console.log(containersArray);
    	}
	}]);