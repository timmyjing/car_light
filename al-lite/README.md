Please make sure to include a README file detailing setup instructions, how much time you spend on the exercise, and any pertinent information about the approach you took and the design decisions you made. For any items you were unable to finish, explain the approach you were planning on taking.

##Requirements
Use the latest version of your chosen framework, and any database to back it.
For the front end, use any Javascript framework you wish (or vanilla JS if you want)
Create three pages: a “Home” page, a “Search Results” page and a “Vehicle Details” page.
The Home page contains a simple search form containing a price filter.
The user can filter by price min and price max on the Home page.
The Search Results page contains a paginated list of search results, loaded in real time via API.
Clicking a vehicle search result should open a basic “Vehicle Details” page, displaying a photo and basic info such as Year/Make/Model, populated using data from the search result. Feel free to add any other details you want to display!
In the database, keep track of how many times each result (by VIN) is shown on the “Vehicle Details” page. Treat VIN as a unique identifier for vehicles.
On the “Search Results” page, indicate how many times each result has been viewed on the “Vehicle Details” page. For example each result on the  “Search Results” page could have a text area saying “Viewed X times”

##Setup
Server: cd al-lite, bundle install, rails db:setup, rails db:migrate, rails s. Rails server is setup to localhost:3001
Client: cd client, npm install, npm start. Front end is setup to localhost:3000

NOTE: API key is currently gitignored. Will need to add key into the search results component.

##Time Spent: Approx 12 Hours

##Approach and Design Decisions
I built this project using a React front end and a Ruby on Rails as an API backend with a Postgres database. The decisions made
were based on the API supplied. Since the API only returned paginated results with all the car data needed, I decided to use
a unidirectional data flow and just have down the car data as props to a component that links to the car detail component. This was 
necessary as there was not another API provided to get a car by its VIN. This also causes the case of where refreshing the page on a detail page will lose all the data so logic was added to go back to the previous page if the car data is missing. With this limitation, I did not see a need for Redux as things weren't too nested and landing on the Search results page will trigger an API call with new results anyways.

The views feature was accomplished using JavaScript promises and thenables. Once the search results were fetched from the API, the VIN of these results were used as query params to fetch for the views on the Rails backend. The response back will only return the VINs and views for vehicles that were only persisted, thus allowing me to setup logic to add a view property to the data of each vehicle from the results fetch. This was done using O(n^2) time and I plan to improve this if the app scales as I did not see any benefits to normalizing the state for now. A createView/updateView API call to Rails would be made when the car detail component is mounted, which makes sense lifecycle wise because having the component mounted meant that the user would have all the data available for them to see.

Another important decision that I made was to serialize the URL so that users are able to copy and paste search parameters and page numbers and see the same results. To make this work with React, I had to wrap a React component that gives me access to the URL params in the props,
allowing me not only to make the proper API call but to also be able to pass the search params into the search filter so they are in sync.

I also tried tinkering with CSS flex in order to practice building a responsive design and most of the layout is built with flex. I was able to finish the features. Some improvements that I would do in the future would be for typology and responsive design. I also chose to reuse the search component for the results page but if the search paramenters grow, the search component will probably grow to be different than the one on the home splash page.