# Organizational chart made with Node.js + Express as the backend, SQLite as the DB, and Angular as the frontend tech.

The 3 main requirements are:
1) It should allow users to view the chart
2) It should allow users to add and delete items to the chart
3) It should allow users to reorder and restructure the chart



Note on data structures: 
    This approaches a graph/heap/tree, but adding these constraints would
    complicate the problem and make it harder to manage. By looking at several 
    org. charts online, it can be determined that most organizations are 
    structured by employee `Title.` Arguments can be made either way, but we're 
    going to assume this is how we'd like to structure our chart as well and 
    sort our data based on the numerical rank of the `Title` model. 


Working spec:

1) Each person can have multiple managers and multiple direct reports. 
  - Represent with a one to many `Managers` field.

2) No login, all session-based (assuming this will be a part of a bigger app 
  that has login capability).

  - The session will keep track of the various `Company Charts` the user may have. 
    Each `Company` gets a unique ID assigned which will be used as the URL 
    linking to that chart.


Assumptions:

1) `Models`: This could be created purely as a SPA (if we don't need to query these models
 or really do anything with them a JSON blob or likewise would be fine), 
 but since this is a full stack test we will want to have clearly defined models:
	
  - `Employee` model:
	  One `Name` field (not everyone has a first and last name!)
	  One to one relation to the `Title` model (we're going to assume that no 
	    one has more than one official title)
	  One to many `Managers` field which is a self-referencing foreign key that 
	    can be null (C-level employees.)
	  One to one relation with the `Company` 

  - `Title` model
  	  Incrementing PK
	  `Title` field 
	  Numerical rank (this doesn't have to be unique, all VPs can have the
	    same rank, for example)
	  One to one relation with the `Company`

  - `Company` model
  	  Sequential GUID as a PK (Note: this may give you performance problems with 
  	    indexing, so it should be thought about a little more) so we can can 
  	    easily generate our unique URL for the company org char page. Store this
  	    in the session for the user so they can access their `Companies` without
  	    having to log in. Eventually this could become some kind of gradual signup 
  	    for new users (users don't have to sign up to create a chart, only
  	    to save one)
  	  Title of the `Company` (required)


2) We want to structure our chart based on the numberical rank of the `Title` 
	model. 
  - This can be reworked to structure the graph purely based on direct reports, 
    but at this point we'd complicate the problem beyond the time we have to work
    on it. 
  - By sticking to these constraints we can develop a UI based on the available
    `Title` fields which could later be expanded to a graph UI 
    if the specs change.  


High-level feature list:

1) Session support for users
2) RESTful API to:
  Add/Remove/Edit `Company`
  Add/Remove/Edit `Title`
  Add/Remove/Edit `Employee`
5) Reorder `Employee` by changing their Title
6) Support a progressive enhancement UI