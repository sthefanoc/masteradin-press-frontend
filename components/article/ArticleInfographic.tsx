import React from "react";

import Link from "next/link";

const ArticleInfographic = ({ code }) => {

    const copyText = () => {
        /* Get the text field */
        const copyText = document.getElementById("infographicCode");
      
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
      
        /* Copy the text inside the text field */
        document.execCommand("copy");
      
        /* Alert the copied text */
        alert("Texto Copiado: " + copyText.value);
      }
  
  return (
    <form className="card infographic-form">
      <div className="card-block">
        <textarea
          rows={3}
          readOnly
          className="form-control"
          id="infographicCode"
          placeholder="Código para Infográfico interativo"
          value={code}
        />
      </div>
      <div className="card-footer">
        <button className="btn btn-sm btn-secondary" type="button" onClick={copyText}>
            <i className="ion-ios-copy" /> Copiar Código
        </button>
        <Link href="como-inserir-infografico" className="helper-text" >
          Como inserir infográfico em seu site
        </Link>
      </div>
    </form>
  );
};

export default ArticleInfographic;
