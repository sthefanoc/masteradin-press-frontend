import Router from "next/router";
import React from "react";
import useSWR from "swr";

import ListErrors from "../../components/common/ListErrors";
import TagInput from "../../components/editor/TagInput";
import ArticleAPI from "../../lib/api/article";
import storage from "../../lib/utils/storage";
import editorReducer from "../../lib/utils/editorReducer";


import FileReader from '../../components/article/ArticleNewImportOLD'

const PublishArticleEditor = () => {
  const initialState = {
    title: "",
    description: "",
    body: "",
    tagList: [],
    fileUpload: "",
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('posting',posting)

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
    const csvContent = JSON.parse(localStorage.getItem('press.masteradin.com/csvimport')) || "";
    console.log('now it\'s nice',csvContent);
    setTimeout(() => {
      const confirmButton = document.querySelector('#confirmCSVUpload');
      confirmButton.addEventListener('click',() => { 
        console.log('bbbb');
  
        const handleReplaceText = (newPost) => {
          let finalText = newPost.template
          Object.keys(newPost).forEach((item) =>{
            finalText = finalText.replace(`{${item}}`,newPost[item])
          })
  
          return finalText
        }
  
        for(let j =0;j<csvContent.length;j++){
          let newPost = csvContent[j];
          let postingImport = initialState;
  
          if (newPost.title){ 
  
            const handleTitleImport = (newPost) =>{
              postingImport.title = newPost.title;
              dispatch({ type: "SET_TITLE", text: newPost.title });
            }
            const handleDescriptionImport = (newPost) =>{
              postingImport.description = newPost.description;
              dispatch({ type: "SET_DESCRIPTION", text: newPost.description });
            }
            const handleBodyImport = (newPost) =>{
              postingImport.body = handleReplaceText(newPost)
              dispatch({ type: "SET_BODY", text: postingImport.body });
            }
            const addTagImport = (newPost) => {
              postingImport.tagList = newPost.tagList.split(",").map(item=>{return item.trim()})
              dispatch({ type: "ADD_TAG", tag: postingImport.tagList });
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
    },2000)
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
            <FileReader />

            </div>
        </div>
      </div>
    </div>
  );
};

export default PublishArticleEditor;
