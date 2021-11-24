const vscode = require('vscode');
const fileSystem = require('fs');
const imageUtils = require('./src/image_utils');

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {

	const command = 'flutter-image-assets.generate';
	const commandHandler = async (args) => {
		const destinationPath = getDestinationPath(args);

		if (destinationPath) {
			const imagePath = await getImagePath();

			// generating images for (1x, 2x, and 3x)
			for (let mode = 1; mode < 4; mode++) {
				imageUtils.scaleImageToMode(destinationPath, imagePath, mode);
			}
		}
	}

	context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}

/**
 * @param {string} args
 */
const getDestinationPath = (args) => {
	if (args) {
		const uri = vscode.Uri.parse(args);
		const path = uri.fsPath;
		const exists = fileSystem.existsSync(path);
		const isDirectoryAndExists = exists ? isDirectory(path) : false;

		if (isDirectoryAndExists) {
			return path;
		} else {
			vscode.window.showErrorMessage(`The '${path}' isn't a directory.`);
		}
	} else {
		vscode.window.showErrorMessage(`Can't run the command without a destination directory.`);
	}
}
/**
 * 
 * @returns The path of the image file that where selected through the vscode open dialog
 */
const getImagePath = async () => {
	const options = {
		canSelectMany: false,
		openLabel: 'Select Image',
		filters: { 'Images': ['png', 'jpg', 'jpeg', 'JPG', 'JPEG'] }
	};

	const uri = await vscode.window.showOpenDialog(options);
	if (uri && uri[0]) {
		return uri[0].fsPath;
	}
}

/**
 * @param {string} path
 */
const isDirectory = (path) => {
	try {
		return fileSystem.lstatSync(path).isDirectory();
	} catch (e) {
		return false;
	}
}

// this method is called when your extension is deactivated
const deactivate = () => { }

module.exports = {
	activate,
	deactivate
}
