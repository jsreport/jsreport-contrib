#jsreport extensions

This repository contains list of external jsreport extensions. The list of core extensions as well as documentation can be found [here](http://jsreport.net/learn/extensions). Creating extensions is the best way how you can contribute to the platform. Don't hasitate and do it.

##Extension installation
Extensions are typically provided and installed through [node.js npm](https://www.npmjs.com/). jsreport is automatically searching for extensions during start up so it is usually enough just to use single command to install them. 

```
npm install jsreport-import-export
```

##List of extensions

**[jsreport-import-export](https://github.com/jsreport/jsreport-contrib/tree/master/jsreport-import-export)**
Importing and exporting templates into json files.
 
**[jsreport-contrib-mongodb](https://github.com/jsreport/[jsreport-contrib-mongodb)**
Use  [mongodb npm module](https://github.com/mongodb/node-mongodb-native) inside jsreport [custom scripts](http://jsreport.net/learn/scripts) to create reports directly from the nosql database.

**[jsreport-contrib-jira](https://github.com/jsreport/jsreport-contrib-jira)**
Use   [jira npm module](https://github.com/steves/node-jira) inside jsreport [custom scripts](http://jsreport.net/learn/scripts) to create reports directly from jira.

**[jsreport-ejs](https://github.com/jsreport/jsreport-ejs)**
EJS templating engine for jsreport

**[jsreport-html-to-text](https://github.com/jsreport/jsreport-html-to-text)**
Recipe converting html into nicely structured text

**[jsreport-wkhtmltopdf](https://github.com/jsreport/jsreport-wkhtmltopdf)**
Recipe using wkhtmltopdf to convert html into pdf



