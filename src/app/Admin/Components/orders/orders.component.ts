import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/Orders.service';
import { Order } from '../../../Models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  Order:Order = new Order();
  Orders:Order[]=[];
  cols: {}[];
  constructor(private service: OrderService) { }

  async setCols() {
    this.cols = [
      { field: 'userName', header: 'Username' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'address', header: 'Address' },
      { field: 'isCompleted', header: 'Status' },
      { field: 'action', header: 'Action' },
    ];
  }
  edit(data:any){
    this.service.CompeleteOrder(data.id).subscribe(data => {
      this.GetAllOrders();
    })
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
