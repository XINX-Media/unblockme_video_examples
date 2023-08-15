const { Router } = require("express");

const { Widget } = require("../../models");

const router = Router();

// create - POST
// POST /api/widget
router.post("/", async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const newObject = await Widget.create({
            name,
            quantity,
        });

        res.status(200).json(newObject);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// read - GET
// GET /api/widget
router.get("/", async (req, res) => {
    try {
        const widgets = await Widget.findAll({});

        res.status(200).json(widgets);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// GET /api/widget/:id
router.get("/:widget_id", async (req, res) => {
    try {
        const widget = await Widget.findByPk(req.params.widget_id);

        if (!widget) {
            res.status(404).end();
        } else {
            res.status(200).json(widget);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// update - PUT/PATCH
// PUT /api/widget/10
router.put("/:widget_id", async (req, res) => {
    try {
        const widget = await Widget.findByPk(req.params.widget_id);

        if (!widget) {
            res.status(404).end();
        } else {
            const { name, quantity } = req.body;
            await widget.update({ name, quantity });
            res.status(200).json(widget);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// delete - DELETE
// DELETE /api/widget/10
router.delete("/:id", async (req, res) => {
    try {
        const widget = await Widget.findByPk(req.params.id);

        if (!widget) {
            res.status(404).end();
        } else {
            await widget.destroy();
            res.status(200).json(widget);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;