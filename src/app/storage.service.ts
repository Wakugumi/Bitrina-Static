import { Injectable } from '@angular/core';
import { promises } from 'dns';
import * as Storage from 'firebase/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from './model/file-upload.model'


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    
  }

  ref = Storage.getStorage();

  /**
   * Upload a file as blob
   * @param ref for storage reference location
   * @return URL of the file
   */
  uploadFile( location: string, id : string, data: File )
    {

      const UploadTask = Storage.uploadBytesResumable
      (Storage.ref(this.ref, location), data)

      UploadTask.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress + " % uploaded");
        return progress;
      }, (error) => {
        throw error
      }, () => {
        Storage.getDownloadURL(Storage.ref(this.ref, location)).then((value) => {
          return (value)
        })
      })
  }
  
}
