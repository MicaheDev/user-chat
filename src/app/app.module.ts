import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [AppComponent, UserChatComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent, UserChatComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const customElementByAngular = createCustomElement(UserChatComponent, {
      injector: this.injector,
    });
    customElements.define('assistant-chat', customElementByAngular);
  }

  ngDoBootstrap(): void {}
}
