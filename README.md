# organic-dna-loader

Simple utility module exporting function for loading and transforming DNA into
in-memory object representation.

Combines :

* "organic-dna-fsloader"
* "organic-dna-cellmodes"
  * "organic-dna-fold"
  * "organic-dna-branches"
* "organic-dna-resolve"

## api & usage

* :warning: `process.env.CELL_MODE` if present is used to fold respective
`DNA[CELL_MODE]` branch into root


### load from default `cwd + '/dna'`

```
var dnaLoader = require('organic-dna-loader')
dnaLoader(function(err, dna){

})
```

### load from custom directory

```
var dnaLoader = require('organic-dna-loader')
dnaLoader('./directory/dna', function(err, dna){

})
```
