# GetSitter

Parent json example:
```sh
{
    "email": "moshe26@gmail.com",
    "password": "1234",
    "name": "yosi levi",
    "profilePictureURL": "http://res.cloudinary.com/sitters/image/upload/v1464729162/profile.moshe.jpg",
    "fullPictureURL": "http://res.cloudinary.com/sitters/image/upload/v1464729162/full.moshe.jpg",
    "partner": "nirit levi",
    "timeJoined": "2016-06-04T10:11:30.472Z",
    "childes": [
        {
            "name": "pini",
            "age": 2,
             "profilePictureURL" : "http://res.cloudinary.com/sitters/image/upload/v1464729162/profile.moshe.pini.jpg",
            "allregies": [
                "banana",
                "apple"
            ]
        },
        {
            "name": "yana",
            "age": 4,
            "profilePictureURL" : "http://res.cloudinary.com/sitters/image/upload/v1464729162/profile.moshe.yana.jpg",
            "allregies": [
                "tomato"
            ]
        }
    ],
    "invites": [
        {
            "sitterEmail": "sitter@gmail.com",
            "parentEmail": "moshe26@gmail.com",
            "street": "hatavor 50 tel aviv",
            "date": "2016-07-04T10:11:30.472Z",
            "recurring": "Weekly",
            "startTime": "19:00",
            "endTime": "21:30",
            "status": "Waiting",
            "allergies": [
                "milk"
            ],
            "uuid": "18c98350-2a3d-11e6-8f03-0dfac97a1d44"
        },
        {
            "sitterEmail": "sitter1@gmail.com",
            "parentEmail": "moshe26@gmail.com",
            "street": "lodka 32 tel aviv",
            "date": "2016-07-04T10:11:30.472Z",
            "recurring": "Monutly",
            "startTime": "8:30",
            "endTime": "12:30",
            "status": "Waiting",
            "allergies": [
                "sprite"
            ],
            "uuid": "4ce422d0-2a3d-11e6-8f03-0dfac97a1d44"
        }
    ],
    "address": {
        "city": "tel aviv",
        "street": "zerah",
        "houseNumber": 52
    }
}
```

Sitter json example:
```sh
{
    "email": "sitter@gmail.com",
    "password": "1234",
    "name": "hanna moka",
    "minAge": 0,
    "maxAge": 9,
    "timeJoined": "dec 2015",
    "hourFee" : "20"
    "rating": 4.5,
    "gender": "female",
    "workingHours": "All day",
    "address": {
        "city": "tel aviv",
        "street": "zerah",
        "houseNumber": 52
    },
    "profilePictureURL" : "http://res.cloudinary.com/sitters/image/upload/v1464729162/profile.hanna.jpg",
    "fullPictureURL" : "http://res.cloudinary.com/sitters/image/upload/v1464729162/profile.hanna.jpg",
    "invites": [
       {
            "sitterEmail": "sitter@gmail.com",
            "parentEmail": "moshe26@gmail.com",
            "street": "hatavor 50 tel aviv",
            "date": "2016-07-04T10:11:30.472Z",
            "recurring": "Weekly",
            "startTime": "19:00",
            "endTime": "21:30",
            "status": "Waiting",
            "allergies": [
                "milk"
            ],
            "uuid": "18c98350-2a3d-11e6-8f03-0dfac97a1d44"
        },
        {
            "sitterEmail": "sitter1@gmail.com",
            "parentEmail": "moshe26@gmail.com",
            "street": "lodka 32 tel aviv",
            "date": "2016-07-04T10:11:30.472Z",
            "recurring": "Monutly",
            "startTime": "8:30",
            "endTime": "12:30",
            "status": "Waiting",
            "allergies": [
                "sprite"
            ],
            "uuid": "4ce422d0-2a3d-11e6-8f03-0dfac97a1d44"
        }
    ],
    "reviews": [
        {
            "date": "may 2016",
            "parentName": "yosi levi",
            "sitterEmail": "sitter1@gmail.com",
            "parentEmail": "moshe26@gmail.com",
            "pictureParent": "http://res.cloudinary.com/sitters/image/upload/v1464729162/profile.moshe.jpg",
            "rating": 5,
            "review": "best sitter in the world",
        }
    ]
}
```

