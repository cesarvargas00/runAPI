var express = require('express');
var router = express.Router();
var util = require('../utils');
var fs = require('fs');
var mkdirp = require('mkdirp');

/* GET home page. */
router.post('/run', function(req, res) {
    var fakeData = {
        solution: {
            java: 'public class Solution{ public String sayHello(){ return "HELLO!";}}',
            cpp: ""
        },
        run: {
            java: 'public class Run{ public static void main(String[] args) {Solution s = new Solution();System.out.println(s.sayHello());Result.run(5,4,20);}}',
            cpp: ""
        }
    };




    var folder = util.makeUniqueFolderName();
    mkdirp('programs/' + folder, function(err) {
        if (!err) {
            fs.writeFile('programs/' + folder + '/' + 'Solution.java', req.body.solution.java, function() {
                fs.writeFile('programs/' + folder + '/' + 'Run.java', req.body.run.java, function() {
                    var sys = require('sys');
                    var exec = require('child_process').exec;


                    function puts(error, stdout, stderr) {
                        var newStdout = stdout.split('<<RESULT>>');
                        // sys.puts(stdout);
                        //remove folder
                        res.json({
                            result: util.parseResultRunMethod(stdout),
                            stdout: newStdout[0],
                            stderr: stderr,
                            error: error
                        });
                    };
                    var execString = 'sudo docker run -v /home/ec2-user/runAPI/programs:/data/ dockerfile/java /bin/bash execJava.sh ' + folder;
                    exec(execString, puts);
                    //run docker
                    //return object
                });
            });
        }
    });



});

module.exports = router;
