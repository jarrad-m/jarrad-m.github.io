angular.module('portfolioApp', [])

	.controller('languageController', ['$scope', '$http', function($scope, $http) {

		  
		$scope.defaultLanguage = "Japanese";
		$scope.switchedLanguage = "English";

		$scope.languageData =	{
			title: "title",
			header_logo : "Jarrad",
			header_nav : "Main Navigation",
			header_nav_home : "ホーム",
			header_nav_about : "Jarradについて",
			header_nav_nav_projects : "プロジェクト",
			header_nav_contact : "お問い合わせ",

			main_banner_header : "Jarrad M",
			main_bannerer_header_blurb : "ウェブ デベロッパー",

			skills_section_header : "スキルズ",

			projects_section_header : "プロジェクト",
			projects_section_goto_button : "サイトへ",

			contact_me_section_header : "お問い合わせ",
			contact_me_section_email : "メール" 
		}; 

		$http.get('en.json')
    		.then(function(response) {
        		$scope.englishData = response.data;
    	});

    	$http.get('jp.json')
    		.then(function(response) {
        		$scope.japaneseData = response.data;
    	});


    	$scope.className = function() {

	        var className = 'English';

	        if ($scope.defaultLanguage === 'English')
	            className = 'english';

	        if ($scope.defaultLanguage === 'Japanese')
	            className = 'japanese';

	        return className;
	    };


		$scope.changeLanguage = function() {
			if ($scope.defaultLanguage == "Japanese") {
				
				$scope.languageData = $scope.englishData;
				//$scope.languageData.header_nav_home = "home";
				$scope.defaultLanguage = "English";
				$scope.switchedLanguage = "Japanese";
			}
			else {
				$scope.languageData = $scope.japaneseData;
				//$scope.languageData.header_nav_home = "ホーム";
				$scope.defaultLanguage = "Japanese"
				$scope.switchedLanguage = "English";
			}
		}

	//loadLanguage = function(lang) {
	//	if (lang == "English")	

	//}

	
}]);