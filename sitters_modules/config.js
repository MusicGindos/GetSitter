'use strict';

module.exports = {
    events: {
        AUTHBYEMAIL : 'authByEmail',

        //------------------------Parents---------------------------------
        //GET
        GETALLPARENTS : 'getAllParents',
        GETPARENTBYEMAIL : 'getParentByEmail',
        GETCHILDESBYEMAIL : 'getChildesByEmail',
        GETCHILDESBYNAME : 'getChildesByName',

        //SET
        INSERTPARENT : 'insertParent',
        UPDATEPARENT : 'updateParent',
        DELETEPARENT : 'deleteParent',

        //------------------------Sitters---------------------------------
        //GET
        GETALLSITTERS : 'getAllSitters',
        GETSITTERBYEMAIL: 'getSitterByEmail',
        GETSITTERSBYNAME : 'getSittersByName',

        //SET + INSERT
        INSERTSITTER : "insertSitter",
        UPDATESITTER : "updateSitter",
        DELETESITTER : "deleteSitter",
        UPDATESITTERRATING : 'updateSitterRating',
        
        
        //Sitters sorting - GET
        GETTOPRATEDSITTERS : 'getTopRatedSitters',
        GETAVAILABLENOWSITTERS : 'getAvailableNowSitters',
        GETSITTERSBYWORKINGHOURS : 'getSittersByWorkingHours',
        GETSITTERBYGENDER : 'getSitterByGender',
        
        GETLASTBOOKEDSITTERS : 'getLastBookedSitters',
        GETPARENTFAVORITESSITTERS : 'getParentFavoriteSitters',

        //SET + INSERT
        //------------------------Invites---------------------------------
        GETINVITEBYSITTEREMAIL : 'getInvitesBySitterEmail',
        GETINVITESBYPARENTEMAIL : 'getInvitesByParentEmail',
        //SET + INSERT
        UPDATESTATUSBYID : 'updateStatusById',
        INSERTINVITE : 'insertInvite',
        UPDATEINVITE : 'updateInvite',
        
        //Reviews
        //GET
        INSERTREVIEW : 'insertReview',
        UPDATEREVIEW : 'updateReview',
        DELETEREVIEW : 'deleteReview',
        GETREVIEWBYEMAIL : 'getReviewByEmail',  // sitter email

    }
};