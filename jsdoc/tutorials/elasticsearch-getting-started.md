<p />
<p />
The  {@link com.devnup.ws.api.util.Elasticsearch Elasticsearch Util} is a wrapper for the official Elasticsearch Nodejs Module. It handles the module startup and configuration definitions, getting the Bonsai Host URL from the environment variables or from ```default.json``` configuration file. 
<p><br /></p>

**Useful links**
- {@link http://www.elasticsearch.org/guide/en/elasticsearch/client/javascript-api/current/index.html Official documentation}
- {@link https://github.com/elasticsearch/elasticsearch-js Github repository}
- {@link https://www.npmjs.org/package/elasticsearch NPM module page}
<p><br /></p>

**Getting started**

To use the module simply import the file using ```require```.

```javascript
var els = require('./path/to/els');

// Send ping request to server
els.ping({
  requestTimeout: 1000,
  hello: "elasticsearch!"
}, function (error) {
  console.log(error || "Ping successfully sent!");
});
```

<p><br /></p>
**Creating an index**

To create an index, use the method {@link com.devnup.ws.api.util.Elasticsearch create}
```javascript
els.indices.create({
  index: 'test'
}, function (err, result) {
  console.log(err || result);
});
```

<p><br /></p>
**Querying an index**