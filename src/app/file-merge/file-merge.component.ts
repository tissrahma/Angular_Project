import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-merge',
  templateUrl: './file-merge.component.html',
  styleUrls: ['./file-merge.component.css']
})
export class FileMergeComponent implements OnInit {
  selectedFiles: any[] = [];
  mergeStatus: string | undefined = '';
  mergedFiles: any[] = [];
  uploadedFiles: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMergedFiles();
  }

  onFileSelect(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  fetchMergedFiles() {
    this.http.get<any[]>('https://localhost:7045/api/XMlFiles/mergedfiles').subscribe(
      response => {
        this.mergedFiles = response;
      },
      error => {
        console.error('Fetch merged files error:', error);
      }
    );
  }

  uploadSelectedFiles() {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();

      for (const file of this.selectedFiles) {
        formData.append('files', file);
      }

      this.http.post('https://localhost:7045/api/XMLFiles/upload', formData).subscribe(
        response => {
          console.log('Upload API response:', response);
          // Handle the response as needed
          this.fetchUploadedFiles(); // Refresh the uploaded files list
        },
        error => {
          console.error('Upload API error:', error);
          // Handle the error as needed
        }
      );
    }
  }

  fetchUploadedFiles() {
    this.http.get<any[]>('https://localhost:7045/api/XMLFiles/uploadedfiles').subscribe(
      response => {
        this.uploadedFiles = response;
      },
      error => {
        console.error('Fetch uploaded files error:', error);
      }
    );
  }
  deleteFile(fileId: any) {
    this.http.delete(`https://localhost:7045/api/XMLFiles/delete/${fileId}`).subscribe(
      response => {
        console.log('Delete API response:', response);
        this.fetchMergedFiles();
      },
      error => {
        console.error('Delete API error:', error);
      }
    );
  }
  mergeFiles() {
    if (this.selectedFiles && this.selectedFiles.length >= 2) {
      const formData = new FormData();

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.http.post('https://localhost:7045/api/XMLFiles/merge', formData).subscribe(
        response => {
          console.log('Merge API response:', response);
          // Handle the response as needed
          this.mergeStatus = 'Merge is done!';
          this.fetchMergedFiles();
           // Refresh the merged files list
        },
        error => {
          console.error('Merge API error:', error);
          // Handle the error as needed
          this.mergeStatus = 'Error occurred during merge.';
         
        }
      );
    } else {
      this.mergeStatus = 'Error occurred during merge.';
    }
  }
}

// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-file-merge',
//   templateUrl: './file-merge.component.html',
//   styleUrls: ['./file-merge.component.css']
// })
// export class FileMergeComponent {
//   selectedFiles: File[] | undefined;
//   mergeStatus: string | undefined;

//   constructor(private http: HttpClient) {}

//   onFileSelect(event: any) {
//     this.selectedFiles = event.target.files;
//   }

//   mergeFiles() {
//     if (this.selectedFiles && this.selectedFiles.length >= 2) {
//       const formData = new FormData();

//       for (let i = 0; i < this.selectedFiles.length; i++) {
//         formData.append('files', this.selectedFiles[i]);
//       }

//       this.http.post('https://localhost:7045/api/XMLFiles/merge', formData).subscribe(
//         response => {
//           console.log('Merge API response:', response);
//           // Handle the response as needed
//           this.mergeStatus = 'Merge is done!';
//         },
//         error => {
//           console.error('Merge API error:', error);
//           // Handle the error as needed
//           this.mergeStatus = 'Error occurred during merge.';
//         }
//       );
//     } else {
//       console.warn('Please select at least two files.');
//     }
//   }
// }