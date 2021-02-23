import Head from "next/head";
import React from "react";

import CustomLink from "../../components/common/CustomLink";
import RegisterForm from "../../components/profile/RegisterForm";

const Register = () => (
  <>
  <Head>
    <title>Registrar | masteradin press</title>
    <meta name="description" content="Please register before login" />
  </Head>
  <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Registrar</h1>
          <p className="text-xs-center">
            <CustomLink href="/user/login" as="/user/login">
              Já tem uma conta?
            </CustomLink>
          </p>

          <RegisterForm />
        </div>
      </div>
    </div>
  </div>
  </>
);

export default Register;
