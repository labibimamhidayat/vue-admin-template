import sanitizeHtml from 'sanitize-html';

const filterHTML = html => sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
});

export default filterHTML;
