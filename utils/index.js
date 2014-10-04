var folderList = [];


module.exports = {
    getValidCodeArray: function(input) {
        var result = [];
        for (var key in input.solution) {
            if (input.solution.hasOwnProperty(key)) {
                if (input.solution[key].length !== 0 && input.run[key].length !== 0) {
                    result.push(key);
                }
            }
        }
        return result;
    },
    makeUniqueFolderName: function() {
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "_" + S4() + "_" + S4() + "_" + S4() + "_" + S4() + S4() + S4());
    },
    parseResultRunMethod: function(stdout) {
	var splittedStdout = stdout.split('<<RESULT>>');
	if (splittedStdout.length === 1){
		return null;
	}
        var resultArray = splittedStdout[1].split(':');
        return {
            numberOfTests: resultArray[0],
            testsPassed: resultArray[1],
            score: resultArray[2]
        };
    }
};
