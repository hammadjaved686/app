import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  dataFromParent = 'Data of Parent';
  receiveDataFromChild(data: string) {
    console.log('Received data from child:', data);
    debugger
    this.dataFromParent =data;
  }
  changeParentData(){
    this.dataFromParent = 'Data of Parent';

  }
}
