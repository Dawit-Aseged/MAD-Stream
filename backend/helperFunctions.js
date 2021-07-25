const Path = require("path");
const FS = require("fs");

const FileExtension = ['.mp4', '.pdf'] // SUPPORTED FILE EXTENSIONS, COULD ADD MORE.

/**
 *               THE DIRECTORIES FUNCTION
 * This function is used to check a directory for existing files
 * and folders within it. When it encounters a directory, it will
 * recursivley check the directory for files within it.
 * 
 * */

let Files = []; // THE ARRAY USED TO STORE THE NAME AND ADDRESS OF THE FILES IN A DIRECTORY.

const Directories = (Directory) => {

    FS.readdirSync(Directory).forEach(File => { // READ ALL THE FILES AND FOLDERS IN A CERTAIN DIRECTORY. (Non recusive + returns an array of files within that directory)
        const Absolute = Path.join(Directory, File); // THE DIRECTORY GIVEN AND THE FILE ARE LINKED.(I.E. "D:\\FOLDER\\FILE OR D:\\FOLDER\\FOLDER")

        // IF ABSOLUTE IS A DIRECTORY, RECURSIVLEY CHECK THE DIRECTORY, ELSE STORE THE PATH IN THE ARRAY. (EMPTY FOLDERS AREN'T REGISTERED.)
        if (FS.statSync(Absolute).isDirectory()) {
            return Directories(Absolute);
        } else { // IF THE FILE TYPE IS FOUND IN ONE OF THE ELEMENTS OF THE 'FileExtension' ARRAY, ADD IT TO THE ARRAY 'Files', IF NOT, DONT.
            if (Path.extname(Absolute) === FileExtension[0]) {
                return Files.push({ Movie: File, Location: Absolute });
            } else {
                return;
            }
        }
    });

    return Files; // RETURN THE FILES/DIRECTORIES IN THE ARRAY.
}

const FinalDir = (finalDirPath) => {
    let AllFiles = '';
    const array = FS.readFileSync(finalDirPath).toString().replace(/\r\n/g, '\n').split('\n');

    for (let i of array) {
        AllFiles = Directories(`${i}`);
    }

    return AllFiles;
}

module.exports = { Directories, FinalDir };