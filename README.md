# outerbase-html-preview

This [Outerbase](https://outerbase.com/) plugin let's you preview HTML stored in a database.

Read the full [Hashnode](https://hashnode.com/) article, [Creating an HTML Preview Plugin for Outerbase]().

## What's required?

A table column storing a string.

## How do I add this plugin?

1. Create and seed your database with values. You can use the code the in /sql folder as dummy data - provided that you are set up with a SQLite database.
2. Create a new Outerbase Custom Plugin and paste in the code from index.js. Don't forget to check off the "Columns" and "cellValue" boxes in the Plugin form.
3. Add the plugin to your column.
4. Use the plugin!


## Demo (video)

[Watch the video](/demo/outerbase-plugin-html-preview-demo.mp4)

## Demo (screenshots)

#### Before adding the Plugin

![Screenshot of the table before adding the plugin](/demo/outerbase-plugin-html-preview-img-before.png "Before adding the Plugin")

#### After adding the Plugin

![Screenshot of the table after adding the plugin](/demo/outerbase-plugin-html-preview-img-after.png "After adding the plugin")

#### Using the Plugin

![Screenshot of the table while using the plugin](/demo/outerbase-plugin-html-preview-img-during.png "Using the plugin")