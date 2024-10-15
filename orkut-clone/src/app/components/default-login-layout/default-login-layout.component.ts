import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input() title: string = "";
  @Input() btnText: string = "";
  @Output("submit") onSubmit = new EventEmitter();

  submit(){
    this.onSubmit.emit();
  }
}
