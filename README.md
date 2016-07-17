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

Example: sitters-ws.herokuapp.com/getAllParents

Response body:

```sh

  ...
```

POST /getParentByEmail/[email]

Example: sitters-ws.herokuapp.com/getParentByEmail
Request body:

Response body:

```sh
  ...
```

POST /getChildesByEmail/[email]

Example: sitters-ws.herokuapp.com/getChildesByEmail

Request body:

Response body:

```sh
  ...
```

POST /getChildesByName/[name]

Example: sitters-ws.herokuapp.com/getChildesByName

Request body:

Response body:

```sh
  ...
```

GET /getAllSitters

Example: sitters-ws.herokuapp.com/getAllSitters

Response body:

```sh
[
{
_id: "578ac1edc035910300faaf13",
name: "Dassi Rosen",
password: "eyJhbGc",
email: "dassi.rosen@gmail.com",
profilePictureURL: "https://lh3.googleusercontent.com/-ig1dpe9IVu8/AAAAAAAAAAI/AAAAAAAAAEs/WIoPZ5BmoeI/s96-c/photo.jpg",
partner: "partner",
__v: 0,
invites: [
{
sitterEmail: "sitter1@gmail.com",
parentEmail: "dassi.rosen@gmail.com",
street: "ss 5 cc",
date: "2016-07-04",
startTime: "16:50",
endTime: "16:50",
recurring: "weekly",
uuid: "f0b742b0-4bb3-11e6-8c3f-319824265bfb",
_id: "578acec1ac9d490300b5fa8e",
allergies: [
"dfssdf"
]
},
{
sitterEmail: "sitter1@gmail.com",
parentEmail: "dassi.rosen@gmail.com",
street: "ss 5 cc",
date: "2016-07-04",
startTime: "16:50",
endTime: "16:50",
msg: "sdasdasdasdasdsdsd",
recurring: "monthly",
uuid: "49340040-4bb4-11e6-8c3f-319824265bfb",
_id: "578acf55ac9d490300b5fa92",
allergies: [
"dd"
]
}
],
address: {
city: "city",
street: "street",
houseNumber: 3
},
childes: [
{
name: "dasdjhakjsdhyoel",
age: 5,
allergies: [
"abc, hhh, mmm"
]
}
]
}
]
  ...
```

POST /getSitterByEmail/[email]

Example: sitters-ws.herokuapp.com/getSitterByEmail
Request body:
    "email" : "sitterEmail"

Response body:

Will return all sitters

POST /getSitterByName/[name]

Example: sitters-ws.herokuapp.com/getSitterByName
Request body:
    { "name" : "<sitter-name>"
Response body:

return 1 sitter with email

GET /getTopRatedSitters

Example: sitters-ws.herokuapp.com/getTopRatedSitters

Response body:

return all sitters by rting from top to low

GET /getAvailableNowSitters

Example: sitters-ws.herokuapp.com/getAvailableNowSitters

Response body:

return all available now sitters

POST /getSittersByWorkingHours/[workingHours]

Example: sitters-ws.herokuapp.com/getSittersByWorkingHours
Request body:

{ "workingHours" : "Mornings" / Evenings / All day"}

Response body:re
return all sitters by working hours


POST /getSitterByGender/[gender]

Example: sitters-ws.herokuapp.com/getSitterByGender
Request body:
{
    "gender" : "female / male"
}

Response body:
return all sitters by  gender



POST /insertSitter/[sitter]

Example: sitters-ws.herokuapp.com/insertSitter
Request body:
{
```sh
            "sitterEmail": "SITTER EMAIL",
            "parentEmail": "PARENT EMAIL",
            "street": "LOLE 14 TEL AVIV",
            "date": "2016-07-04",
            "startTime": "16:50",
            "endTime": "16:50",
            "recurring": "weekly",
            "allergies": [
                "apple", "banana"
]
  ...
```
}

Response body:

status: ok

POST /updateSitter/[sitter]

Example: sitters-ws.herokuapp.com/updateSitter
Request body:

Response body:
status: ok or error
```sh
  ...
```


POST /deleteSitter/[sitter]

Example: sitters-ws.herokuapp.com/deleteSitter
Request body:

Response body:
status: ok or error
```sh
  ...
```


POST /insertParent/[parent]

Example: sitters-ws.herokuapp.com/insertParent
Request body:

Response body:
status: ok or error
```sh
  ...
```

POST /updateParent/[parent]

Example: sitters-ws.herokuapp.com/updateParent
Request body:

Response body:

```sh
status: ok or error
  ...
```


POST /deleteParent/[parent]

Example: sitters-ws.herokuapp.com/deleteParent
Request body:

Response body:

```sh
  ...
```

POST /insertReview/[review]

Example: sitters-ws.herokuapp.com/insertReview
Request body:

Response body:

```sh
  ...
```

POST /updateReview/[review]

Example: sitters-ws.herokuapp.com/updateReview
Request body:

Response body:
status: ok or error

POST /insertInvite/[invite]

Example: sitters-ws.herokuapp.com/insertInvite
Request body:

Response body:
status: ok or error


POST /updateInvite/[invite]

Example: sitters-ws.herokuapp.com/updateInvite
Request body:

Response body:
stauts : ok ot no


POST /getReviewsBySitterEmail/[review]

Example: sitters-ws.herokuapp.com/getReviewsBySitterEmail
Request body:

Response body:
array of selected reviews
```sh
  ...
```

POST /getParentFavoriteSitters/[parent]

Example: getasitter.herokuapp.com/getParentFavoriteSitters
Request body:

Response body:
array of filtered reviews
```sh
  ...
```

POST /getInvitesByParentEmail/[parent]

Example: sitters-ws.herokuapp.com/getInvitesByParentEmail
Request body:

Response body:

`array of invites or error

POST /getInvitesBySitterEmail/[sitter]

Example: sitters-ws.herokuapp.com/getInvitesBySitterEmail
Request body:

Response body:
error : get 1 parent by email


