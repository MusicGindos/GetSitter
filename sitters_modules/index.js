'use strict';

var EventEmitter = require('events').EventEmitter,
    express = require('express'),
    eventsConfig = require('./config').events;

class Sitters extends EventEmitter {
    constructor(sittersData) {
        super();
        this.json = null;
        this.data = sittersData;

        // will send all the json
        this.on(eventsConfig.GETALL, function() {
            if (this.data == null){
                this.data = sittersData;
            }
        });

        // will run in a loop and search for id and return a json
        this.on(eventsConfig.GETSTUDENT, function(id) {
            var jsonStud = null;
            this.data.forEach(function(entry) {
                if(entry.studentId == id){
                    jsonStud = entry;
                }
            });
            if (jsonStud == null){
                jsonStud = {'Error': 'Wrong Id',
                    'status':false,
                    'ShowAll': 'to see the list of students => path: getAllStudentsGrades'};
            }
            this.json = jsonStud;
        });

        //will return the best or worst student by the year
        this.on(eventsConfig.GETEXCELLENCWORSTESTUDENT, function(year,FlagWorstExcell) {
            var jsonGrades = this.data;
            var jsonStudent = null;
            var jsonGradesLen = jsonGrades.length;
            for(var i = 0;i<jsonGradesLen;i++){
                if(jsonGrades[i].bestYear == year){
                    if(jsonStudent == null){
                        jsonStudent = jsonGrades[i];
                    }
                    if(FlagWorstExcell == "excellence"){
                        if(jsonStudent != null &&   // if we got already student in the year, will compare the grade
                            jsonStudent.studentAverageGrades<jsonGrades[i].studentAverageGrades){
                            jsonStudent = jsonGrades[i];
                        }
                    }

                    else if(FlagWorstExcell == "worst"){
                        if(jsonStudent != null &&   // if we got already student in the year, will compare the grade
                            jsonStudent.studentAverageGrades>jsonGrades[i].studentAverageGrades){
                            jsonStudent = jsonGrades[i];
                        }
                    }
                }
            }
            this.json = jsonStudent;
            if(jsonStudent==null){ // if we didnt find any students in the year
                this.json = {'Error':'cant find any students in year: ' +year,'status':false};
            }
        });
    }

    getAllStudentsGrades() {
        this.emit(eventsConfig.GETALL);
        console.log('\n---------------------List Of Students---------------------\n\n'+this.data);
        return this.data;
    }

    getStudGradeById(id) {
        this.emit(eventsConfig.GETSTUDENT,id);
        if(this.data.status == false)
            console.log('\n---------------------Student with id:'+ id +' JSON---------------------\n\n'+this.json);
        return this.json;
    }

    getExcellenceByYear(year) {
        this.emit(eventsConfig.GETEXCELLENCWORSTESTUDENT,year,"excellence");
        if(this.data.status == false)
            console.log('\n---------------------Best student in year:'+ year +' JSON---------------------\n\n'+this.json);
        return this.json;
    }

    getWorstAverageByYear(year){
        this.emit(eventsConfig.GETEXCELLENCWORSTESTUDENT,year,"worst");
        if(this.data.status != false)
            console.log('\n---------------------Worst student in year:'+ year +' JSON---------------------\n\n'+this.json);
        return this.json;
    }
}
module.exports = Sitters;











