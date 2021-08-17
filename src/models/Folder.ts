import IFile from './FIle'

export interface IFolder {
  id: string,
  name: string,
  files: IFile[]
}