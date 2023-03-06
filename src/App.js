import React, { Component } from 'react';
import { marked } from 'marked';
import { FaExpandArrowsAlt, FaCompressAlt } from "react-icons/fa";
import DOMPurify from "dompurify";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.resizeEditor = this.resizeEditor.bind(this);
    this.resizePreview = this.resizePreview.bind(this);
    
  }

  handleChange(event) {
    this.setState({
      markdown: event.target.value
    });
  }

  resizeEditor(event) {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    })
  }

  resizePreview(event) {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    })
  }

  render() {

    const Preview = (props) => {
      return (
        <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(props.input, {renderer: renderer, breaks: true, highlight: function(e) {
            return Prism.highlight(e, Prism.languages.javascript, "javascript")
        }}))
        }}
        />
      );
    }

    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
      return `<a target="_blank" href="${href}">${text}</a>`;
      }

    return (
      <div className="app">
        <div id="editor-container" className={`${this.state.editorMaximized ? "maximized" : ""} ${this.state.previewMaximized ? "hidden" : ""}`}>
          <div className="header">
            <h2>Editor</h2>
            {this.state.editorMaximized 
            ? <FaCompressAlt className="fa-maximize" onClick={this.resizeEditor}/>
            : <FaExpandArrowsAlt className="fa-maximize" onClick={this.resizeEditor}/>}
          </div>
          <textarea
          name="editor"
          id="editor"
          value={this.state.markdown}
          onChange={this.handleChange}
          ></textarea>
        </div>
        <div id="preview-container" className={`${this.state.previewMaximized ? "maximized" : ""} ${this.state.editorMaximized ? "hidden" : ""}`}>
        <div className="header">
            <h2>Previewer</h2>
            {this.state.previewMaximized 
            ? <FaCompressAlt className="fa-maximize" onClick={this.resizePreview}/>
            : <FaExpandArrowsAlt className="fa-maximize" onClick={this.resizePreview}/>}
          </div>
          <div id="preview" className="preview-text">
            <Preview input={this.state.markdown} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![Peace sign](https://www.svgrepo.com/show/313210/pink-peace.svg)
`;