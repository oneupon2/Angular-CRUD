import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  [x: string]: any;

  constructor(private store : AngularFirestore ) {}
  ngOnInit(): void {
    this.getData()
  }

  StudentData :string[] = [
    "id",
    "name",
    "rollNo",
    "email",
    "phonenumber",
    "Delete",
    "Edit",
  ];
  table:any
  dataSource:any
  name:any
  rollno:any
  email:any
  phonenumber:any

  addData(){
    this.store.collection("StudentData").add({
      name : this.name,
      rollNo : this.rollno,
      email : this.email,
      phonenumber : this.phonenumber
    }); 
}


  deleteData(id:any){
    this.store.collection("StudentData").doc(id).delete();
  }

  editData(id:any){
    console.log(id);
    // console.log(this.store.collection("StudentData").doc(id).data());
  }

  getData(){
    this.store.collection("StudentData").snapshotChanges().subscribe((response) => {
      this.dataSource = response.map((item) => {
        return Object.assign(
          {
            id: item.payload.doc.id
          },
          item.payload.doc.data()
        );
      });
    });
  }
}