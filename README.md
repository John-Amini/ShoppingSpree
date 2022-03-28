# ShoppingSpree
Traveling Shopper is a standalone project that allows users to recreate layouts of their favorite stores and visualize the most optimal path through them. Users also have the ability to add items to these layouts as different colored nodes. In doing so users have the ability to find the most optimal path for them to shop in order to save time on their next trip to the grocery store.

## Live Site
 - https://traveling-shopper.herokuapp.com/

## Features
- Users have the ability to sign up, login , and also login as a demo user.
- Layouts
  - Create New layouts
  - Save edited layouts
  - Edit names of created layouts
  - Delete created layouts
  - Read layouts that they have created
- Items
  - Create new items associated with layouts
  - Read all items they created for that layout
  - Edit an items name,weight,and color
    - Color change will be reflected on the graph 
  - Delete an item
    - Deleted items that are present will dissapear from the graph
 - Optimize
   - A user will have the ability to see the optimal path for their layout
 
## Technologies Used
 - FrontEnd
   - React
   - Redux
 - BackEnd
   - Typescript
   - Express
   - PostgreSQL
   
## Features Coming Soon
 - User Profiles
## Installation
 1. Clone this repo using git clone with command: <code>git clone https://github.com/John-Amini/ShoppingSpree.git</code>
 2. In the root directory <code>ShoppingSpree</code> install the dependancies by running npm install
 3. In the backend directory <code>ShoppingSpree/backend</code>  install the dependacies by running npm install
 4. In the frontend directory <code>ShoppingSpree/frontend</code> install the dependancies by running npm install
 5. Create a user in PostgreSQL using <code>CREATE USER shoppingSpreeUser WITH PASSWORD <password> CREATEDB</code>
 6. Create a database in PostgreSQL using <code>CREATE DATABASE shoppingSpreeApp WITH OWNER shoppinSpreeUser</code>
 7. In the backend directory <code>ShoppingSpree/backend</code> create a .env file using the .env example
 8. While in the backend directory <code>ShoppingSpree/backend</code> run the command <code>npx dotenv sequelize db:migrate</code>
 9. While in the backend directory <code>ShoppingSpree/backend</code> run the command <code>npx dotenv sequelize db:seed:all</code>
 10. In the backend directory <code>ShoppingSpree/backend</code> use <code>npm run start:development</code> to start the backend
 11. In the frontend directory <code>ShoppingSpree/frontend</code> use <code>npm start</code> to start the frontend
 12. Go to <code>localhost:3000</code>
  
 ## Site Preview
 ### Splash Page
  ![image](https://user-images.githubusercontent.com/91162716/160353795-f7778564-5865-40e8-91ce-56875861f3b0.png)
 ### Login Page
  ![image](https://user-images.githubusercontent.com/91162716/160353834-771f32bf-7b3e-4318-a372-6956f2526637.png)
 ### Signup page
  ![image](https://user-images.githubusercontent.com/91162716/160353876-9cffa5e1-2483-490f-b468-4097dba98eaa.png)
 ### Main Page
  ![image](https://user-images.githubusercontent.com/91162716/160353742-729edaae-0634-4403-9584-c9f761f93b5d.png)
