# VSCode Time is Money Extension

A simple VS Code extension that shows how much money you've earned during your workday in real-time.

## Features

- Displays your accumulated salary in the status bar since the start of your workday
- Updates in real-time (refreshes every second)
- Configurable monthly salary and work start time
- Shows earnings in dollar amount

## Settings

This extension contributes the following settings:

- `time-is-money.monthlySalary`: Your monthly salary (default: 60000)
- `time-is-money.startWorkTime`: Your daily work start time in HH:MM:SS format (default: '09:00:00')

## How It Works

The extension:

1. Creates a status bar item to display your earnings
2. Calculates your per-second wage based on your monthly salary and a standard 240-hour work month
3. Determines the elapsed time since your work day began
4. Multiplies your per-second wage by the elapsed time to show real-time earnings
5. Updates continuously as you work

## Installation

1. Press `F5` to open a new window with the extension loaded
2. The extension will automatically display in the status bar once activated

## Configuration

1. Open VS Code settings (`Ctrl+,` or `Cmd+,` on Mac)
2. Search for "Time is Money"
3. Adjust your monthly salary and work start time as needed

## Requirements

- VS Code 1.74.0 or higher

## Development

- Clone this repository
- Run `npm install` to install dependencies
- Press `F5` to run the extension in a new VS Code window

## License

This project is licensed under the MIT License
