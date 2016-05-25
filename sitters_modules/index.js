'use strict';

var EventEmitter = require('events').EventEmitter,
    express = require('express'),
    eventsConfig = require('./config').events,
    resultJSON = null,auth = false,temp,length;

class Sitters extends EventEmitter {
    constructor(parentsData,sittersData,invitesData,usersData) {
        super();
        //this.json = null;
        this.dataParents = parentsData;
        this.dataSitters = sittersData;
        this.dataInvites = invitesData;
        this.dataUsers = usersData;

        this.on(eventsConfig.GETALL, function() {
            console.log(this.dataParents);
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


        this.on(eventsConfig.AUTHBYEMAIL,function(email,pass){
            auth = false;
            if (this.dataUsers != null){
                temp = this.dataUsers;
                for(var i = 0,length = this.dataUsers.length; i < length;i++){
                    if(temp[i].email == email && temp[i].pass == pass)
                    {
                        auth = true;
                        break;
                    }
                }
            }
        });

        this.on(eventsConfig.GETPARENTBYEMAIL,function(email){
            resultJSON = null;
            temp = this.dataParents;

            if(this.dataParents != null){
                for(var i = 0,length = this.dataParents.length; i < length;i++){
                    if(temp[i].email == email)
                    {
                        resultJSON = temp[i];
                        break;
                    }
                }
            }
        });

        this.on(eventsConfig.GETCHILDESBYEMAIL,function(email){
            resultJSON = null;
            temp = this.dataParents;

            if(this.dataParents != null){
                for(var i = 0,length = this.dataParents.length; i < length;i++){
                    if(temp[i].email == email)
                    {
                        resultJSON = temp[i].childes;
                        break;
                    }
                }
            }
        });

        this.on(eventsConfig.GETCHILDESBYNAME,function(name){
            resultJSON = null;
            temp = this.dataParents;

            if(this.dataParents != null){
                for(var i = 0,length = this.dataParents.length; i < length;i++){
                    if(temp[i].name == name)
                    {
                        resultJSON = temp[i].childes;
                        break;
                    }
                }
            }
        });

        this.on(eventsConfig.GETSITTERBYEMAIL,function(email){
            resultJSON = null;
            temp = this.dataSitters;

            if(this.dataParents != null){
                for(var i = 0,length = this.dataSitters.length; i < length;i++){
                    if(temp[i].email == email)
                    {
                        resultJSON = temp[i];
                        break;
                    }
                }
            }
        });

        this.on(eventsConfig.GETSITTERSBYNAME,function(name){
            resultJSON = null;
            temp = this.dataSitters;
            if(this.dataSitters != null){
                for(var i = 0,length = this.dataSitters.length; i < length;i++){
                    if(temp[i].name == name)
                    {
                        resultJSON = temp[i];
                        break;
                    }
                }
            }
        });

        this.on(eventsConfig.GETTOPRATEDSITTERS,function(){
            resultJSON = this.dataSitters;
            resultJSON.sort(function(a, b){
                return a.rating - b.rating;
            });

        });

        this.on(eventsConfig.GETSITTERSBYGENDER,function(gender){
            temp = this.dataSitters;
            var tempArray = [];
            for(var i = 0,k = 0,length = this.dataSitters.length; i < length ; i++){
                if(temp[i].gender == gender){
                    tempArray[k++] = temp[i];
                }
            }
            resultJSON = tempArray;
        });

        this.on(eventsConfig.INSERTPARENT,function(parent){
            this.dataParents[this.dataParents.length + 1] = parent;
            resultJSON = {'status' : 'ok'};
           /*for(var i = 0,length = this.dataParents.length; i < length; i++) {
               if(this.dataParents[i].email == parent.email){

               }
           }*/
        });
    }

    authByEmail(email,pass){
        this.emit(eventsConfig.AUTHBYEMAIL,email,pass);
        return auth;
    }
    getAllParents(){
        return this.dataParents;
    }
    getParentByEmail(email){
        this.emit(eventsConfig.GETPARENTBYEMAIL,email);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getChildesByEmail(email){
        this.emit(eventsConfig.GETCHILDESBYEMAIL,email);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getChildesByName(name){
        this.emit(eventsConfig.GETCHILDESBYNAME,name);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getAllSitters(){
        return this.dataSitters;
    }
    getSitterByEmail(email){
        this.emit(eventsConfig.GETSITTERBYEMAIL,email);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getSittersByName(name){
        this.emit(eventsConfig.GETSITTERSBYNAME,name);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getTopRatedSitters(){
        this.emit(eventsConfig.GETTOPRATEDSITTERS);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getAvailableNowSitters(time){

    }
    getSittersByWorkingHours(){

    }
    getSittersByGender(gender){
        this.emit(eventsConfig.GETSITTERSBYGENDER,gender);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getLastBookedSitters(){

    }
    getParentFavoriteSitters(){

    }
    getInviteByEmail(email){

    }
    updateStatusById(id){

    }
    getReviewByEmail(email){

    }
    addNewReview(review){

    }
    insertParent(parent){
        this.emit(eventsConfig.INSERTPARENT,parent);
        return {'status' : 'ok'};
    }
    updateParent(parent){

    }
    deleteParent(parent){

    }
    insertSitter(sitter){
        this.emit(eventsConfig.INSERTSITTER,sitter);
        return {'status' : 'ok'};
    }
    updateSitter(sitter){

    }
    deleteSitter(sitter){

    }
    insertUser(user){
        this.emit(eventsConfig.INSERTUSER,user);
        return {'status' : 'ok'};
    }
    updateUser(user){

    }
    deleteUser(user){

    }


    
}
module.exports = Sitters;











