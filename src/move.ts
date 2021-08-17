import * as fs from "fs";

// Please update this type as same as with the data shape.
import { IFolder } from "./models/Folder";
import IFile from "./models/FIle";

export default function move(list: IFolder[], source: string, destination: string): IFolder[] {
  let foundedFile: IFile = { id: '', name: '' };
  let sourceFolderName;

  for (const folder of list) {
    foundedFile = folder.files.find(file => file.id === source) as IFile;

    if (foundedFile) {
      sourceFolderName = folder.name;
      break;
    }
  }

  if (!foundedFile) throw new Error('You cannot move a folder');

  let destinationFolder = list.find(folder => folder.id === destination);
  let destinationFolderIndex = list.findIndex(folder => folder.id === destination);

  if (!destinationFolder) throw new Error('You cannot specify a file as the destination');

  fs.rename(`./${sourceFolderName}/${foundedFile.name}`, `./${destinationFolder.name}/${foundedFile.name}`, () => { });


  list.forEach(folder => {
    folder.files = folder.files.filter(file => file.id !== foundedFile.id);
  });

  list[destinationFolderIndex].files.push(foundedFile);

  return list;
}