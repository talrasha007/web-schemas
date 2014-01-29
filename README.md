#express-schema

[![Build Status](https://secure.travis-ci.org/ctavan/express-validator.png)](http://travis-ci.org/ctavan/express-validator)

  A schema parser for express.js. The goal of this lib is to make express.js's request param parsing easier.
  
## Installation

```
npm install express-schema
```

## Usage

```javascript
// Express app configuration...
// blabla...

var expressSchema = require('express-schema'),
    schemas = expressSchema.schemas,
    Schema = expressSchema.Schema;

var fooSchema = new Schema({
    foo: schemas.int.gt(3).lt(5).required(),
    bar: {
        a: [{ val: schemas.string.len(3, 8) }],
        b: { val: schemas.date }
    }
});

// { foo: '4', bar: { a:[ { val: '6' } ], b: '2014-01-30' } will be parsed as { foo: 4, bar: { a: [ { val: 6 } ], b: Date('2014-01-30') } }

app.all('/foo', function (req, res) {
    try {
        fooSchema.sanitize(req);
        res.jsonp(req.data); // If fooSchema.sanitize success, there will be a 'data' field contains sanitized data.
    } catch (e) {
        res.jsonp(500, e.path + ': ' + e.message); // Echo what's wrong.
    }
});
```
