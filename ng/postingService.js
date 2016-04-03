ngApp.service('postingService', function ($http) {
    this.postingFetch = function () {
        return $http.get('/api/postings');
    };
    this.postingPost = function(post){
	return $http.post('/api/postings', post)
    }
    this.fetchSinglePosting = function(id){
	return $http.get('/api/postings/' + id) 
    }

});
