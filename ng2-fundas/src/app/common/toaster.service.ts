import { Injectable } from '@angular/core';

declare let toastr;
@Injectable()
export class ToasterWrapperService {

    constructor() { }

    doSuccess(message: string, title?: string) {
        toastr.success(message, title);
        
    }

    doError(message: string, title?: string) {
        toastr.error(message, title);
    }

    doInfo(message: string, title?: string) {
        toastr.info(message, title);
    }

    doWarning(message: string, title?: string) {
        toastr.warning(message, title);
    }


}