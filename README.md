# File API

Challenge submitted for Toolbox OTT.

This API has the purpose of parsing in a JSON format all the csv files fetch from the API
provided by Toolbox for this challenge.

# Endpoints

- ```GET /files/list:```: Get an array of strings which has the name of all of the available files
- ```GET /files/data:```: Get an array of JSON objects with detailed information about the files
- ```GET /files/data?fileName=example.csv```: Get an array with files with name = fileName with detail 
information about the files
    
### JSON Format:
```javascript
{ 
    "file": "fileName"
    "lines": {
        "text": "variable text",
        "number": "variable length number",
        "hex": "32 digits long hex code"
    }
 }
```

# Excecute API locally

To excecute the API locally, excecute the following comand:

```npm start```

# Excecute test

To excecute the programmed tests, execute the following command:

```npm run test```

