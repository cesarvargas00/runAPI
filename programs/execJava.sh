#!/bin/bash
cd /data/ && cp Result.class $1/ && cd $1 && javac *.java && java Run && cd .. && rm -rf $1
