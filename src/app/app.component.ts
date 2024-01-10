import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geo-sol-app';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // const storedItems = localStorage.getItem('wishList');

    // if (!storedItems) {
    //   localStorage.setItem('wishList', JSON.stringify([]));
    // }
  }
}
