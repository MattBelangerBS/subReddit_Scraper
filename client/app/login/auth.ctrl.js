(function(){
	'use-strict';

	angular
		.module('subReddit')
		.controller('AuthCtrl',AuthCtrl);

	AuthCtrl.$inject = ['$http','$state','toastr','AuthSrv'];

	function AuthCtrl($http,$state,toastr,AuthSrv){
		var ctrl = this;
        ctrl.state = $state;
		//buttons
		ctrl.register_btn = 'Sign Up';
		ctrl.auth_btn = "Log In";

		//Functions
		ctrl.register = register;
		ctrl.authenticate = authenticate;
        ctrl.goToReg = goToReg;

		function register(){
			//check passwords
			if(ctrl.password == ctrl.repassword){
				var user = {
					email:ctrl.email,
					password:ctrl.password,
                    reddits:JSON.stringify(['aww'])
				}
				user = JSON.stringify(user);
				$http.post('/api/auth/register',user)
				.then(function(res){
					ctrl.register_btn = res.data.msg;
                    toastr.success('Account Created. Please login', 'Created');
                    $state.go('auth');
				})
			}
			else{
				ctrl.register_btn = "Passwords Don't Match";
			}
		}

        function goToReg() {
             ctrl.state.go('register');
        }
		function authenticate(){
           
			var user = {
				email:ctrl.email,
				password:ctrl.password
			}

			user = JSON.stringify(user);
			$http.post('/api/auth/authenticate',user)
			.then(function(res){
                if(res.data.msg==='Email/Password is incorrect'){
                     toastr.error(res.data.msg, 'Error');
                    return;
                }
                if(res.status==200){
                    var reddits = JSON.parse(res.data.user.reddits);

                    AuthSrv.setCookie('subReddits',reddits);

                    ctrl.auth_btn = res.data.msg;
                    ctrl.state.go('home');
                }
			});
		}
	}
})();