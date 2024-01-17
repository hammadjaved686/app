import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  dataFromParent = 'Data of Parent';
  constructor(private router: Router){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole !== null && storedUserRole==='customer') {
      // this.router.navigate(['l'])
    }
  }
  receiveDataFromChild(data: string) {
    console.log('Received data from child:', data);
    debugger
    this.dataFromParent =data;
  }
  changeParentData(){
    this.dataFromParent = 'Data of Parent';

  }
}
