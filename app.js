angular.module('portfolioApp', [])
	
	

	.controller('languageController', ['$scope', '$http', function($scope, $http) {

		  
		$scope.defaultLanguage = "English";
		$scope.switchedLanguage = "Japanese";

		$scope.languageData =	{
			title: "title",
			header_logo : "Jarrad",
			header_nav : "Main Navigation",
			header_nav_home : "Home",
			header_nav_about : "About Me",
			header_nav_projects : "Projects",
			header_nav_contact : "Contact",

			main_banner_header : "Jarrad M",
			main_banner_header_blurb : "Web Developer",

			skills_section_header : "About Me",

			projects_section_header : "Projects",
			projects_section_goto_button : "Visit Site",

			contact_me_section_header : "Contact Me",
			contact_me_section_email : "Email" 
		};

		$scope.projects = [{name : "Intermittent Fasting Calculator",
							about : "A reworked version of the flash website 'IFCalc'",
							tech : "Angular, Charts.js, HTML5, CSS3, Material Design",
							summary : "The Intermittent fasting calculator dynamically calculates energy expenditure, bodyfat percentage and recommended calories for dieting users. Style based upon Google's Material Design.",
							img_href : ["/images/ifcalc.png","/images/securex-showcase.jpg"],
							project_href : "",
							github_href : ""},

							{name : "Securex Site Refactor",
							about : "A fully responsive site re-design",
							tech : "HTML5, CSS3",
							summary : "While keeping the same basic layout and formatting I redesigned the site to be fully responsive across tablet and mobile devices.",
							img_href : ["/images/securex-showcase.jpg","/images/surge.png","/images/balloons.png"],
							project_href : "",
							github_href : ""},

							{name : "Surge Website",
							about : "A marketing focussed web developer site",
							tech : "Wordpress, HTML5, CSS3",
							summary : "Developed with the goal of familiarising myself with the Wordpress ecosystem. Creatives designed in collaboration with a local marketing guru in order to create a brand.",
							img_href : ["/images/surge.png"],
							project_href : "",
							github_href : ""},

							{name : "Balloons for All SPA",
							about : "Single Page Application shopping cart with fully integrated Stripe Payment",
							tech : "Angular, Stripe, CSS Flexbox, JavaScript",
							summary : "Using angular ",
							img_href : ["/images/balloons.png"],
							project_href : "",
							github_href : ""},

							{name : "Project 149",
							about : "Portfolio site for local artist",
							tech : "Angular, HTML5, CSS3, Mailchimp",
							summary : "This website was created in collaboration with the client and as best possible to his design specifications.",
							img_href : ["/images/project149.png"],
							project_href : "",
							github_href : ""},

							{name : "Morey Security",
							about : "Website re-design",
							tech : "HTML5, CSS3, JavaScript, Mailchimp",
							summary : "The client needed a modern, fully responsive website. Landing pages and Mailchimp integration were also done.",
							img_href : ["/images/morey.png"],
							project_href : "",
							github_href : ""},

							{name : "CoinMeUp Bitcoin App",
							about : "A Single Page App for those interested in trading Bitcoin",
							tech : "Angular, Charts.js, MongoDB, NodeJS, REST",
							summary : "This app allows users to simulate buying and selling Bitcoins using data retrieved from the bitcoin API",
							img_href : ["/images/leangains.png"],
							project_href : "",
							github_href : ""},


							{name : "Digital Door Locks",
							about : "Theme update and re-design",
							tech : "Wordpress, HTML5, CSS3",
							summary : "I was in charge of the re-design of the DDL website",
							img_href : ["/images/digitaldoorlocks.png"],
							project_href : "https://www.digitaldoorlocks.com.au",
							github_href : ""}


							];			
		/**

		$scope.languageData =	{
			title: "title",
			header_logo : "Jarrad",
			header_nav : "Main Navigation",
			header_nav_home : "ホーム",
			header_nav_about : "Jarradについて",
			header_nav_projects : "プロジェクト",
			header_nav_contact : "お問い合わせ",

			main_banner_header : "Jarrad M",
			main_bannerer_header_blurb : "ウェブ デベロッパー",

			skills_section_header : "スキルズ",

			projects_section_header : "プロジェクト",
			projects_section_goto_button : "サイトへ",

			contact_me_section_header : "お問い合わせ",
			contact_me_section_email : "メール" 
		}; 

		{name : "Intermittent Fasting Calculator",
							about : "",
							tech : [],
							summary : "",
							img_href : [],
							project_href : "",
							github_href : ""
						}
		**/ 

							

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
		};	
	}])
	
	.controller('slidesController', function ($scope, $http) {
        
	    
        $scope.slides = $scope.project.img_href; 

        /* $scope.slides = [
	        {image: 'images/img001.jpg', description: 'Image 01'},
	        {image: 'images/img002.jpg', description: 'Image 02'},
	        {image: 'images/img003.jpg', description: 'Image 03'},
	        {image: 'images/img004.jpg', description: 'Image 04'}
	    ]; 
        */

        $scope.currentIndex = 0;

    	$scope.setCurrentSlideIndex = function (index) {
        	$scope.currentIndex = index;
    	};
    	
    	$scope.isCurrentSlideIndex = function (index) {
        	return $scope.currentIndex === index;
    	};

    	$scope.prevSlide = function () {
        	$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    	};

    	$scope.nextSlide = function () {
        	$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    	};


    	$scope.hasMultipleImages = function () {
    		return $scope.slides.length > 1;
    	}



    })





