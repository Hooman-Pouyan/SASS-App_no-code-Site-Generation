import {Injectable} from '@angular/core';
import {_window} from "@app/modules/global/global-variable";
import {CredentialsService} from "@app/core/services/credentials.service";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {ModulesService} from "@app/core/services/modules.service";
import {NotificationService} from "@app/core/services/notification.service";
import {AppService} from "@app/core/services/app.service";

interface MatDragDropDistance {
  x: number,
  y: number,
}

export interface DragDropValueModel {
  x_desktop?: number,
  y_desktop?: number,
  x_tablet?: number,
  y_tablet?: number,
  x_mobile?: number,
  y_mobile?: number,
  isEdited?: boolean,
  text?: string,
  text_en?: string,
  link?: string,
  font?: string,
  id?: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  private _dragsPositions: DragDropValueModel[] = []

  systemType: 'mobile' | 'desktop' | 'tablet' = 'desktop'

  constructor(
    private credentialService: CredentialsService,
    private httpClient: HttpClient,
    private modulesService: ModulesService,
    private notificationService: NotificationService,
    private appService: AppService
  ) {
    const windowWidth: number = _window.innerWidth
    if (windowWidth > 1024) {
      this.systemType = 'desktop'
    } else if (windowWidth > 650) {
      this.systemType = 'tablet'
    } else {
      this.systemType = 'mobile'
    }
  }

  get disabled(): boolean {
    return !this.credentialService.isAdmin
  }

  getDragDrop(update?: boolean): void {
    this.getDragDropValues().subscribe(res => {
      this._dragsPositions = res
      if (update == true) {
        this.appService.refresh()
      }
    })
  }

  setDragDrop(): void {
    const _dragDrops: DragDropValueModel[] = this._dragsPositions.filter(f => f.isEdited == true)
    this.setDragDropValues(_dragDrops).subscribe(() => {
      this.notificationService.valid('با موفقیت ثبت شد')
      this.getDragDrop(true);
    })
  }

  dropEvent(event: MatDragDropDistance, name): void {
    const drag = this._dragsPositions.find(f => f.name == name);
    if (drag) {
      drag[`x_${this.systemType}`] += event.x;
      drag[`y_${this.systemType}`] += event.y;
      drag.isEdited = true
    }
  }

  findPosition(name: string): MatDragDropDistance {
    const drag = this._dragsPositions.find(f => f.name == name);
    if (drag) {
      return {
        x: drag[`x_${this.systemType}`],
        y: drag[`y_${this.systemType}`]
      }
    }
    this._dragsPositions.push({
      name: name,
      'x_desktop': 0,
      'y_desktop': 0,
      'x_mobile': 0,
      'y_mobile': 0,
      'x_tablet': 0,
      'y_tablet': 0,
      font: this.modulesService.font,
      link: '',
      text: '',
      text_en: '',
      isEdited: true
    })
    return
  }

  get editedDragDrop(): boolean {
    return !!this._dragsPositions.find(f => f.isEdited == true);
  }

  editElement(newDrag: DragDropValueModel): void {
    const _idx: number = this._dragsPositions?.findIndex(f => f.name == newDrag.name)
    if (_idx >= 0) {
      this._dragsPositions[_idx].text = newDrag.text;
      this._dragsPositions[_idx].text_en = newDrag.text_en;
      this._dragsPositions[_idx].link = newDrag.link;
      this._dragsPositions[_idx].isEdited = true;
    } else {
      this._dragsPositions.push({
        name: newDrag.name,
        text: newDrag.text,
        text_en: newDrag.text_en,
        link: newDrag.link,
        x_desktop: 0,
        y_desktop: 0,
        x_tablet: 0,
        y_tablet: 0,
        x_mobile: 0,
        y_mobile: 0,
        isEdited: true,
      })
    }
  }

  findOneByName(name: string): DragDropValueModel | undefined {
    return this._dragsPositions?.find(f => f.name == name)
  }

  fieldText(name: string): string {
    const _dragPosition = this._dragsPositions?.find(f => f.name == name)
    if (_dragPosition && _dragPosition?.text && _dragPosition?.text != 'undefined') {
      return this._dragsPositions.find(f => f.name == name).text
    } else {
      return null
    }
  }

  fieldLink(name: string): string {
    const _dragPosition = this._dragsPositions?.find(f => f.name == name)
    if (_dragPosition && _dragPosition?.link && _dragPosition?.link != 'undefined') {
      return this._dragsPositions.find(f => f.name == name).link
    } else {
      return null
    }
  }

  ////// http services

  getDragDropValues() {
    return this.httpClient.get('/api/landing/sections').pipe(
      map((response: DragDropValueModel[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  setDragDropValues(dragDrops: DragDropValueModel[]) {
    return this.httpClient.put('/api/landing/sections/sort', dragDrops).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
