# organic-dna-loader

Simple utility module exporting function for loading and transforming DNA into
in-memory object representation.

Combines :

* "organic-dna-fsloader v1.1.0" for loading .json and .yaml files
* "organic-dna-cellmodes v0.1.1"
* "organic-dna-resolve v1.1.0"

## api & usage

* `process.env.CELL_MODE` if present is used to fold respective
`DNA[CELL_MODE]` branch into root unless `dnaMode` is provided as 
within options argument


### load from default `cwd + '/dna'`

```
var loadDNA = require('organic-dna-loader')
loadDNA(function(err, dna){

})
```

### load from custom directory

```
var loadDNA = require('organic-dna-loader')
loadDNA('./directory/dna', function(err, dna){

})
```

### load with options

```
var loadDNA = require('organic-dna-loader')
loadDNA({
  dnaSourcePath: './directory/dna',
  dnaMode: 'customMode'
}, function(err, dna){

})
```

### load from multiple sources


```
var loadDNA = require('organic-dna-loader')
loadDNA({
  dnaSourcePaths: [
    './directory/dna',
    './directory2/dna2'
  ],
  dnaMode: 'customMode'
}, function(err, dna){

})
```

### dna load hooks

```
var loadDNA = require('organic-dna-loader')
loadDNA({
  beforeResolve: function (dna) { return dna },
  afterResolve: function (dna) { return dna }
}, function(err, dna){

})
```