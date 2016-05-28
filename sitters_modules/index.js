'use strict';

var EventEmitter = require('events').EventEmitter,
    express = require('express'),
    eventsConfig = require('./config').events,
    _ = require('lodash'),
    moment = require('moment'),
    resultJSON = null,auth = false,temp,length,result = null;

class Sitters extends EventEmitter {
    constructor(parentsData,sittersData) {
        super();
        //this.json = null;
        this.dataParents = parentsData;
        this.dataSitters = sittersData;

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

        this.on(eventsConfig.GETPARENTBYEMAIL,function(parentEmail){
            resultJSON = _.find(this.dataParents,function(parent){
                return parent.email == parentEmail;
            });
            if ( resultJSON == null){
                resultJSON = {'Error' : 'Parent does no exist'};
            }
        });
        
        this.on(eventsConfig.GETCHILDESBYEMAIL,function(parentEmail) {
            result = null;
            result = _.find(this.dataParents, function (parent) {
                return parent.email == parentEmail;
            });
            if (result == null)
                result = {'Error': 'Parent does no exist'};
            else
                this.result = result.childes;
        });

        this.on(eventsConfig.GETCHILDESBYNAME,function(parentName){
            result = null;
            result = _.find(this.dataParents, function (parent) {
                return parent.name == parentName;
            });
            if (result == null)
                result = {'Error': 'Parent does no exist'};
            else
                this.result = result.childes;
        });

        this.on(eventsConfig.GETSITTERBYEMAIL,function(sitterEmail){
            resultJSON = _.find(this.dataSitters,function(sitter){
                return sitter.email == sitterEmail;
            });
            if (resultJSON == null){
                resultJSON = {'Error' : 'Sitter does no exist'};
            }
        });

        this.on(eventsConfig.GETSITTERSBYNAME,function(sitterName){
            resultJSON = _.find(this.dataSitters,function(sitter){
                return sitter.name == sitterName;
            });
            if (resultJSON == null){
                resultJSON = {'Error' : 'Sitter does no exist'};
            }
        });

        this.on(eventsConfig.GETTOPRATEDSITTERS,function(){
            resultJSON = this.dataSitters;
            resultJSON.sort(function(a, b){
                return a.rating - b.rating;
            });

        });

        this.on(eventsConfig.GETSITTERBYGENDER,function(gender){

            resultJSON = _.pickBy(this.dataSitters, function(sitter) {
                return sitter.gender == gender;
            });
            if(resultJSON == null) {
                resultJSON = {'Error' :'Sitter does not exist'};
            }

        });

        this.on(eventsConfig.INSERTPARENT,function(parent){
            this.dataParents[this.dataParents.length + 1] = parent;
            if (parent != null )
                resultJSON = {'status' : 'true'};
            else
                resultJSON  = {'status' : 'false'};
        });

        this.on(eventsConfig.UPDATEPARENT, function(parent){
            var index = -1 ;
            index = _.findIndex(this.dataParents, function(res) { return res.email == parent.email; });
            if(index != -1){
                this.dataParents[index] = parent;
                resultJSON = {'Success' : 'updated'};
            }
           else {
                resultJSON = {'Error' : 'parent not found'};
            }
        });

        this.on(eventsConfig.DELETEPARENT, function(parent) {
            var data = _.remove(this.dataParents, function (n) {
                return n.email != parent.email;
            });
            this.dataParents = data;
            resultJSON = {'status' : 'true'};
        });

        this.on(eventsConfig.INSERTSITTER,function(sitter){
            this.dataSitters[this.dataSitters.length + 1] = sitter;
            if (sitter != null )
                resultJSON = {'status' : 'true'};
            else
                resultJSON  = {'status' : 'false'};
        });

        this.on(eventsConfig.UPDATESITTER, function(sitter){ // :TODO: update just the keys in the json
            var index = -1 ;
            index = _.findIndex(this.dataSitters, function(res) { return res.email == sitter.email; });
            if(index != -1){
                this.dataSitters[index] = sitter;
                resultJSON = {'Success' : 'updated'};
            }
            else {
                resultJSON = {'Error' : 'parent not found'};
            }
        });

        this.on(eventsConfig.DELETESITTER, function(sitter) {
            var data = _.remove(this.dataSitters, function (n) {
                return n.email != sitter.email;
            });
            this.dataSitters = data;
            resultJSON = {'status' : 'true'};
        });

        this.on(eventsConfig.UPDATESITTERRATING, function(sitterEmail) { // TODO: call it every time we insert review
            var tempSitter =  _.find(this.dataSitters,function(sitter){
                return sitter.email == sitterEmail;
            });

            var average = _.round(_.meanBy(tempSitter.reviews, function(o) { return o.rating; }),1);
            console.log(average);
        });

        this.on(eventsConfig.GETTOPRATEDSITTERS, function(){
            resultJSON = _.reverse(_.sortBy(this.dataSitters, function(obj) { return obj.rating; }));

            if(resultJSON == null) {
                resultJSON = {'Error' :'Siters does not exist'};
            }
        });

        this.on(eventsConfig.GETAVAILABLENOWSITTERS, function(){
            var time = moment().hour();
            var workingHours;
            workingHours = time >= 6 && time <= 14?"Mornings":"Evenings";

            var workingHoursSitter = _.find(this.dataSitters,function(sitter) {
                return sitter.workingHours == workingHours;
            });
            var workingHoursAllDay = _.find(this.dataSitters,function(sitter){
                return sitter.workingHours == "All day";
            });

            // concat merge 2 arrays into 1, and uniq make only unique jsons, in case that sitter work all day + evenings/mornings
            resultJSON = _.uniq(_.concat(workingHoursSitter,workingHoursAllDay));
            if (resultJSON == null){
                resultJSON = {'status' : 'false'};
            }
        });
        this.on(eventsConfig.GETSITTERSBYWORKINGHOURS, function(workingHours){
            resultJSON = _.find(this.dataSitters,function(sitter) {
                return sitter.workingHours == workingHours;
            });
            if(resultJSON == null) {
                resultJSON = {'Error' :'Sitter does not exist'};
            }
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
        return this.result; // TODO: take care if resultJSON is null
    }
    getChildesByName(name){
        this.emit(eventsConfig.GETCHILDESBYNAME,name);
        return this.result; // TODO: take care if resultJSON is null
    }
    getAllSitters(){
        return this.dataSitters;
    }

    getSitterByEmail(email){
        this.emit(eventsConfig.GETSITTERBYEMAIL,email);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getSitterByName(name){
        this.emit(eventsConfig.GETSITTERSBYNAME,name);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    
    getTopRatedSitters(){
        this.emit(eventsConfig.GETTOPRATEDSITTERS);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getAvailableNowSitters() {
        this.emit(eventsConfig.GETAVAILABLENOWSITTERS);
        return resultJSON;
    }

    getSittersByWorkingHours(workingHours){
        this.emit(eventsConfig.GETSITTERSBYWORKINGHOURS,workingHours);
        return resultJSON;
    }

    updateSitterRating(email){
        this.emit(eventsConfig.UPDATESITTERRATING, email);
    }
    getSitterByGender(gender){
        this.emit(eventsConfig.GETSITTERBYGENDER,gender);
        return resultJSON;
    }
    
    
    insertParent(parent) {
        this.emit(eventsConfig.INSERTPARENT, parent);
        return resultJSON;
    }
    updateParent(parent){
        this.emit(eventsConfig.UPDATEPARENT,parent);
        return resultJSON;
    }

    deleteParent(parent){
        this.emit(eventsConfig.DELETEPARENT,parent);
        return resultJSON;
    }
    insertSitter(sitter){
        this.emit(eventsConfig.INSERTSITTER,sitter);
        return {'status' : 'ok'};
    }
    updateSitter(sitter){
        this.emit(eventsConfig.UPDATESITTER, sitter);
        return resultJSON;
    }
    deleteSitter(sitter){
        this.emit(eventsConfig.DELETESITTER, sitter);
        return resultJSON;
    }

    getLastBookedSitters(){

    }
    getParentFavoriteSitters(){

    }
    
    getInvitesBySitterEmail(email){

    }

    getInvitesByParentEmail(email){

    }

    updateStatusById(uuid){
        //TODO : update in sitters + parents
    }

    getReviewByEmail(email){

    }
    
    insertInvite(email,email1){ // TODO : think later of params
        //TODO : insert to sitters + parents
        //TODO : call inner function to update rating of a sitter + send it to mongo
    }

    updateInvite(){
        //TODO : update in sitters + parents
    }

    insertReview(){
        //TODO : insert to sitters + parents
    }

    updateReview(){
        //TODO : update in sitters + parents
    }

    deleteReview(){

    }

    getReviewByEmail(){

    }
}
module.exports = Sitters;











