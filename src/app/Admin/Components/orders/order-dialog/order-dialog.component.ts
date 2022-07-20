import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../../../Services/Orders.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private orderService:OrderService) { }

  ngOnInit(): void {
    console.log(this.data);

  }
  closeDialog() {
    this.dialogRef.close();
  }
  CompleteOrder(){
    this.orderService.CompeleteOrder(this.data.id).subscribe(data => {
        console.log(data);
        if(data.isSuccess){
          this.dialogRef.close()
        }
    })
  }
}
