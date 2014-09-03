var test = require('tape');

var service = require('../module');

test('async methods', function(t){
	t.plan(4);

	var keyword = "";

	var handler = service(mockUser(null,{profile:{}}),
						  mockSearch(null, []),
						  mockPromos(null, [])
						  );
	handler(mockRequest({keyword:keyword}), mockResponse(function(json){
			t.notEqual(json, null, 'testing json is not null');

			t.notEqual(json.profile, null, 'testing profile is not null');
			t.notEqual(json.promos, null, 'testing promos is not null');
			t.notEqual(json.results, null, 'testing results is not null');

			t.end();
	}));


});

function mockRequest (body){
	return {
		body: body
	};
}

function mockResponse (cb){
	return {
		json: cb
	};
}

function mockUser(error, data){
	return{
		getUser: function(cb){
			setTimeout(function(){
				cb(error,data);
			},1500);
		}
	}
}

function mockPromos(error, results){
	return{
		getPromos: function(keyword, cb){
			setTimeout(function(){
				cb(error,results);
			},1500);
		}
	}
}

function mockSearch(error, results){
	return{
		getResults: function(keyword, cb){
			setTimeout(function(){
				cb(error,results);
			},1500);
		}
	}
}