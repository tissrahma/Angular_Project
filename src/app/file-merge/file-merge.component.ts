import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-merge',
  templateUrl: './file-merge.component.html',
  styleUrls: ['./file-merge.component.css']
})
export class FileMergeComponent {
  selectedFiles: File[] | undefined;
  mergeStatus: string | undefined;

  constructor(private http: HttpClient) {}

  onFileSelect(event: any) {
    this.selectedFiles = event.target.files;
  }

  mergeFiles() {
    if (this.selectedFiles && this.selectedFiles.length >= 2) {
      const formData = new FormData();

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.http.post('https://localhost:7045/api/XMlFiles/merge', formData).subscribe(
        response => {
          console.log('Merge API response:', response);
          // Handle the response as needed
          this.mergeStatus = 'Merge is done!';
        },
        error => {
          console.error('Merge API error:', error);
          // Handle the error as needed
          this.mergeStatus = 'Error occurred during merge.';
        }
      );
    } else {
      console.warn('Please select at least two files.');
    }
  }
}

