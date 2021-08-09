const Path = require("path");
const FS = require("fs");
const path = require("path");
const { getVideoDurationInSeconds } = require("get-video-duration")
const FileExtension = ['.mp4', '.pdf'] // SUPPORTED FILE EXTENSIONS, COULD ADD MORE.

const DurationFetcher = async(Absolute) => {
    let durr;
    await getVideoDurationInSeconds(Absolute).then((duration) => {
        durr = duration // HOW TO RETURN 2 INSTANCES AT THE SAME TIME BECASE OF THE ASYNC PREOPERTY. THIS GETS EXECUTED LAST. CLEAR THE ARRAY AFTER YOU CALL AN INSTANCE OF THIS ARRAY.
    }).catch(err => {
        console.error(err);
    })
    return durr; //an object containing movie name, path and duration of that specific file.
}

/**
 *               THE DIRECTORIES FUNCTION
 * This function is used to check a directory for existing files
 * and folders within it. When it encounters a directory, it will
 * recursivley check the directory for files within it.
 *
 * */

let Files = []; // THE ARRAY USED TO STORE THE NAME AND ADDRESS OF THE FILES IN A DIRECTORY.
const Directories = (Directory) => {

    try {
        FS.readdirSync(Directory).forEach(async File => { // READ ALL THE FILES AND FOLDERS IN A CERTAIN DIRECTORY. (Non recusive + returns an array of files within that directory)
            const Absolute = Path.join(Directory, File); // THE DIRECTORY GIVEN AND THE FILE ARE LINKED.(I.E. "D:\\FOLDER\\FILE OR D:\\FOLDER\\FOLDER")

            // IF ABSOLUTE IS A DIRECTORY, RECURSIVLEY CHECK THE DIRECTORY, ELSE STORE THE PATH IN THE ARRAY. (EMPTY FOLDERS AREN'T REGISTERED.)
            if (FS.statSync(Absolute).isDirectory()) {
                return Directories(Absolute);
            } else { // IF THE FILE TYPE IS FOUND IN ONE OF THE ELEMENTS OF THE 'FileExtension' ARRAY, ADD IT TO THE ARRAY 'Files', IF NOT, DONT.
                if (Path.extname(Absolute) === FileExtension[0]) {
                    let theDur = await DurationFetcher(Absolute);
                    Files.push({ Movie: File, Location: Absolute, Duration: theDur }); // change the Duration
                } else {
                    return;
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
    return Files; // RETURN THE FILES/DIRECTORIES IN THE ARRAY.
}

/**
 *                  The FinalDirectory Function
 * Honestly, I didn't know what to name this function lol. But this function
 * is used to read the contents of the text file in the database folder and
 * pass it as a parameter to the Directories function.
 *
 */
const FinalDir = (finalDirPath) => {
    let fullFilePath = path.join(__dirname, finalDirPath);

    let AllFiles = [];
    const array = FS.readFileSync(fullFilePath).toString().replace(/\r\n/g, '\n').split('\n');

    while (array[array.length - 1] == "" || array[array.length - 1].trim() == "") {
        array.pop();
    }

    for (let i of array) {
        AllFiles = Directories(`${i}`);
    }
    return AllFiles;
}

const GetFiles = (addy) => {
    FinalDir(addy);
}

/**
 *                  The AddDirectory Function
 * This function is used to add a new directory that has been sent from the user.
 * This function is invoked from the POST method of the '/dapi/save' location in
 * index.js.
 *
 */
const AddDirectory = (Directory) => {
    FS.writeFileSync('../Database/addresses.txt', `${Directory}\n`, 'utf8'); // READ THE CONTENTS OF THE FILE SYNCHRONOUSLY.
}

const cleanFiles = () => {
    Files = [];
}

module.exports = { FinalDir, AddDirectory, cleanFiles, GetFiles };