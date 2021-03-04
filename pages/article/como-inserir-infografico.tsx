import Head from "next/head";
import React from "react";

import CustomLink from "../../components/common/CustomLink";
import LoginForm from "../../components/profile/LoginForm";

const InsertInfographic = () => (
  <>
    <Head>
      <title>masteradin press</title>
      <meta name="description" content="Releases de imprensa com dados regionais e infográficos interativos" />
    </Head>
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Como inserir o infográfico em seu site</h1>
            <p className="text-xs-center">
              O vídeo mostrando o passo-a-passo de como inserir o infográfico interativo em seu site será lançado em breve.
              As instruções básicas são:
              <br/>
              <ol>
                <li>Copiar o código para o infográfico, conforme disponibilizado na página do release.</li>
                <li>Abrir seu editor de texto online</li>
                <li>Buscar a opção de editar código da matéria a ser postada. Normalmente descrito como "editor de código" (Wordpress).</li>
                <li>Colar o trecho de código do infográfico no código de sua página web</li>
              </ol>
              <br/>
              Com esses passos simples o infográfico deve ser automaticamnente carregado na página de seu site, com a interatividade habilitada e responsividade para dispositivos móveis.

           </p>
           
          </div>
        </div>
      </div>
    </div>
  </>
);

export default InsertInfographic;
