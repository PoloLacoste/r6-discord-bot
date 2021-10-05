# Changelog

## 1.5.0 - 06/10/2021

Update r6-api-caching for Crystal Guard

## 1.4.1 - 30/09/2021

Handle null result
Added region to rank command

## 1.4.0 - 16/08/2021

Update r6-api-caching
Update readme
Fix security issues
Added server status command

## 1.3.2 - 29/04/2021

Bump r6-api-caching

## 1.3.1 - 24/04/2021

Fix author id

## 1.3.0 - 24/04/2021

Rename getR6 and setR6 to getLink and setLink.
Added help command
Changed command prefix to "!"

## 1.2.1 - 27/01/2021

Updated r6-api-caching version (fixed caching in mongodb).

## 1.2.0 - 25/01/2021

General stats.

### Added

- General stats with command `stats`

## 1.1.0 - 25/01/2021

Logging improvement.

### Added

- Using [tslog](https://tslog.js.org/) as a logger.
- Added logging for connection and each command call.

## 1.0.0 - 24/01/2021

Initial release

### Added

- Commands (id, level, playtime, rank, get or set r6 username).