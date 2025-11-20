import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    AppHeaderComponent
  ]
})
export class UserDetailPage implements OnInit {
  id!: number;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    })
  }

  ngOnInit() {
  }
}
