#web-schemas

  A schema parser for web.
  
## Installation

```
npm install web-schemas
```

## Usage

```js
// Express app configuration...
// blabla...

var webSchemas = require('web-schemas'),
    schemas = webSchemas.schemas,
    Schema = webSchemas.Schema;

var fooSchema = new Schema({
    foo: schemas.int.gt(3).lt(5).required(), // foo should between 3~5, and not undefined.
    bar: {
        a: [{ val: schemas.string.len(3, 8) }], // val.length should between 3~8.
        b: { val: schemas.date } // val is a Date object.
    }
});

// { foo: '4', bar: { a:[ { val: '6' } ], b: '2014-01-30' } will be parsed as { foo: 4, bar: { a: [ { val: 6 } ], b: Date('2014-01-30') } }

// koa
app.use(route.get('/foo', function *() {
    this.body = fooSchema.parse(this.query);
}));

// express
app.get('/foo', function (req, res) {
    try {
        var data = fooSchema.parse(req.query);
        res.jsonp(data); // If fooSchema.sanitize success, there will be a 'data' field contains sanitized data.
    } catch (e) {
        res.jsonp(500, e.path + ': ' + e.message); // Echo what's wrong.
    }
});
```

## Schemas
 - **int**
 - **number**
 - **string**
 - **date**
 - **bool**
 - ObjectSchema: create by **new webSchemas.Schema({ /* blabla */ })**
 - ArraySchema: create by **new webSchemas.Schema({ foo: [/* blabla */] })**

## Chaining
  Every schema type have chaining methods to add extra validate conditions/sanitize methods.

### Common
 - **default(val)** - if result is undefined, use val instead.
 - **in(arr)** - arr.indexOf(result) >= 0.
 - **notIn(arr)** - arr.indexOf(result) < 0.
  
### ObjectSchema
 - **required()** - required.

### ArraySchema
 - **required()** - required.
 - **len(min, max)** - min <= array.length <= max.

### IntSchema / NumberSchema / DateSchema
 - **required()** - required.
 - **gt(val)** - result > val.
 - **gte(val)** - result >= val.
 - **lt(val)** - result < val.
 - **lte(val)** - result <= val.

### StringSchema
 - **required()** - required.
 - **notEmpty()** - result !== '' && result !== undefined.
 - **len(min, max)** - min <= string.length <= max.
 - **is(pattern)** - pattern.test(string) === true.
 - **not(pattern)** - pattern.test(string) === false.
 - **contains(substr)** - string contains substr.
 - **notContains(substr)** - string not contains substr.
 - **isAlpha()** - string is alpha.
 - **isAlphanumeric()** - string is is alpha or numeric.
 - **isNumeric()** - string is is numeric.
 - **isHex()** - string is hex numberic.
 - **isHexColor()** - string is css hex color.
 - **isLowerCase()** - string is in lower case.
 - **isUpperCase()** - string is in upper case.
 - **isUUID()** - string is UUID
 - **isUUIDv3()** - string is UUIDv3
 - **isUUIDv4()** - string is UUIDv4
 - **isUUIDv5()** - string is UUIDv5
 - **isMd5()** - string is MD5.
 - **isObjectId()** - string is mongo ObjectId.
 - **isEmail()** - string is Email.
 - **isUrl()** - string is URL.
 - **isIPv4()** - string is IPV4.
 - **isIPv6()** - string is IPV6.
 - **toLowerCase()** - convert result to lower case.
 - **toUpperCase()** - convert result to upper case.
