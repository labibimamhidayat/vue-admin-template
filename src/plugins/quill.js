import Quill from 'quill';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['link'],
];

const options = {
    modules: {
        toolbar: {
            container: toolbarOptions,
        },
    },
    placeholder: 'Compose an epic...',
    readOnly: false,
    theme: 'snow',
};

const initQuil = (el, customOption = {}) => new Quill(el, { ...options, ...customOption });

export default initQuil;
