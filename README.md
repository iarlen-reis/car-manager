# Car Manager

<img src="/public/github.png" alt="image template">


## O que é CarManager?

<p>
  Car manager é uma aplicação front-end, construida com NextJs, Material UI e tailwindCSS que consome a API <a href="https://api-deslocamento.herokuapp.com/swagger/index.html" target="_blank">Deslocamento</a>, para listar, criar, atualizar e deletar (CRUD) em entidades, como Clientes, Condutores e Veículos. Ela simula uma aplicação de gerenciamento de serviços, onde o operador pode realizar diversas operações, como as citadas anteriomente.
</p>

<p>
  A aplicação também tem a funcionalidade de deslocamento, onde consome endpoint /deslocamento, onde é possivel Iniciar um deslocamento utilizando as entidades citadas no paragrafo anterior. No endpoint de deslocamento, além de iniciar um novo deslocamento, é possivel encerrar um deslocamento ou deleta-lo.
</p>

## Funcionalidades 🛠️

- [x] Exibir, criar, atualizar e deletar cliente.
- [x] Exibir, criar, atualizar e deletar condutor.
- [x] Exibir, criar, atualizar e deletar veículo.
- [x] Exibir, iniciar, encerrar e deletar deslocamento.

## O que foi utilizado?

<ul>
  <li>
    <b>Material UI:</b> Além de utilizar Material UI nas criações de componentes costumizados, como inputs, os componentes de modal, Drawer e Skeleton foram providos por ele.
  </li>
  <li>
    <b>React Hook Form:</b> Foi utilizado React-Hook-Form para criar inputs costumizados de alta performace, junto aos componentes de inputs do material ui.
  </li>
  <li>
    <b>React Query e Axios:</b> Foi utilizado React Query + Axios para fazer as requisições nas API e gerar um cachê dos resultados.
  </li>
    <li>
    <b>React toastify:</b> Foi utilizado React toastify para exibir mensagem nas ações do usuário.
  </li>
      <li>
    <b>Regex:</b> Foi utilizado Regex para criar formatação em tempo real em alguns inputs, como, por exemplo, CPF, CNH e RG.
  </li>
</ul>
