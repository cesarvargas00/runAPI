var express = require('express');
var router = express.Router();
var util = require('../utils');
var fs = require('fs');
var mkdirp = require('mkdirp');

/* GET home page. */
router.post('/run', function(req, res) {
    var folder = util.makeUniqueFolderName();
    mkdirp('programs/' + folder, function(err) {
        if (!err) {
            fs.writeFile('programs/' + folder + '/' + 'Solution.java', req.body.solution.java, function() {
                fs.writeFile('programs/' + folder + '/' + 'Run.java', req.body.run.java, function() {
                    var sys = require('sys');
                    var exec = require('child_process').exec;


                    function puts(error, stdout, stderr) {
			var result = null;
			var newStdout = [stdout];
			if(typeof stdout !== 'undefined'){	
                        	result = util.parseResultRunMethod(stdout);
				if (result){	
                        		newStdout = stdout.split('<<RESULT>>');
				}
			}
                        res.json({
                            result: result,
                            stdout: newStdout[0],
                            stderr: stderr,
                            error: error
                        });
                    };
                    var execString = 'sudo docker run -v /home/ec2-user/runAPI/programs:/data/ java /bin/bash /data/execJava.sh ' + folder;
                    exec(execString, puts);
                    //run docker
                    //return object
                });
            });
        }
    });



});

module.exports = router;
