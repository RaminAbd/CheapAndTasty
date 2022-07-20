import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/Orders.service';
import { Order } from '../../../Models/Order';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  Order:Order = new Order();
  Orders:Order[]=[];
  cols: {}[];
  constructor(private service: OrderService,private dialog: MatDialog) { }

  async setCols() {
    this.cols = [
      { field: 'orderNumber', header: 'Order Number' },
      { field: 'userName', header: 'Username' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'address', header: 'Address' },
      { field: 'isCompleted', header: 'Status' },
      { field: 'action', header: 'Action' },
    ];
  }
  edit(data:any){
    console.log(data);
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      height: '400px',
      width: '600px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetAllOrders()
      console.log(result);

    });


  }
  ngOnInit(): void {
    this.setCols();
    this.GetAllOrders();
  }
  GetAllOrders(){
    this.service.GetAllOrders().subscribe(data=>{
      this.Orders = data.data
    })
  }
}
