const Path = require("path");
const FS = require("fs");


let Files = []; // THE ARRAY USED TO STORE THE NAME AND ADDRESS OF THE FILES IN A DIRECTORY.

/**
 *               THE DIRECTORIES FUNCTION
 * This function is used to check a directory for existing files
 * and folders within it. When it encounters a directory, it will
 * recursivley check the directory for files within it.
 * 
 * */
const directories = (Directory) => {

    FS.readdirSync(Directory).forEach(File => { // READ ALL THE FILES AND FOLDERS IN A CERTAIN DIRECTORY. (Non recusive + returns an array of files within that directory)
        const Absolute = Path.join(Directory, File); // THE DIRECTORY GIVEN AND THE FILE ARE LINKED.(I.E. "D:\\FOLDER\\FILE OR D:\\FOLDER\\FOLDER")

        // IF ABSOLUTE IS A DIRECTORY, RECURSIVLEY CHECK THE DIRECTORY, ELSE STORE THE PATH IN THE ARRAY. (EMPTY FOLDERS AREN'T REGISTERED.)
        if (FS.statSync(Absolute).isDirectory()) {
            return directories(Absolute);
        } else { // IF THE FILE FOUND WITHIN A DIRECTORY IS AN '.MP4' FILE, ADD IT TO THE ARRAY, IF NOT, DONT. (CURRENTLY ONLY WORKING ON MP4 FILES).
            if (Path.extname(Absolute) === '.pdf') {
                return Files.push({ pathOfMovie: Absolute, movieName: File });
            } else {
                return;
            }
        }
    });

    return Files; // RETURN THE FILES/DIRECTORIES IN THE ARRAY.
}

//const allFiles = directories("C:\\Users\\amann\\Downloads\\Documents");
//console.log(allFiles)

module.exports = { directories };