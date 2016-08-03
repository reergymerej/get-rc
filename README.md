# get-rc

easily load runtime configuration files


## Usage

### setConfigName(name)
* name {String}

Sets the name of the config file we're looking for.  You only have to call this
once.

```js
setConfigName('.foorc')  
```

### getConfig([path])
* path {String} - defaults to process.cwd()  

Gets config files specified in [setConfigName]() in each level of the path.
Configs are merged together with the most local to `path` taking precedence.
Also checks the user's HOME directory.  An object will *always* be returned,
even if no config is found or there are problems parsing one or more of them.

```js
const config = getConfig('/foo/bar/baz');
```







---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
