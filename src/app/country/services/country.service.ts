import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
  http = inject(HttpClient);
  private baseUrl = 'https://restcountries.com/v3.1';

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    console.log({ region });

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    console.log({ alphaCode });

    const url = `${this.baseUrl}/region/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryByCodes(borders: string[]) {
    // TODO
  }
}
