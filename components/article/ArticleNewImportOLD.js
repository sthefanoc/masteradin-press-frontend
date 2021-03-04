import * as Papa from 'papaparse';

class FileReader extends React.Component {
    constructor() {
      super();
      this.state = {
        csvfile: undefined
      };
      this.updateData = this.updateData.bind(this);
    }
    
    handleChange = event => {
      this.setState({
        csvfile: event.target.files[0]
      });
    };
  
    importCSV = () => {
      const { csvfile } = this.state;
      Papa.parse(csvfile, {
        complete: this.updateData,
        header: true
      });
    };
  
    updateData(result) {
      var data = result.data;
      console.log('data',data);
      localStorage.setItem('press.masteradin.com/csvimport',JSON.stringify(data));

      // Counter
      let counter = 0;
      data.forEach(element => {
        if(element.title){
          counter +=1
        }
      });


      const newButton = document.querySelector('#confirmCSVUpload');
      const uploadButton = document.querySelector('#uploadCsv');
      newButton.innerHTML = `Confirmar ${counter} novos posts?`
      uploadButton.style.visibility = 'hidden'
      newButton.style.visibility = 'visible'
    }
  
    render() {
      // console.log(this.state.csvfile);
      return (
        <div className="import-csv">
          <h4>Importar múltiplas matérias</h4>
          {/* <label for="file">Choose File</label> */}
          <input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            title="Nenhum arquivo selecionado"
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <p />
          {/* <button 
            className="btn btn-lg pull-xs-right btn-secondary" 
            id="uploadCsv"
            onClick={this.importCSV}> Upload
          </button>
          <button 
            className="btn btn-lg pull-xs-right btn-danger"
            style={{visibility:"hidden"}} 
            id="confirmCSVUpload"
            > Confirmar posts
          </button> */}
        </div>
      );
    }
  }
  
  export default FileReader;