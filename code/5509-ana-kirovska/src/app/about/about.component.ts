import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  student = {
    name: 'John Doe',
    major: 'Computer Science',
    university: 'XYZ University',
    yearOfStudy: 2025,
    gitProfile: "https://github.com/272727ana"
  };

  currentYear: number = new Date().getFullYear();
}
