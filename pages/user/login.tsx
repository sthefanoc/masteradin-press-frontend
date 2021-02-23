import Head from "next/head";
import React from "react";

import CustomLink from "../../components/common/CustomLink";
import LoginForm from "../../components/profile/LoginForm";

const Login = () => (
  <>
    <Head>
      <title>masteradin press</title>
      <meta name="description" content="Releases de imprensa com dados regionais e infográficos interativos" />
    </Head>
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <p className="text-xs-center">
              <CustomLink href="/user/register" as="/user/register">
                Precisa de uma conta?
              </CustomLink>
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Login;
