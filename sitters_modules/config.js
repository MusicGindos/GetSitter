'use strict';

module.exports = {
    events: {
        AUTHBYEMAIL : 'authByEmail',

        //Parents
        //GET
        GETALLPARENTS : 'getAllParents',
        GETPARENTBYEMAIL : 'getParentByEmail',
        GETCHILDESBYEMAIL : 'getChildesByEmail',
        GETCHILDESBYNAME : 'getChildesByName',

        //Sitters
        //GET
        GETALLSITTERS : 'getAllSitters',
        GETSITTERBYEMAIL: 'getSitterByEmail',
        GETSITTERSBYNAME : 'getSittersByName',

        //SET + INSERT

        //Sitters sorting - GET
        GETTOPRATEDSITTERS : 'getTopRatedSitters',
        GETAVAILABLENOWSITTERS : 'getAvailableNowSitters',
        GETSITTERSBYWORKINGHOURS : 'getSittersByWorkingHours',
        GETSITTERSBYGENDER : 'getSittersByGender',
        GETLASTBOOKEDSITTERS : 'getLastBookedSitters',
        GETPARENTFAVORITESSITTERS : 'getParentFavoriteSitters',

        //SET + INSERT


        //Invites
        GETINVITEBYSITTEREMAIL : 'getInviteByEmail',

        //SET + INSERT
        UPDATESTATUSBYID : 'updateStatusById',


        //Reviews
        //GET
        GETREVIEWBYEMAIL : 'getReviewByEmail',  // sitter email

        //SET + INSERT
        ADDNEWREVIEW : 'addNewReview'
    }
};