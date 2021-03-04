import Router from "next/router";
import React from "react";
import useSWR from "swr";

import ListErrors from "../../components/common/ListErrors";
import TagInput from "../../components/editor/TagInput";
import ArticleAPI from "../../lib/api/article";
import storage from "../../lib/utils/storage";
import editorReducer from "../../lib/utils/editorReducer";

import styled from "@emotion/styled";

import FileReader from '../../components/article/ArticleNewImport'

const PublishArticleEditor = () => {
  const initialState = {
    title: "",
    description: "",
    body: "",
    tagList: [],
    link: "",
    infographicCode: "",
    fileUpload: "",
  };

  const Divider = styled("hr")`
    box-sizing: content-box;
    height: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  `;

  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [posting, dispatch] = React.useReducer(editorReducer, initialState);
  const { data: currentUser } = useSWR("user", storage);

  const handleTitle = (e) =>
    dispatch({ type: "SET_TITLE", text: e.target.value });
  const handleDescription = (e) =>
    dispatch({ type: "SET_DESCRIPTION", text: e.target.value });
  const handleBody = (e) =>
    dispatch({ type: "SET_BODY", text: e.target.value });
  const addTag = (tag) => dispatch({ type: "ADD_TAG", tag: tag });
  const removeTag = (tag) => dispatch({ type: "REMOVE_TAG", tag: tag });
  const handleLink = (e) =>
    dispatch({ type: "SET_LINK", text: e.target.value });
  const handleInfographicCode = (e) =>
  dispatch({ type: "SET_INFOGRAPHIC", text: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, status } = await ArticleAPI.create(
      posting,
      currentUser?.token
    );

    setLoading(false);

    if (status !== 200) {
      setErrors(data.errors);
    }

    Router.push("/");
  };

  // Handle CSV


  if (process.browser){
    console.log('process browser is true');
    
    
    const csvContent = localStorage.getItem('press.masteradin.com/csvimport') ? JSON.parse(localStorage.getItem('press.masteradin.com/csvimport')) : "";
    console.log('now it\'s nice',csvContent);
  
    const confirmButton = document.querySelector('#confirmCSVUpload');
    console.log('confirmation is here?', confirmButton)
    if(confirmButton){
      confirmButton.addEventListener('click',() => { 
        console.log('bbbb');

        const handleReplaceText = (newPost) => {
          let finalText = newPost.template
          Object.keys(newPost).forEach((item) =>{
            finalText = finalText.replaceAll(`{${item}}`,newPost[item])
          })

          return finalText
        }

        for(let j =0;j<csvContent.length;j++){
          let newPost = csvContent[j];
          let postingImport = initialState;

          if (newPost.title){ 

            const handleTitleImport = (newPost) =>{
              postingImport.title = newPost.title;
            }
            const handleDescriptionImport = (newPost) =>{
              postingImport.description = newPost.description;
            }
            const handleBodyImport = (newPost) =>{
              postingImport.body = handleReplaceText(newPost)
            }
            const addTagImport = (newPost) => {
              postingImport.tagList = newPost.tagList.split(",").map(item=>{return item.trim()})
            }
            
            handleTitleImport(newPost);
            handleDescriptionImport(newPost);
            handleBodyImport(newPost);
            addTagImport(newPost);

            const handleSubmitImport = async (newPost) => {
              // newPost.preventDefault();
              setLoading(true);

              console.log('postingImport import',postingImport)

              const { data, status } = await ArticleAPI.create(
                postingImport,
                currentUser?.token
              );

              setLoading(false);

              if (status !== 200) {
                setErrors(data.errors);
              }

              // Router.push("/");
              console.log('this is postingImport',postingImport)
            };
            handleSubmitImport(newPost);
          }
        }
        localStorage.setItem('press.masteradin.com/csvimport','')
      })
    }
  }
  
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={errors} />
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Titulo do Artigo"
                    value={posting.title}
                    onChange={handleTitle}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Sobre o que é o artigo?"
                    value={posting.description}
                    onChange={handleDescription}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Escreva o artigo (em markdown)"
                    value={posting.body}
                    onChange={handleBody}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Link da matéria original"
                    value={posting.link}
                    onChange={handleLink}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Código do infográfico"
                    value={posting.infographicCode}
                    onChange={handleInfographicCode}
                  />
                </fieldset>

                <TagInput
                  tagList={posting.tagList}
                  addTag={addTag}
                  removeTag={removeTag}
                />

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  Publicar artigo
                </button>
              </fieldset>
            </form>
            <Divider />
            <FileReader csvImport={posting.fileUpload} />

            </div>
        </div>
      </div>
    </div>
  );
};

export default PublishArticleEditor;
