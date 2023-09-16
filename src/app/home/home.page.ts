import { Produtos } from './../model/produtos';
import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  produtos: Produtos[] = [];
  novoProduto: Produtos = { id: 0, nome: '', categoria: '', descricao: '', preco: 0, quantidade: 0 };
  produtoEditando: Produtos | null = null;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.homeService.getProdutos().subscribe((data) => {
      this.produtos = data;
    });
  }

  adicionarProduto() {

    this.homeService.adicionarProduto(this.novoProduto).subscribe(() => {
      this.carregarProdutos();
      this.novoProduto = { id: 0, nome: '', categoria: '', descricao: '', preco: 0, quantidade: 0 };
    });
  }

  editarProduto(produto: Produtos) {
    if (produto.id) {
      this.homeService.editarProduto(produto.id, produto).subscribe(() => {
        this.carregarProdutos();
        this.produtoEditando = null;
      });
    }
  }

  excluirProduto(id: number) {
    this.homeService.excluirProduto(id).subscribe(() => {
      this.carregarProdutos();
    });
  }

  iniciarEdicao(produto: Produtos) {
    this.produtoEditando = { ...produto };
  }

  cancelarEdicao() {
    this.produtoEditando = null;
  }
}
