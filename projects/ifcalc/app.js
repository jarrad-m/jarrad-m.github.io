var app = angular.module('leangainsApp', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
    	.when('/', {
                templateUrl : 'partials/metric_measurements.html',
                controller  : 'calculatorController'
        })

    	.when('/imperial_measurements/', {
	        	templateUrl: 'partials/imperial_measurements.html',
	        	controller: 'calculatorController'
      	})

      	.when('/metric_measurements/', {
	        	templateUrl: 'partials/metric_measurements.html',
	        	controller: 'calculatorController'
	    });
	    

    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
     

})

// Imperial Measurements Input Controller

//.controller('imperialController', ['$scope', function($scope) {

//	$scope.message = 'This is the imperial measurements screen';

//}])

.controller('calculatorController', ['$scope', function($scope) {


	$scope.mass =null;
	$scope.waist = null;
	$scope.subjectHeight = null;
	// Imperial variables
	$scope.impMass =null;
	$scope.impWaist = null;
	$scope.impHeight = null;

	$scope.bmr = 0;
	$scope.activityFactor = 1.3;
	$scope.tdee = 0;	
	$scope.age = null;	
	$scope.bmi = null;
	$scope.gender = 'male';
	$scope.calcMethod = 'Miffin-St Jeor';
	$scope.bodyfatPer = null;
	$scope.leanBodyMass = null;
	$scope.fatBodyMass = null;
	

	// Convert to metric 
	$scope.convertToMetric = function() {
		$scope.mass = $scope.impMass / 2.2046226218;
		$scope.waist = $scope.impWaist / 0.3937007874;
		$scope.subjectHeight = $scope.impHeight / 0.3937007874;
		$scope.updateCalcs();
	}

	

	// BMI
	$scope.calcBMI = function() {
		$scope.bmi = $scope.mass / (($scope.subjectHeight / 100) * ($scope.subjectHeight / 100));
		console.log($scope.bmi);
	};

	// Calculate lean body mass
	$scope.calcLBM = function() {
		if ($scope.bodyfatPer != null) {
			$scope.leanBodyMass = ((100 - $scope.bodyfatPer) / 100) * $scope.mass ;
		}
	};

	// Calculate fat body mass 
	$scope.calcFBM = function() {
		if ($scope.bodyfatPer != null) {
			$scope.fatBodyMass = ($scope.bodyfatPer) / 100 * $scope.mass 
		}
	};

	$scope.setActivityFactor = function(factor) {
		$scope.activityFactor = factor;
		$scope.updateCalcs();	
 
	};

	//$scope.setAge = 


	// Set Gender
	//
	$scope.setGender = function(gend) {
		$scope.gender = gend;
		console.log("gender has changed to " + gend);
		$scope.updateCalcs();	
	}

	$scope.setCalcMethod = function(str) {
		$scope.calcMethod = str;
		console.log("calc method has changed to " + str);
		$scope.calcBMR();
	}


	// Calculate BMR based on equation chosen
	//
	$scope.calcBMR = function() {
		if ($scope.calcMethod === 'Harris-Benedict') {
			$scope.calcHarrisBenedict();

		}
		else // ($scope.calcMethod === 'Miffin-St Jeor') 
		{
			$scope.calcMiffinStJeor();
		
		
		}
		$scope.calcTDEE();
		
		

	};

	// Check for null inputs
	//
	$scope.isNullInput = function() {
		if ($scope.mass == null || $scope.subjectHeight == null || $scope.age == null) {
			return true;
		}
		else { 
			return false;
		}
	};


	// Bodyfat Percentage
	//
	$scope.calcBodyFat = function() {
		// Convert to imperial
		var impMass2 = $scope.mass * 2.2046226218;
		var impWaist2 = $scope.waist * 0.3937007874;	
		var impHeight2 = $scope.subjectHeight * 0.3937007874;
		if($scope.waist != null) {
			// Male
			if ($scope.gender === 'male') {

				$scope.bodyfatPer = (-98.42 + 4.15 * impWaist2 - 0.082 * impMass2) / impMass2 * 100;
			}
			else {

				$scope.bodyfatPer = (-76.76 + 4.15 * impWaist2 - 0.082 * impMass2) / impMass2 * 100;
			}
		}
 	}


	// Revised Harris-Benedict Equation
	//
	$scope.calcHarrisBenedict = function() {
		if ($scope.isNullInput() == false ) {
			if ($scope.gender === 'male') {
				$scope.bmr = 13.397 * $scope.mass + 4.799 * $scope.subjectHeight - 5.677 * $scope.age + 88.362;
			}
			else {
				$scope.bmr = 9.247 * $scope.mass + 3.098 * $scope.subjectHeight - 4.330 * $scope.age + 447.593;
			}
		}
	};

	

	// Miffin St Jeor Equation
	$scope.calcMiffinStJeor = function() {
		if ($scope.isNullInput() == false ) {
			$scope.bmr = 10.0 * $scope.mass + 6.25 * $scope.subjectHeight -5.0 * $scope.age;
			if ($scope.gender === 'male') {
				$scope.bmr += 5;
			}
			else {
				$scope.bmr += -161;
			}
		}
				
	};

	// TDEE
	// Total Daily Energy Expenditure
	$scope.calcTDEE = function() {
		$scope.tdee = $scope.bmr * $scope.activityFactor;
	};

	// Updater function
	// Runs all calculations after changes to input
	$scope.updateCalcs = function() {
		//$scope.convertToMetric();
		$scope.calcBMR();
		$scope.calcBMI();
		$scope.calcBodyFat();
		$scope.calcLBM();
		$scope.calcFBM();

	}
	
}]);