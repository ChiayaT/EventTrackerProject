import { DayService } from './../../services/day.service';
import { Component } from '@angular/core';
import { Day } from 'src/app/models/day';

@Component({
  selector: 'app-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.css']
})
export class DayListComponent {

  title: string = 'Daily Logs';

  days: Day[] = [];

  addDayButton: boolean = false;

  selected: Day | null = null;
  newDay: Day = new Day();
  editDay: Day | null = null;

  getDayCount(): number{
    return this.days.length;
  }

  displayDay(day: Day): void{
    this.selected = day;
  }

  displayTable(): void{
    this.selected = null;
  }

  setAddDayButton(){
    this.addDayButton = true;
  }

  setEditDay(){
    this.editDay = Object.assign({}, this.selected);
  }
  constructor(private dayService: DayService){}

  reload(){
    this.dayService.index().subscribe({
      next:(days) => {
        this.days = days;
      },
      error: (err) => {
        console.log('DayListCommponent - error getting days: '+ err)
      }
    });
  }

  ngOnInit(): void{
    this.reload();
  }

  cancelAdd(){
    this.addDayButton = false;
    this.newDay = new Day();
  }

  addDay(day: Day): void{
    this.dayService.create(day).subscribe({
      next: () =>{
        if (day.rating === 0){
          day.rating = 1;
        }
        this.reload();
        this.newDay = new Day();
        this.addDayButton = false;
      },
      error: (err) => {
        console.error("DayList Componenet Error - Error retrieving days")
      }
    })
  }

  updateDay(day: Day, setSelected: boolean = true){
     this.dayService.update(day).subscribe({
       next: (day) => {
         if(setSelected){

           this.selected = day;
         }
         this.reload();
         this.editDay = null;
       },
       error: (param) => {
         console.error("DayList Componenet Error - Error retrieving days");
       }
     })
   }

  deleteDay(id: number){
    this.dayService.destroy(id).subscribe({
      next: () => {
        this.selected = null;
        this.reload();
        this.editDay = null;
      },
      error: (param) => {
        console.error("DayList Componenet Error - Error retrieving todos");
      }
    })
    //this.todos = this.todoService.index();

  }
}
