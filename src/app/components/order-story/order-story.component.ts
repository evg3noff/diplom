import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-story',
  templateUrl: './order-story.component.html',
  styleUrls: ['./order-story.component.scss']
})
export class OrderStoryComponent {

}