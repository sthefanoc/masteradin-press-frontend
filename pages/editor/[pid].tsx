import axios from "axios";
import Router, { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ListErrors from "../../components/common/ListErrors";
import TagInput from "../../components/editor/TagInput";
import ArticleAPI from "../../lib/api/article";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import editorReducer from "../../lib/utils/editorReducer";
import storage from "../../lib/utils/storage";

const UpdateArticleEditor = ({ article: initialArticle }) => {
  const initialState = {
    title: initialArticle.title,
    description: initialArticle.description,
    body: initialArticle.body,
    tagList: initialArticle.tagList,
    link: initialArticle.link,
    infographicCode: initialArticle.infographicCode,
    fileUpload: initialArticle.fileUpload,
  };


  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [posting, dispatch] = React.useReducer(editorReducer, initialState);
  const { data: currentUser } = useSWR("user", storage);
  const router = useRouter();
  const {
    query: { pid },
  } = router;

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

    const { data, status } = await axios.put(
      `${SERVER_BASE_URL}/articles/${pid}`,
      JSON.stringify({ article: posting }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(currentUser?.token)}`,
        },
      }
    );
    console.log('lalalala',(posting ))
    setLoading(false);

    if (status !== 200) {
      setErrors(data.errors);
    }

    Router.push(`/`);
  };

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
                    placeholder="Título do Artigo"
                    value={posting.title}
                    onChange={handleTitle}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Sobre o que é este artigo?"
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
                  Atualizar artigo
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateArticleEditor.getInitialProps = async ({ query: { pid } }) => {
  const {
    data: { article },
  } = await ArticleAPI.get(pid);
  return { article };
};

export default UpdateArticleEditor;
