'use strict';

module.exports = {
    events: {
        AUTH_BY_EMAIL : 'authByEmail',

        //------------------------Parents---------------------------------
        //GET
        GET_ALL_PARENTS : 'getAllParents',
        GET_PARENT_BY_EMAIL : 'getParentByEmail',
        GET_CHILD_BY_EMAIL : 'getChildByEmail',
        GET_CHILD_BY_NAME : 'getChildByName',
        GET_FIRST_CHILD :  'getFirstChild',
        //SET
        INSERT_PARENT : 'insertParent',
        UPDATE_PARENT : 'updateParent',
        DELETE_PARENT : 'deleteParent',

        //------------------------Sitters--------------------------------
        //GET
        GET_ALL_SITTERS : 'getAllSitters',
        GET_SITTER_BY_EMAIL: 'getSitterByEmail',
        GET_SITTERS_BY_NAME : 'getSittersByName',
        GET_SITTERS_BY_RATING : 'getSittersByRating',

        //SET + INSERT
        INSERT_SITTER : "insertSitter",
        UPDATE_SITTER : "updateSitter",
        DELETE_SITTER : "deleteSitter",
        UPDATE_SITTER_RATING : 'updateSitterRating',

        //Sitters sorting - GET
        GET_TOP_RATED_SITTERS : 'getTopRatedSitters',
        GET_AVAILABLE_NOW_SITTERS : 'getAvailableNowSitters',
        GET_SITTERS_BY_WORKING_HOURS : 'getSittersByWorkingHours',
        GET_SITTER_BY_GENDER : 'getSitterByGender',

        GET_LAST_BOOKED_SITTERS : 'getLastBookedSitters',
        GET_PARENT_FAVORITE_SITTERS : 'getParentFavoriteSitters',

        //SET + INSERT
        //------------------------Invites---------------------------------
        GET_INVITES_BY_SITTER_EMAIL : 'getInvitesBySitterEmail',
        GET_INVITES_BY_PARENT_EMAIL : 'getInvitesByParentEmail',

        //SET + INSERT
        INSERT_INVITE : 'insertInvite',
        UPDATE_INVITE : 'updateInvite',

        //Reviews
        //GET
        INSERT_REVIEW : 'insertReview',
        UPDATE_REVIEW : 'updateReview',
        GET_REVIEWS_BY_SITTER_EMAIL : 'getReviewsBySitterEmail'  // sitter email

    }
};
