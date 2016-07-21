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

        this.on(eventsConfig.GET_PARENT_BY_EMAIL,function(parentEmail){
            resultJSON = _.find(_.compact(this.dataParents),function(parent){
                return parent.email == parentEmail;
            });
            if ( resultJSON == null){
                resultJSON = {'Error' : 'Parent does no exist'};
            }
        });
        
        this.on(eventsConfig.GET_CHILD_BY_EMAIL,function(parentEmail) {
            result = null;
            result = _.filter(this.dataParents, function (parent) {
                return parent.email == parentEmail;
            });
            if (result == null)
                result = {'Error': 'Parent does no exist'};
        });

        this.on(eventsConfig.GET_CHILD_BY_NAME,function(parentName){
            result = null;
            result = _.filter(this.dataParents, function (parent) {
                return parent.name == parentName;
            });
            if (result == null)
                result = {'Error': 'Parent does no exist'};
        });

        this.on(eventsConfig.GET_SITTER_BY_EMAIL,function(sitterEmail){
            resultJSON = _.find(this.dataSitters,function(sitter){
                return sitter.email == sitterEmail;
            });
            if (resultJSON == null){
                resultJSON = {'Error' : 'Sitter does no exist'};
            }
        });

        this.on(eventsConfig.GET_SITTERS_BY_NAME,function(sitterName){
            resultJSON = _.find(this.dataSitters,function(sitter){
                return sitter.name == sitterName;
            });
            if (resultJSON == null){
                resultJSON = {'Error' : 'Sitter does no exist'};
            }
        });

        this.on(eventsConfig.GET_SITTERS_BY_GENDER,function(gender){
            resultJSON = _.filter(this.dataSitters, function(obj) { return obj.gender == gender; });
            if(resultJSON == null) {
                resultJSON = {'Error' :'Sitter does not exist'};
            }
        });

        this.on(eventsConfig.INSERT_PARENT,function(parent){
            this.dataParents[this.dataParents.length] = parent;
            if (parent != null )
                resultJSON = {'status' : 'true'};
            else
                resultJSON  = {'status' : 'false'};
        });

        this.on(eventsConfig.UPDATE_PARENT, function(parent){ // TODO: update only fields in json and not all
            var index = -1 ;
            index = _.findIndex(this.dataParents, function(res) { return res.email == parent.email; });
            if(index != -1){
                if(this.dataParents[index].invites != null)
                    parent.invites = this.dataParents[index].invites;
                this.dataParents[index] = parent;
                resultJSON = {'Success' : 'updated'};
            }
           else {
                resultJSON = {'Error' : 'parent not found'};
            }
        });

        this.on(eventsConfig.DELETE_PARENT, function(parent) {
            var data = _.remove(this.dataParents, function (n) {
                return n.email != parent.email;
            });
            this.dataParents = data;
            resultJSON = {'status' : 'true'};
        });

        this.on(eventsConfig.INSERT_SITTER,function(sitter){
            this.dataSitters[this.dataSitters.length] = sitter;
            if (sitter != null )
                resultJSON = {'status' : 'true'};
            else
                resultJSON  = {'status' : 'false'};
        });

        this.on(eventsConfig.UPDATE_SITTER, function(sitter){ //  TODO: update only fields in json and not all
            var index = -1 ;
            index = _.findIndex(this.dataSitters, function(res) { return res.email == sitter.email; });
            if(index != -1){
                if(this.dataSitters[index].invites != null)
                    sitter.invites = this.dataSitters[index].invites;
                if(this.dataSitters[index].reviews != null)
                    sitter.reviews = this.dataSitters[index].reviews;
                this.dataSitters[index] = sitter;
                resultJSON = {'Success' : 'updated'};
            }
            else {
                resultJSON = {'Error' : 'parent not found'};
            }
        });

        this.on(eventsConfig.DELETE_SITTER, function(sitter) {
            var data = _.remove(this.dataSitters, function (n) {
                return n.email != sitter.email;
            });
            this.dataSitters = data;
            resultJSON = {'status' : 'true'};
        });

        this.on(eventsConfig.UPDATE_SITTER_RATING, function(review) { // TODO: check why it fails when insert review
            var tempSitter =  _.find(this.dataSitters,function(sitter){
                return sitter.email == review.sitterEmail;
            });
            resultJSON = _.round(_.meanBy(tempSitter.reviews, function(o) { return o.rating; }),1);
            if(resultJSON == null){
                resultJSON = 0;
            }
            var  indexSitter = _.findIndex(this.dataSitters, function(res) { return res.email == review.sitterEmail; });
            this.dataSitters[indexSitter].rating = resultJSON;
            resultJSON = {'status' : 'updated',
                          'rating' :resultJSON };
        });

        this.on(eventsConfig.GET_TOP_RATED_SITTERS, function(){
            resultJSON = _.reverse(_.sortBy(this.dataSitters, function(obj) { return obj.rating; }));

            if(resultJSON == null) {
                resultJSON = {'Error' :'Siters does not exist'};
            }
            else
                resultJSON = _.compact(resultJSON);
        });

        this.on(eventsConfig.GET_AVAILABLE_NOW_SITTERS, function(){
            var time = moment().hour();
            var workingHours;
            workingHours = time >= 6 && time <= 14?"Mornings":"Evenings";


            var workingHoursSitter = _.filter(this.dataSitters,function(sitter) {
                return sitter.workingHours == workingHours;
            });

            var workingHoursAllDay = _.filter(this.dataSitters,function(sitter){
                return sitter.workingHours == "All day";
            });

            // concat merge 2 arrays into 1, and uniq make only unique jsons, in case that sitter work all day + evenings/mornings
            resultJSON = _.compact(_.uniq(_.concat(workingHoursSitter,workingHoursAllDay)));
            if (resultJSON == null){
                resultJSON = {'status' : 'false'};
            }
        });
        this.on(eventsConfig.GET_SITTERS_BY_WORKING_HOURS, function(workingHours){
            resultJSON = _.filter(this.dataSitters,function(sitter) {
                return sitter.workingHours == workingHours;
            });
            if(resultJSON == null) {
                resultJSON = {'Error' :'Sitter does not exist'};
            }
            else
                resultJSON = _.compact(resultJSON);
        });

        this.on(eventsConfig.GET_SITTERS_BY_RATING, function(rating) {
            resultJSON = _.filter(this.dataSitters, function (sitter) {
                return sitter.rating >= rating;
            });
            if (resultJSON == null) {
                resultJSON = {'Error': 'Sitter does not exist'};
            }
        });

        this.on(eventsConfig.INSERT_INVITE, function(invite){
            var  indexSitter = _.findIndex(this.dataSitters, function(res) { return res.email == invite.sitterEmail; });
            this.dataSitters[indexSitter].invites.push(invite);
            var  indexParent = _.findIndex(this.dataParents, function(res) { return res.email == invite.parentEmail; });
            this.dataParents[indexParent].invites.push(invite);
            resultJSON = {'status':'ok'};
        });

        this.on(eventsConfig.INSERT_REVIEW, function(review){
            var  indexSitter = _.findIndex(this.dataSitters, function(res) { return res.email == review.sitterEmail; });
            this.dataSitters[indexSitter].reviews.push(review);
            resultJSON = {'status':'ok'};
        });

        this.on(eventsConfig.GET_PARENT_FAVORITE_SITTERS, function(parent){
            var temp = _.find(this.dataParents,function(parentRes){
                return parentRes.email == parent.email;
            });
            temp = _.uniqBy(temp.invites,'sitterEmail'); // unique invites by sitterEmail
            temp = _.map(temp, 'sitterEmail'); // set array of unique sitters email
            resultJSON =  _.filter(this.dataSitters, item => _.includes(temp, item.email)); // get data of sitter by unique emails
            if (resultJSON != null)
                resultJSON = _.compact(resultJSON);
        });

        this.on(eventsConfig.GET_INVITES_BY_SITTER_EMAIL, function(sitterEmail){
            var temp;
            temp = _.pickBy(this.dataSitters, function(sitter) {
                return sitter.email == sitterEmail;
            });
            console.log(temp);
            temp = temp[Object.keys(temp)[0]];

            if (temp != null){
                temp = temp.invites;
                resultJSON = _.compact(temp);
            }
            else
                resultJSON = {'error' : 'invites not founds'}
        });

        this.on(eventsConfig.GET_INVITES_BY_PARENT_EMAIL, function(parentEmail){
            var temp;
            temp = _.pickBy(this.dataParents, function(parent) {
                return parent.email == parentEmail;
            });
            temp = temp[Object.keys(temp)[0]];
            if (temp != null){
                temp = temp.invites;
                resultJSON = _.compact(temp);
            }
            else
                resultJSON = {'error' : 'invites not founds'}
        });

        this.on(eventsConfig.GET_REVIEWS_BY_SITTER_EMAIL, function(sitterEmail){
            var temp;
            temp = _.pickBy(this.dataSitters, function(sitter) {
                return sitter.email == sitterEmail;
            });
            temp = temp[Object.keys(temp)[0]];
            if (temp != null){
                temp = temp.reviews;
                resultJSON = _.compact(temp);
            }
            else
                resultJSON = {'error' : 'reviews not founds'}
        });

        this.on(eventsConfig.GET_FIRST_CHILD, function(parentEmail){
            resultJSON = null;
            resultJSON = _.find(this.dataParents, function (parent) {
                return parent.email == parentEmail;
            });
            if (resultJSON == null)
                resultJSON = {'Error': 'Parent does no exist'};
            else
                resultJSON = resultJSON.childes[0];
        });

        this.on(eventsConfig.UPDATE_INVITE, function(invite){
            var parentIndex = _.findIndex(this.dataParents, function(res) { return res.email == invite.parentEmail; });
            if(parentIndex != null ){
                var inviteIndex = _.findIndex(this.dataParents[parentIndex].invites, function(res) { return res.uuid == invite.uuid; });
                if(inviteIndex != null){
                    this.dataParents[parentIndex].invites[inviteIndex] = invite;
                }
            }

            var sitterIndex = _.findIndex(this.dataSitters, function(res) { return res.email == invite.sitterEmail; });
            if(sitterIndex != null ){
                var inviteIndex = _.findIndex(this.dataSitters[sitterIndex].invites, function(res) { return res.uuid == invite.uuid; });
                if(inviteIndex != null){
                    this.dataSitters[sitterIndex].invites[inviteIndex] = invite;
                    resultJSON = {'status' : "success"};
                }
            }
            else
                resultJSON = {'status' : "failed"};
        });

        this.on(eventsConfig.UPDATE_REVIEW, function(review){
            var sitterIndex = _.findIndex(this.dataSitters, function(res) { return res.email == review.sitterEmail; });

            if(sitterIndex != null ){
                var inviteIndex = _.findIndex(this.dataSitters[sitterIndex].reviews, function(res) { return res.uuid == review.uuid; });
                if(inviteIndex != null){
                    this.dataSitters[sitterIndex].reviews[inviteIndex] = review;
                    console.log(this.dataSitters[sitterIndex].reviews[inviteIndex]);
                    resultJSON = {'status' : "success"};
                } 
            }
            else
                resultJSON = {'status' : "failed"};
        });
    }

    authByEmail(email,pass){
        this.emit(eventsConfig.AUTH_BY_EMAIL,email,pass);
        return auth;
    }

    getAllParents(){
        return this.dataParents;
    }

    getParentByEmail(email){
        this.emit(eventsConfig.GET_PARENT_BY_EMAIL,email);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getChildesByEmail(email){
        this.emit(eventsConfig.GET_CHILD_BY_EMAIL,email);
        return this.result; // TODO: take care if resultJSON is null
    }
    getChildesByName(name){
        this.emit(eventsConfig.GET_CHILD_BY_NAME,name);
        return this.result; // TODO: take care if resultJSON is null
    }
    getAllSitters(){
        return this.dataSitters;
    }

    getSitterByEmail(email){
        this.emit(eventsConfig.GET_SITTER_BY_EMAIL,email);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getSitterByName(name){
        this.emit(eventsConfig.GET_SITTERS_BY_NAME,name);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    
    getTopRatedSitters(){
        this.emit(eventsConfig.GET_TOP_RATED_SITTERS);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    getAvailableNowSitters() {
        this.emit(eventsConfig.GET_AVAILABLE_NOW_SITTERS);
        return resultJSON;
    }

    getSittersByWorkingHours(workingHours){
        this.emit(eventsConfig.GET_SITTERS_BY_WORKING_HOURS,workingHours);
        return resultJSON;
    }

    updateSitterRating(email){
        this.emit(eventsConfig.UPDATE_SITTER_RATING, email);
    }
    getSittersByGender(gender){
        this.emit(eventsConfig.GET_SITTERS_BY_GENDER,gender);
        return resultJSON;
    }
    
    getSittersByRating(rating){
        this.emit(eventsConfig.GET_SITTERS_BY_RATING,rating);
        return resultJSON;
    }

    insertParent(parent) {
        this.emit(eventsConfig.INSERT_PARENT, parent);
        return resultJSON;
    }
    updateParent(parent){
        this.emit(eventsConfig.UPDATE_PARENT,parent);
        return resultJSON;
    }

    deleteParent(parent){
        this.emit(eventsConfig.DELETE_PARENT,parent);
        return resultJSON;
    }
    insertSitter(sitter){
        this.emit(eventsConfig.INSERT_SITTER,sitter);
        return {'status' : 'ok'};
    }
    updateSitter(sitter){
        this.emit(eventsConfig.UPDATE_SITTER, sitter);
        return resultJSON;
    }
    deleteSitter(sitter){
        this.emit(eventsConfig.DELETE_SITTER, sitter);
        return resultJSON;
    }

    getLastBookedSitters(){
        // TODO: not implemented yet - will be an option
    }

    getParentFavoriteSitters(parent){
        this.emit(eventsConfig.GET_PARENT_FAVORITE_SITTERS,parent);
        return resultJSON;
    }
    
    getInvitesBySitterEmail(sitter){
        this.emit(eventsConfig.GET_INVITES_BY_SITTER_EMAIL,sitter);
        return resultJSON;
    }

    getInvitesByParentEmail(parent){
        this.emit(eventsConfig.GET_INVITES_BY_PARENT_EMAIL,parent);
        return resultJSON;
    }
    
    getReviewsBySitterEmail(email){
        this.emit(eventsConfig.GET_REVIEWS_BY_SITTER_EMAIL,email);
        return resultJSON; // TODO: take care if resultJSON is null
    }
    
    insertInvite(invite){ 
        this.emit(eventsConfig.INSERT_INVITE,invite);
        return resultJSON;
    }

    updateInvite(invite){
        this.emit(eventsConfig.UPDATE_INVITE,invite);
        return resultJSON;
    }
    getFirstChild(email){
        this.emit(eventsConfig.GET_FIRST_CHILD,email);
        return resultJSON;
    }

    insertReview(review){
        this.emit(eventsConfig.INSERT_REVIEW,review);
        this.emit(eventsConfig.UPDATE_SITTER_RATING,review);  // update rating in local DB
        //TODO : call inner function to update rating of a sitter + send it to mongo
        return resultJSON;  // send the new rating to update in mongoDB
    }

    updateReview(review){
        this.emit(eventsConfig.UPDATE_REVIEW,review);
        return resultJSON;
    }
}
module.exports = Sitters;











