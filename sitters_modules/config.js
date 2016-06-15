'use strict';

module.exports = {
    events: {
        AUTHBYEMAIL : 'authByEmail', // TODO: will be implement with G+

        //------------------------Parents---------------------------------
        //GET
        GETALLPARENTS : 'getAllParents',
        GETPARENTBYEMAIL : 'getParentByEmail',
        GETCHILDESBYEMAIL : 'getChildesByEmail',
        GETCHILDESBYNAME : 'getChildesByName',
        GETFIRSTCHILD :  'getFirstChild',
        //SET
        INSERTPARENT : 'insertParent',
        UPDATEPARENT : 'updateParent',
        DELETEPARENT : 'deleteParent',
        
        //------------------------Sitters--------------------------------
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
        GETINVITESBYSITTEREMAIL : 'getInvitesBySitterEmail',
        GETINVITESBYPARENTEMAIL : 'getInvitesByParentEmail',

        //SET + INSERT
        INSERTINVITE : 'insertInvite',
        UPDATEINVITE : 'updateInvite',
        
        //Reviews
        //GET
        INSERTREVIEW : 'insertReview',
        UPDATEREVIEW : 'updateReview',
        GETREVIEWSBYSITTEREMAIL : 'getReviewsBySitterEmail',  // sitter email

    }
};