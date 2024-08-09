# Playwright boilerplate

A Playwright boilerplate project that provides a basic structure and pre-configured setup. It includes the necessary files, directories, and configurations needed to get a project up and running quickly, without having to set up everything from scratch.

## System requirements

- Node.js 18+
- Operating system:
  - Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
  - macOS 13 Ventura, or macOS 14 Sonoma.
  - Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture.

## Setup

```Shell
# Install dependencies.
npm i

# Install Playwright browsers.
npx playwright install

# Install Playwright operating system dependencies.
sudo npx playwright install-deps
```

## Running tests

```Shell
# Run the end-to-end tests.
npm test

# Start the interactive UI mode.
npm run ui

# Run the tests in debug mode.
npm run debug
```

## Viewing the Last Test Report

```Shell
# To open the most recent HTML report in your default browser:
npx playwright show-report
```
