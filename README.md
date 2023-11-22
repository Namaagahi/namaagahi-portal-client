**Nama Agahi Exclusive Portal**

**Date: 11/22/2023**

**Phase: 1 and 2 done**

**Developer: Hamidreza Hashemi**

This is a technical and conceptual documentation of the exclusive full stack, Persian language, Role-based access control (RBAC) application for managing content of the contracts and work process of Nama Agahi advertising agency located in Tehran, Iran.

The app's aim is to handle the workflow of the company and CRM cycle including marketing, customer service and sales activities.

The app is aimed to develop in 5 phases:

- **Conceptual Information**

- **PHASE 0: Basic Features:**
  - **Authentication/Authorization:**
    1. Login form to logging in to the dashboard.
    2. Logout functionality.
  - **User:**
    1. Creating users an assigning role(s) (by the master user(s))
    2. Displaying users in one table.
    3. Updating user characteristics.
    4. Deleting users (only available for master user(s))
  - **Edit Profile:**
    1. Each user can update only the name and choose a profile picture.
  - **Dark/Light mode:**
    1. Ability to switch between modes to choose a persistent mode at any time.
  - **Side Navigation:**
    1. A side navigation bar on the right side (mobile on top) to navigate between different main sections of the application.
  - **Search:**
    1. Ability to search for certain texts in all pages (the search functionality is similar to chrome's "find in page" feature)
  - **Table Search, Sort, Resize, Filter and Pagination:**
    1. All data in table form can be searched through, sorted by name ascending and descending, filter for showing certain columns, filter for showing certain rows, resizing ability for table columns by dragging and dropping and ability to paginate between different pages in case of large data entities with ability to choose data entities to display per page.

- **PHASE 1: Customer Project Life-cycle PART 1:**
  - **The overall workflow**
    1. The managers of the company (with the role of project-manager) create a project (or choose from previous projects) based on customer request.
    2. The product-manager creates a proposal with choosing the project and assign multiple related tasks to different department managers based on project requirements.
    3. A task notification with description and deadline is sent to the assigned users and they can re-assign to their subordinate users.

![Shape2](RackMultipart20231122-1-u9le7q_html_712f7a8d3b616736.gif)

1. User defines and uses required customers, structures, boxes and plans based on the project characteristics and in the final stage creates the sale plan for the customer.
2. Manager of the Media section assigns a customer to the defined plan and approves it.
- **Project** :
1. Creating a new project including initial customer name, phone number, role and introduction method.
2. Updating project props.
3. Displaying all projects in a table.
4. Deleting projects (only available for admin users)
- **Customers** :
1. Creating type-based customer (official/unofficial and individual/legal entities) with their characteristics.
2. Displaying customers in a table.
3. Updating customers props.
4. Deleting customers (only available for admin users)
- **Project**** Code**:
1. Creating project codes for customers as a unique meaningful set of strings Id to be recognized and archived in the entire customer projects life-cycle.
2. Displaying project codes in a table.
3. Updating project code props.
4. Deleting project codes (only available for admin users)
- **Structure** :
1. Creating structures of the boxes under company's rent.
2. Displaying structure table to the user.
3. Updating structure props.
4. Deleting structures (only available for admin users)
- **Box** :
1. Creating type-based boxes (owner, short-term and long-term second hand buy) that can include multiple structures with expenses and other characteristics for each structure.
2. Displaying box cards to the user.
3. Displaying each box props and totals in a separate table.
4. Updating box props.
5. Deleting box (only available for admin users)
- **Plan** :
1. Creating type-based (normal and package) sale plan including multiple structures from defined boxes based on customer request with maneuver over multiple options.
2. Displaying all plans with their status in a table.
3. Generating pdf export of plan invoice for the customer.
4. Displaying each plan props and totals in a separate table.
5. Updating Plan props.
6. Deleting plan (only available for admin users)



- **PHASE 2:**  **Extra Features**** :**
Until this point, users are defined and authenticated/authorized to the platform. A project is defined and a proposal is made for that project. Project code, customer, structure, box, plan data is entered with all CRUD operations available on each of them. The approved sale plans are ready to be contracted.The next step is to calculate the print and operate data and build the contract for the customer. Then we will have all the numbers for displaying revenue, income/loss and other statistic charts to the user.Before that, in this phase we will add the following features:


  - **Chatroom:**
    1. Creating chatrooms.
    2. Displaying all chatrooms in a table.
    3. Ability to enter chatrooms with multiple users.
    4. Deleting chatroom (only available for admin users)
  - **Filter Available Structures:**
    1. Ability to filter available structures with custom start and end dates to see which structures are available for sale in those periods.
    2. Ability to filter the available structures by their path.
    3. PDF export for found available structures.
  - **Structure Images:**
    1. Ability to upload/change/delete multiple images for each structure.
  - **Map:**
    1. Displaying structure locations on the map.
    2. Ability to filter certain structures on the map based on their path, availability status.
    3. Creating a screen shot image of the customized map to present to the customer.

- **PHASE 3: Customer Project Life-cycle PART 2:**
  - **Contractor** :
    1. Creating type-based contractors with their characteristics.
    2. Displaying contractors in a table.
    3. Updating contractor props.
    4. Deleting contractors (only available for admin users)
  - **Print & Operate:**
    1. Creating print and operation figures for approved plans and assigning a contractor to each one. (an approved plan includes one or more structures from the defined boxes with sell figures and customer and project characteristics)
    2. Displaying all print & operate entries in a table.
    3. Generating pdf export of print & operate invoice for the customer.
    4. Displaying each print & operate props and totals in a separate table.
    5. Updating print & operate props.
    6. Deleting print & operate (only available for admin users)
  - **Contract:**
    1. Creating the contract from integration of approved plan and its corresponding approved print & operate table.
    2. PDF export of contract.
    3. Displaying all contracts in a table.
    4. Displaying each contract in separate page.
  - **Charts:**
    1. Extracting charts from approved contracts for revenue and incomes.
    2. Charts for boxes and plans in customize way and displaying to the user in dashboard page.



- **PHASE 4: Other sections:**
  - **Bus:**
    1. TBA
  - **Metro:**
    1. TBA
  - **Namava:**
    1. Namava Platform (TBA)
  - **Customer Panel:**
    1. Global access to a login page for customers to design their custom plan and send it to project manager.
 This step is pre-process of project start that omits phone call or verbal arrangement making.


- **Technical Information:**

- **Front-End Technologies:**
  - **Typescript:**
  - **React js:**
  - **Next js:**
  - **Tailwind CSS:**
  - **Redux/toolkit:**
  - **React Hook Form:**
  - **Tanstack/React Table:**
  - **Framer Motion:**
  - **Jalali-moment:**
  - **React Date Object:**
  - **Socket-io client:**
  - **React-pdf/renderer:**
  - **jspdf:**
  - **Chart.js:**
  - **Jwt-decode:**
  - **Universal-cookie:**
  - **React-toastify:**
  - **React icons:**
  - **React leaflet:**



- **Front-End Architecture-pattern:**
 ![](https://s30.picofile.com/file/8469795650/Untitled_Diagram_drawio.png)
