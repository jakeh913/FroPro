ngApp.service('postingService', function ($http, authentication) {
    this.postingFetch = function () {
        return $http.get('/api/postings');
    };
    this.postingPost = function(post){
	return $http.post('/api/postings', post)
    }
    this.fetchSinglePosting = function(id){
	return $http.get('/api/postings/' + id) 
    }
    this.publicPostingPost = function(post){
	return $http.post('/authAPI/finalPostings', 
	    {
		headers: {
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9' 
        }

	    }
	)
    };
    this.finalPostingFetch = function () {
        return $http.get('/authAPI/finalPostings');
    };


});
