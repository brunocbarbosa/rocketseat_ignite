# App

GymPass style app

## Functional Requiriments

- [] Should be posssible to register yourself;
- [] Should be posssible to autenticate yourself;
- [] Should be posssible get a logged user profile;
- [] Should be posssible get the check-ins number number realized by logged user;
- [] Should be posssible user get your chek-ins history;
- [] Should be posssible user get near academies;
- [] Should be posssible user search gym by name;
- [] Should be posssible user realize check-in in one gym;
- [] Should be posssible validate a user check-in;
- [] Should be posssible to register a gym 

## Business Rules

- [] The user should not register with duplicate email;
- [] The user should not do 2 check-ins twice in the same day;
- [] The user should not do check-in if isn't near (100m) of the gym;
- [] The check-in only can be validated up to 20 minutes after created;
- [] The check-in only can be validated by administrators;
- [] The gym only can be registered by administrators;
  
## Not Functional Resources

- [] User password have to be encrypted;
- [] Aplication data have to stored in a PosgreSQL database;
- [] All data list have to be paged with 20 items per page;
- [] User have to be identified by a JWT;