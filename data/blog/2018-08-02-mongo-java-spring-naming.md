---
layout: "post"
title: 'Spring mongo data naming'
published: "true"
tags: [mongo, spring]
date: "2018-08-02"
---

## Mongo Naming

## JSON Naming

[Google JSON Style Guide](https://google.github.io/styleguide/jsoncstyleguide.xml)

https://publicobject.com/2016/01/20/strict-naming-conventions-are-a-liability/  
Gson has built-in magic to convert snakes into camels with its LOWER_CASE_WITH_UNDERSCORES FieldNamingPolicy. We make a global configuration change to our Gson instance and the problem is solved.

## Java Naming

## Spring data mongo

https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#repositories.query-methods.query-property-expressions

```
8.4.3. Property Expressions
Property expressions can refer only to a direct property of the managed entity, as shown in the preceding example. At query creation time, you already make sure that the parsed property is a property of the managed domain class. However, you can also define constraints by traversing nested properties. Consider the following method signature:

List<Person> findByAddressZipCode(ZipCode zipCode);
Assume a Person has an Address with a ZipCode. In that case, the method creates the property traversal x.address.zipCode. The resolution algorithm starts by interpreting the entire part (AddressZipCode) as the property and checks the domain class for a property with that name (uncapitalized). If the algorithm succeeds, it uses that property. If not, the algorithm splits up the source at the camel case parts from the right side into a head and a tail and tries to find the corresponding property — in our example, AddressZip and Code. If the algorithm finds a property with that head, it takes the tail and continues building the tree down from there, splitting the tail up in the way just described. If the first split does not match, the algorithm moves the split point to the left (Address, ZipCode) and continues.

Although this should work for most cases, it is possible for the algorithm to select the wrong property. Suppose the Person class has an addressZip property as well. The algorithm would match in the first split round already, choose the wrong property, and fail (as the type of addressZip probably has no code property).

To resolve this ambiguity you can use _ inside your method name to manually define traversal points. So our method name would be as follows:

List<Person> findByAddress_ZipCode(ZipCode zipCode);
Because we treat the underscore character as a reserved character, we strongly advise following standard Java naming conventions (that is, not using underscores in property names but using camel case instead).
```

Mongo References:

- manual references

- DBRef
-

Manual references are named after the referenced collection. Use the document type (collection name in singular) followed by _id ( <document>_id ). This is the only case where you can use underscore in the middle.  
For example, in a dogs collection, a document would have manual references to external documents named like this:  
```json
{
  name: 'fido',
  owner_id: '5358e4249611f4a65e3068ab',
  race_id: '5358ee549611f4a65e3068ac',
  colour: 'yellow'
  ...
}
```

https://docs.mongodb.com/manual/reference/database-references/#document-references

Mongo follows javascript naming convention using camelCase

Mongo has no preference on camelCase v.s. underscore_style  
just stay consistent with the language.  
But also be consistent with on-wire json/xml format, also consider for Android/ iOS / Javascript web consumer sides.

http://christophermaier.name/2011/05/22/MongoDB-key-names/

different to relational database,  
in mongoldb, key names are stored in every document, so avoid using long names.

db.collection.stats()

using shorter keys can potentially save a lot of space and even increase performance (after all, more of a smaller database can fit into memory).  
WiredTiger engine in Mongo 3.0 supports compression, the point is rather moot.

http://arkusnexus.com/2016/09/12/coding-guidelines-mongodb/

GENERAL GUIDELINES

- Use tabs to indent. This applies to all MongoDB-specific code (chained functions) and objects used by MongoDB (queries, projections, documents).

- Always have a space after a : colon.

- Comma-last.  
  If you divide the components of an object/array into various lines, use one line for each component. The } closing curly brace should follow the last component (except for aggregation).  
  GENERAL GUIDELINES

- No _ underscores in the middle of names (database, collection, fields) except for manual references.

- Collections database, variables, properties and function names should use lowerCamelCase. They should also be descriptive. Single character variables and uncommon abbreviations should generally be avoided.

- Place spaces between nested parentheticals and elements in JavaScript examples. For example, prefer { [ a, a, a ] } over {[a,a,a]}.

COLLECTION NAMES

- The name should be a plural of the types of documents to be saved.

- Use camelCase. Normally you shouldn’t have to because the collection name will be one word (plural of the types of documents saved).

- A collection with “” empty string is not a valid collection name.

- A collection name should not contain the null character because this defines the end of collection name.

- Collection name should not start with the prefix “system.” as this is reserved for internal collections.

- It would be good to not contain the character “$” in the collection name as various drivers available for database do not support “$” in collection name.  
  DATABASE NAMES

- Try to have the database named after the project and one database per project.

- Use camelCase.

- A database with “” empty string is not a valid database name.

- Database name cannot be more than 64 bytes.

- Database name are case-sensitive, even on non-case-sensitive file systems. Thus it is good to keep name in lower case.

- A database name cannot contain any of these characters “/, \, ., “, \*, <, >, :, |, ?, $,”. It also cannot contain a single space or null character.  
  FIELD NAMES

- Use camelCase.

- Don’t use _ underscore as the starting character of the field name. The only field with _ underscore should be _id.

- Field names cannot contain . dots or null characters and must not start with a $ dollar sign.  
  Manual references are named after the referenced collection. Use the document type (collection name in singular) followed by _id ( <document>_id ). This is the only case where you can use underscore in the middle.  
  For example, in a dogs collection, a document would have manual references to external documents named like this:  
```json
{
  name: 'fido',
  owner_id: '5358e4249611f4a65e3068ab',
  race_id: '5358ee549611f4a65e3068ac',
  colour: 'yellow'
  ...
}
```
FUNCTIONS

- One method per line should be used when chaining methods.

- You should also indent these methods with a tab so it’s easier to tell they are part of the same chain.  
  If you need to use a long query, projection or options object for a function, assign it to a var and use the var in the function call to improve readability.