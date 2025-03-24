// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // 1. Create a status bar item
    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left
    );
    statusBarItem.tooltip = 'Accumulated earnings since starting work today';
    statusBarItem.show();

    // 2. Load configuration and calculate salary metrics
    //    Note: We've extracted the loading & calculation logic into a separate function
    let wagePerSecond = 0;
    let startWorkTime = new Date();

    const loadConfigAndCompute = () => {
        // Read current configuration
        const config = vscode.workspace.getConfiguration('time-is-money');
        const monthlySalary = config.get<number>('monthlySalary', 60000);
        const startWorkTimeString = config.get<string>('startWorkTime', '09:00:00');

        // Calculate per-second wage
        const secondsPerMonth = 240 * 60 * 60; // 240 hours
        wagePerSecond = monthlySalary / secondsPerMonth;

        // Today's work start time
        const now = new Date();
        const [hh, mm, ss] = startWorkTimeString.split(':').map(Number);
        startWorkTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh || 0, mm || 0, ss || 0);
    };

    // Execute once initially to load current configuration
    loadConfigAndCompute();

    // 3. Define function to update the display
    const updateSalary = () => {
        const currentTime = new Date();
        if (currentTime < startWorkTime) {
            statusBarItem.text = `Earned $0.00`;
            return;
        }
        const elapsedSeconds = (currentTime.getTime() - startWorkTime.getTime()) / 1000;
        const earned = wagePerSecond * elapsedSeconds;
        statusBarItem.text = `Earned $${earned.toFixed(2)}`;
    };

    // 4. Update status bar every second
    const intervalId = setInterval(updateSalary, 1000);

    // 5. Listen for configuration changes
    const configChangeDisposable = vscode.workspace.onDidChangeConfiguration((e) => {
        // Reload if the user changed any "time-is-money.xxx" settings
        if (
            e.affectsConfiguration('time-is-money.monthlySalary') ||
            e.affectsConfiguration('time-is-money.startWorkTime')
        ) {
            loadConfigAndCompute(); // Recalculate per-second wage and work start time
        }
    });

    // Add items that need to be disposed/released when the extension is deactivated
    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(configChangeDisposable);
    context.subscriptions.push({
        dispose: () => clearInterval(intervalId)
    });
}

// This method is called when your extension is deactivated
export function deactivate() { }














