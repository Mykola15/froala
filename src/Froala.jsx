import React, {useEffect, useRef, useState} from 'react';
import Editor from 'react-froala-wysiwyg';
import Froalaeditor from 'froala-editor';
import FroalaEditor from 'froala-editor';

// Necessary import from Froala
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import 'froala-editor/js/plugins.pkgd.min';
import 'froala-editor/js/plugins/font_family.min';


const editorConfiguration = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    enter: Froalaeditor.ENTER_DIV,
    attribution: false,
    wordPasteModal: false,
    wordPasteKeepFormatting: true,
    toolbarButtons: [['insertLink', 'insertImage', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters',
        'embedly', 'insertFile', 'insertHR'], ['test','insert'], ['bold', 'italic', '|', 'myButton']],
    width: '100%',
    height: '100%',
    fontFamilySelection: true,
    fontSizeSelection: true,
    paragraphFormatSelection: true,
    editorClass: 'custom-froala-editor',
};

const Froala = (props) => {
    const {value} = props;
    const [editorModel, setEditorModel] = useState();
    const [elem, setElem] = useState();
    const inputEl = useRef();


    Froalaeditor.DefineIcon('test', {NAME: 'minus', SVG_KEY: 'add'});
    Froalaeditor.RegisterCommand('test', {
        title: 'changeState',
        focus: false,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
            if (this.selection.inEditor() && document.getSelection().toString().length) {
                setElem(getHTMLOfSelection().toString());
            }
        }
    });

    FroalaEditor.DefineIcon('insert', {NAME: 'plus', SVG_KEY: 'star'});
    FroalaEditor.RegisterCommand('insert', {
        title: 'Insert HTML',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
            this.html.insert(elem);

        }
    });


    const getHTMLOfSelection = () =>{
        let range;
        if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            return range.htmlText;
        }
        else if (window.getSelection) {
            let selection = window.getSelection();
            if (selection.rangeCount > 0) {
                range = selection.getRangeAt(0);
                let clonedSelection = range.cloneContents();
                let div = document.createElement('div');
                div.appendChild(clonedSelection);
                return div.innerHTML;
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    };


    const onModelChange = (model) => {
        setEditorModel(model);
    };

    useEffect(() => {
        setEditorModel(value);
    }, [value]);

    useEffect(() => {
        setElem('');
    }, []);

    return (
        <div>
            <div>
                <Editor id="froala-editor"
                        tag="textarea"
                        config={editorConfiguration}
                        model={editorModel}
                        onModelChange={onModelChange}
                        ref={inputEl}
                />
            </div>
        </div>
    );

};

export default Froala;