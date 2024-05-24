const { Router } = require('express');

const { getWidgets, addWidget } = require('../../controllers/widgetController');
const auth = require('../../utils/auth');

const widgetRouter = Router();

widgetRouter.get('/', async (req, res) => {
    try {
        const widgets = await getWidgets();

        res.status(200).json(widgets);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

widgetRouter.post('/', auth, async (req, res) => {
    const widget = req.body;

    if (!widget.name) {
        return res.status(400).json({ message: 'Widget name is required' });
    }

    try {
        await addWidget(widget);

        res.status(200).end();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = widgetRouter;