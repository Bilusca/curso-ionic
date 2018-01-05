import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

const ExtractError = (error: Response | any): string => {
  let errMsg: string;

  if(error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.status || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }

  console.error(errMsg);

  return errMsg;
}

export abstract class BaseService {
  protected handlePromiseError(error: Response | any): Promise<any> {
    return Promise.reject(ExtractError(error));
  }

  protected handleObservableError(error: Response | any): Observable<any> {
    return Observable.throw(ExtractError(error));
  }
}
