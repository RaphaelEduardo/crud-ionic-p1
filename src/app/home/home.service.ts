import { Produtos } from './../model/produtos';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  endpoint = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  getProdutos() {
    return this.http.get<Produtos[]>(this.endpoint);
  }

  adicionarProduto(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(this.endpoint, produto);
  }

  editarProduto(id: number, produto: Produtos): Observable<Produtos> {
    const url = `${this.endpoint}/${id}`;
    return this.http.put<Produtos>(url, produto);
  }

  excluirProduto(id: number): Observable<void> {
    const url = `${this.endpoint}/${id}`;
    return this.http.delete<void>(url);
  }

}
