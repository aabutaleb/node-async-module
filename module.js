var async = require('./async');

module.exports=function(userService, searchService, promoService){
	return function(req, res, next){

		var tasks = {
		profile:function(cb){
			userService.getUser(function(e, data){
				if (e){
					return cb(e);
				}
				cb(e, data.profile);
			})
		},

		promos:function(cb){
			promoService.getPromos(req.body.keyword, cb);
		},

		results:function(cb){
			searchService.getResults(req.body.keyword, cb);
		}
		};

		async(tasks, function(e, data){
			if (e){
				res.status(500);
				console.error(e);
				res.json({errorMsg:e.message});
				return;
			}			

			res.json(data);
		});
	};

};