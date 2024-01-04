# Payload Radio Button Bug Minimum Reproduction

## What is the bug?
Let's say you have:
- Two collections - 'Collection 1' and 'Collection 2'
- Both collections have a radio field using the same name and values - we'll call this the 'shared radio field'
- Collection 1 contains a reference field to Collection 2

If you open a document in Collection 1, and there edit or create a document in Collection 2 using the reference field, attempting to edit the 'shared radio field' on the Collection 2 document will instead edit the value for the shared field on the 'parent' Collection 1 document.

## How do I reproduce it?
1. Clone this repo
2. Open root folder in terminal
3. Run `yarn install`
4. Run `yarn run dev`
5. Open admin backend at https://locahost:3000
6. Create a user and log in
7. Open Collection_1s
8. Click 'Create new Collection_1'
9. On the 'Related_collection_2' field, click the '+' button to create a related document in Collection_2
10. Attempt to edit Radio_field_2 - notice that this is successful
11. Attempt to edit Radio_field_1 - notice that this is unsuccessful, and the radio button UI does not update
12. Press the 'X' in the top right to dismiss the screen to create the Collection_2 document
13. Notice that Radio_field_1 on Collection 1 now has its value set to the value you selected for the Collection_2 document

Please note that this bug also occurs in arrays of references, and also occurs when editing existing references - not just creating new ones.