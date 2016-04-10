# NewsCorpComponent
First Cut for the custom web component

It's a plugin to create custom web component of a list of divs on the fly

All one need to do is to call new CustomList Constructor with an Object as param having JSONURL as required property and you could also specify a property from your objects in the array to order your list of divs accordingly

JSONURL is the required property to indicate from where the data needs to be fetched.

You can also hide/show elems at launch by just passing display: none/true to your Objects in JSON

Just do NPM install and Grunt to run the project.

Also I'll remove the elem instation code from the JS , it has been added as of now to just run via launching index.html and not really using another JS file to load this one.
