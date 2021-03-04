import Router from 'next/router';
import React, { useReducer } from 'react';
import useSWR from 'swr';

import ArticleAPI from '../../lib/api/article';
import storage from '../../lib/utils/storage';
import editorReducer from '../../lib/utils/editorReducer';
import { CSVReader } from 'react-papaparse';
import styled from '@emotion/styled';

const FileReader = ({ csvImport }) => {
  const initialState = {
    title: '',
    description: '',
    body: '',
    tagList: [],
    link: '',
    infographicCode: '',
    fileUpload: '',
  };

  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const { data: currentUser } = useSWR('user', storage);
  const [posting, dispatch] = useReducer(editorReducer, initialState);

  const UploadArea = styled('div')`
    box-sizing: content-box;
    height: 20vh;
    margin-top: 2rem;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    line-height: 1rem;
    border: 0;
    max-height: 30vh;
    display: flex;
    flex-direction: column;
  `;

  const handleOnDrop = (data) => {
    console.log('---------------------------');
    // console.log(data);
    const keys = data[0].data;
    const finalObject = data.map(function (values) {
      return keys.reduce(function (o, k, i) {
        o[k] = values.data[i];
        return o;
      }, {});
    });
    console.log('this is', finalObject);
    initialState.fileUpload = finalObject.filter((post) => {
      return post.title && post.title != 'title';
    });
    console.log('the state file is', initialState.fileUpload);
    console.log('---------------------------');
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  const handleUploadPosts = () => {
    console.log('there are posts?', Boolean(initialState.fileUpload));
    if (!initialState.fileUpload) {
      alert(
        'Ops! Arquivo CSV não encontrado. Verifique o upload e tente novamente.'
      );
    } else {
      const uploadCsvBtn = document.querySelector('#uploadCsv');
      const confirmUploadBtn = document.querySelector('#confirmCSVUpload');
      uploadCsvBtn.remove();
      confirmUploadBtn.style.visibility = 'visible';
      confirmUploadBtn.innerHTML = `Confirmar o upload de ${initialState.fileUpload.length} novos posts`;
    }
  };

  const handleReplaceText = (newPost) => {
    let finalText = newPost.template;
    console.log('REPLACING THIS', finalText);
    Object.keys(newPost).forEach((item) => {
      finalText = finalText.replaceAll(`{${item}}`, newPost[item]);
    });
    console.log('FOR THIS', finalText);
    return finalText;
  };

  const handleSubmitImport = async () => {
    setLoading(true);

    console.log('postingImport import', posting);

    const { data, status } = await ArticleAPI.create(
      posting,
      currentUser?.token
    );

    setLoading(false);

    if (status !== 200) {
      setErrors(data.errors);
    }

    // Router.push("/");
    console.log('this is postingImport', posting);
  };

  const handleConfirmUpload = () => {
    const posts = initialState.fileUpload;
    console.log('CONFIRMANDO POSTS!');

    const handleTitleImport = (newPost) => {
      posting.title = newPost.title;
    };
    const handleDescriptionImport = (newPost) => {
      posting.description = newPost.description;
    };
    const handleBodyImport = (newPost) => {
      posting.body = handleReplaceText(newPost);
    };
    const addTagImport = (newPost) => {
      posting.tagList = newPost.tagList.split(',').map((item) => {
        return item.trim();
      });
    };
    const handleLinkImport = (newPost) => {
      posting.link = newPost.link;
    };
    const handleInfographicCodeImport = (newPost) => {
      posting.infographicCode = newPost.infographicCode;
    };

    for (let j = 0; j < posts.length; j++) {
      let newPost = posts[j];
      handleTitleImport(newPost);
      handleDescriptionImport(newPost);
      handleBodyImport(newPost);
      addTagImport(newPost);
      handleLinkImport(newPost);
      handleInfographicCodeImport(newPost);
      handleSubmitImport();
      console.log('NOVO POST CRIADO:', newPost.title);
    }
    alert('Posts criados com sucesso!');
    Router.push('/');
  };

  return (
    <>
      <h5>Múltiplos posts</h5>
      <UploadArea>
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
        >
          <span>Arraste o arquivo ou clique para selecionar.</span>
        </CSVReader>
        <button
          style={{
            marginTop: '10px',
            alignSelf: 'center',
            width: '20%',
            visibility: '',
          }}
          className='btn btn-lg pull-xs-right btn-secondary'
          id='uploadCsv'
          onClick={handleUploadPosts}
        >
          {' '}
          Upload
        </button>
        <button
          className='btn btn-lg pull-xs-right btn-danger'
          style={{
            visibility: 'hidden',
            marginTop: '10px',
            marginBottom: '2rem',
          }}
          id='confirmCSVUpload'
          onClick={handleConfirmUpload}
        >
          {' '}
          Confirmar posts
        </button>
      </UploadArea>
    </>
  );
};

export default FileReader;
