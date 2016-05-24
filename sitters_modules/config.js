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

        //Sitters sorting - GET
        GETTOPRATEDSITTERS : 'getTopRatedSitters',
        GETAVAILABLENOWSITTERS : 'getAvailableNowSitters',
        GETSITTERSBYWORKINGHOURS : 'getSittersByWorkingHours',
        GETSITTERSBYGENDER : 'getSittersByGender',
        GETLASTBOOKEDSITTERS : 'getLastBookedSitters',
        GETPARENTFAVORITESSITTERS : 'getParentFavoriteSitters',

        //SET + INSERT


        //------------------------Invites---------------------------------
        GETINVITEBYSITTEREMAIL : 'getInviteByEmail',

        //SET + INSERT
        UPDATESTATUSBYID : 'updateStatusById',
        INSERTINVITE : 'insertInvite',
        UPDATEINVITE : 'updateInvite',

        DELETEINVITE : 'deleteInvite',

        //------------------------Users---------------------------------

        //SET + INSERT
        INSERTUSER : 'insertUser',
        UPDATEUSER : 'updateUser',

        DELETEUSER : 'deleteUser',


        //Reviews
        //GET
        GETREVIEWBYEMAIL : 'getReviewByEmail',  // sitter email

        //SET + INSERT
        ADDNEWREVIEW : 'addNewReview'
    }
};