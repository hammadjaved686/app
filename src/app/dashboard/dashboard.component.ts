import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
receivedData: string = '';
  router: any;
fun(){
        // this.router.navigate(['/authentication/login']);

}
  receiveData(data: string) {
    // Receive data from HeaderComponent
    this.receivedData = data;
  }
}
