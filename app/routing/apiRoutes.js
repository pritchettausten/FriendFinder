var friendData = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res){

        var userData = req.body;
        //console.log(userData);

        var userScores = userData["scores[]"]
        //console.log(userData["scores[]"]);

        var matchName = '';
		var matchImage = '';
        var totalDifference = 10000
        
        for (var i = 0; i < friendData.length; i++) {
			
			var diff = 0;
            var friendScores = (friendData[i]["scores[]"]);
            
			for (var j = 0; j < userScores.length; j++) {
				diff += Math.abs(friendScores[j] - userScores[j]);
            }
            
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friendData[i].name);
				// console.log('Friend image = ' + friendData[i].photo);

				totalDifference = diff;
				matchName = friendData[i].name;
				matchImage = friendData[i].photo;
			}
		}
        
        friendData.push(userData);

        res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
    });
};

