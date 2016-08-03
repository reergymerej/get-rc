# get-rc

easily load runtime configuration files

[![Build Status](https://travis-ci.org/reergymerej/get-rc.svg?branch=master)](https://travis-ci.org/reergymerej/get-rc)

![screen shot 2016-08-03 at 12 32 57](https://cloud.githubusercontent.com/assets/1720010/17375402/6ce33518-5976-11e6-97cd-63dea4799ecd.png)


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

Synchronously loads config files specified in [setConfigName](#setconfignamename)
in each level of the path.  Configs are merged together with the most local to
`path` taking precedence. Also checks the user's HOME directory.  An object will
*always* be returned, even if no config is found or there are problems parsing
one or more of them.

```js
const config = getConfig('/foo/bar/baz');
```







---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
