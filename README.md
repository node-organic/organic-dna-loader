# organic-dna-loader

Simple utility module exporting function for loading and transforming DNA into
in-memory object representation.

Combines :

* "organic-dna-fsloader v1.1.0" for loading .json and .yaml files
* "organic-dna-cellmodes v0.1.1"
* "organic-dna-resolve v1.1.0"

## api & usage

* `process.env.CELL_MODE` if present is used to fold respective
`DNA[CELL_MODE]` branch into root unless `dnaMode` is provided 
within options


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
  beforeResolve: async function (dna) { },
  afterResolve: async function (dna) { }
}, function(err, dna){

})
```

### load dna as Promise

```
const loadDNA = require('organic-dna-loader')
let dna = await loadDNA(options)
```