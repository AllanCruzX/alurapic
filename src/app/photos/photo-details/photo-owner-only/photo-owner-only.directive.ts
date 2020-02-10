import { Directive, ElementRef, Renderer, OnInit } from "@angular/core";
import { Photo } from "../../photo/photo";
import { Input } from "@angular/core";
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector :'[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit{

    //Observables associados ao pipe async são liberados quando o componente cujo o template faz parte é destruído, livrando o desenvolvedor desta responsabilidade.
    //Permite que o template de um componente realize a inscrição de um observable fornecendo o valor emitido diretamente no template.

    @Input() ownedPhoto: Photo;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
) {}

    ngOnInit() : void {
        this.userService
            .getUser()
            .subscribe(user => {
                 if(!user || user.id != this.ownedPhoto.userId) {
                    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
                }
            });
        }   
}

