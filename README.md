# Nested Checkbox component using ReactJs

Live project link: [Nested Checkbox](https://pradeep17jadhav.github.io/Nested_Checkbox).

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.


## Requirements and explaination
● Component should act like a traditional form input element\
- Component uses HTML form element and checkboxes in nested form.\
- Output data is printed on console on submitting the form.

● Follow best practices\
- Used reusable functions wherever possible\
- followed DRY principle.\
- Kept the logic simple and easy to understand for anyone.\
- Logic is implemented by considering the space and time complexity. All operations of processing data and changing states is highly optimized.\
- Used reusable components, which can be scaled further as per future requirements\
- Added comments for important logical code\
- Data is used dynamically without hard-coding\
- Components are split in multiple components keeping in mind future requirements and improvements

● Feel free to use any 3rd party libraries, as far as you are mindful about the size it adds to the project.\
- Haven't used any 3rd party library (except Gh-pages) to reduced build size\
- All buttons, lines, checkboxes are custom and made from scratch\
- Used only Gh-pages library to deploy project using Github

● Each node can be nested to N levels\
- Implemented this as per design. All nodes beyond 2nd depth will have same styling properties

● Overflowing text wraps to next line adjusting the height\
- Set predefined width for each level, which will overflow to next line while maintaining the positioning

● Should emit necessary events\
- Events are emitted as per user interaction to update UI and states

● Style Isolation\
- All components have their own separate CSS files

● Submission in the form of github repo, with example integrated.\
- A shuffled example data is used.\
- The data is hosted on 3rd party website and API call is made to fetch the data

● Checkbox to have intermediate state\
- All checkboxes have 3 states: checked, unchecked, intermediate.\
- Checking/unchecking any checkbox will check/uncheck all the children nodes.\
- State of all ancestors will be updated based on state of childs/siblings.


## Input data
Input data should be in JSON form. Each element in array should contain an object having properties required for rendering the nested structure.\
Used following properties for each checkbox node:
1. name: Name to be printed on screen
2. id: Unique Id of the current element
3. parentId: Id of the parent element

The data of checkboxes can be sorted or unsorted. But the ID's of each node are expected to be in sequence, i.e. 1-2-0, 1-2-1, 1-2-2 etc. But still the missing data is handled and will not cause any problem.


## Output data
Output data is printed on console on submitting the form. It is in nested form (as visible on UI).\
Output data has following properties:
1. name: Name to be printed on screen
2. id: Unique Id of the current element
3. parentId: Id of the parent element
4. bChecked: Checked/unchecked state of the current ID
5. bIntermediate: True if current checkbox is in intermediate state (some of the descendant are checked)
6. childs: Array of data of all the children checkboxes