##API

GET /getAllParents

Example: getasitter.herokuapp.com/getAllParents

Response body:

```sh
  ...
```

POST /getParentByEmail/[email]

Example: getasitter.herokuapp.com/getParentByEmail
Request body:

Response body:

```sh
  ...
```

POST /getChildesByEmail/[email]

Example: getasitter.herokuapp.com/getChildesByEmail

Request body:

Response body:

```sh
  ...
```

POST /getChildesByName/[name]

Example: getasitter.herokuapp.com/getChildesByName

Request body:

Response body:

```sh
  ...
```

GET /getAllSitters

Example: getasitter.herokuapp.com/getAllSitters

Response body:

```sh
  ...
```

POST /getSitterByEmail/[email]

Example: getasitter.herokuapp.com/getSitterByEmail
Request body:

Response body:

```sh
  ...
```

POST /getSitterByName/[name]

Example: getasitter.herokuapp.com/getSitterByName
Request body:

Response body:

```sh
  ...
```

GET /getTopRatedSitters

Example: getasitter.herokuapp.com/getTopRatedSitters

Response body:

```sh
  ...
```

GET /getAvailableNowSitters

Example: getasitter.herokuapp.com/getAvailableNowSitters

Response body:

```sh
  ...
```

POST /getSittersByWorkingHours/[workingHours]

Example: getasitter.herokuapp.com/getSittersByWorkingHours
Request body:

Response body:

```sh
  ...
```
POST /getSitterByGender/[gender]

Example: getasitter.herokuapp.com/getSitterByGender
Request body:

Response body:

```sh
  ...
```


POST /insertSitter/[sitter]

Example: getasitter.herokuapp.com/insertSitter
Request body:

Response body:

```sh
  ...
```

POST /updateSitter/[sitter]

Example: getasitter.herokuapp.com/updateSitter
Request body:

Response body:

```sh
  ...
```


POST /deleteSitter/[sitter]

Example: getasitter.herokuapp.com/deleteSitter
Request body:

Response body:

```sh
  ...
```


POST /insertParent/[parent]

Example: getasitter.herokuapp.com/insertParent
Request body:

Response body:

```sh
  ...
```

POST /updateParent/[parent]

Example: getasitter.herokuapp.com/updateParent
Request body:

Response body:

```sh
  ...
```


POST /deleteParent/[parent]

Example: getasitter.herokuapp.com/deleteParent
Request body:

Response body:

```sh
  ...
```

POST /insertReview/[review]

Example: getasitter.herokuapp.com/insertReview
Request body:

Response body:

```sh
  ...
```

POST /updateReview/[review]

Example: getasitter.herokuapp.com/updateReview
Request body:

Response body:

```sh
  ...
```

POST /insertInvite/[invite]

Example: getasitter.herokuapp.com/insertInvite
Request body:

Response body:

```sh
  ...
```

POST /updateInvite/[invite]

Example: getasitter.herokuapp.com/updateInvite
Request body:

Response body:

```sh
  ...
```


POST /getReviewsBySitterEmail/[review]

Example: getasitter.herokuapp.com/getReviewsBySitterEmail
Request body:

Response body:

```sh
  ...
```

POST /getParentFavoriteSitters/[parent]

Example: getasitter.herokuapp.com/getParentFavoriteSitters
Request body:

Response body:

```sh
  ...
```

POST /getInvitesByParentEmail/[parent]

Example: getasitter.herokuapp.com/getInvitesByParentEmail
Request body:

Response body:

```sh
  ...
```

POST /getInvitesBySitterEmail/[sitter]

Example: getasitter.herokuapp.com/getInvitesBySitterEmail
Request body:

Response body:

```sh
  ...
```


