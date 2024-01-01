import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssistantResponses } from './responses';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss'],
})
export class UserChatComponent implements OnInit, AfterViewChecked {
  messageForm: FormGroup;
  messages: { owner: string; text: string; timestamp: Date }[] = [];

  private previousScrollHeight: number = 0;

  @ViewChild('conversationContainer') conversationContainer!: ElementRef;

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario con validación
    this.messageForm = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void {
      console.log("Welcome to the ramdom chat")
  }

  sendMessage($event: Event) {
    $event.preventDefault();
    const userMessage = this.messageForm.get('message')?.value.trim();

    // Agregar el mensaje del usuario a la lista de mensajes
    this.messages.push({
      owner: 'user_r',
      text: userMessage,
      timestamp: new Date(),
    });

    // Limpiar el campo de entrada después de enviar el mensaje
    this.messageForm.get('message')?.setValue('');

    // Simular un retardo antes de que el asistente responda (puedes ajustar el tiempo según tus necesidades)
    setTimeout(() => {
      // Luego, obtén la respuesta del chatbot
      const chatbotResponse = this.obtenerRespuestaDelChatbot();

      // Agregar la respuesta del chatbot a la lista de mensajes
      this.messages.push({
        owner: 'user_l',
        text: chatbotResponse,
        timestamp: new Date(),
      });


    }, 1000); // Retardo de 1 segundo (1000 milisegundos)
  }

  obtenerRespuestaDelChatbot(): string {
    // Puedes implementar la lógica para obtener una respuesta del chatbot aquí
    // Por ahora, simplemente devuelve una respuesta aleatoria del array
    const respuestas = AssistantResponses;

    return respuestas[Math.floor(Math.random() * respuestas.length)];
  }

  cleanChat(){
    this.messages = []
  }

  ngAfterViewChecked(): void {
    const container = this.conversationContainer.nativeElement;
    const shouldScroll = container.scrollHeight !== this.previousScrollHeight;

    if (shouldScroll) {
      this.scrollToBottomSmooth();
      this.previousScrollHeight = container.scrollHeight;
    }
  }

  scrollToBottomSmooth(): void {
    const container = this.conversationContainer.nativeElement;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth', // Utiliza la opción 'smooth' para un desplazamiento suave
    });
  }
}
