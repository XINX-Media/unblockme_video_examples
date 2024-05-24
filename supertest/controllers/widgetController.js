const widgets = require('../db/widgets');

function getWidgets() {
    return widgets;
}

function addWidget(widget) {
    widgets.push(widget);
}

module.exports = {
    getWidgets,
    addWidget,
};