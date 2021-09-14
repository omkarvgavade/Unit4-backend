const get = (model) => async (req, res) => {
    const items = await model.find().lean().exec()
    res.status(200).json({ items })
}
const post = (model) => async (req, res) => {
    const item = await model.create(req.body);
    res.status(201).json({ item })
}


const getOne = (model) => async (req, res) => {
    const item = await model.find(req.params.id).lean().exec()
    res.status(200).json({ item })
}

const updateOne = (model) => async (req, res) => {
    const item = await model.fintByIdandUpdate(req.params.id, req.body, { new: true }).lean().exec()
    res.status(201).json({ item })
}
const deleteOne = (model) => async (req, res) => {
    const item = await model.findByIdAndDelete(req.params.id)
    res.status(200).json({ item })
}

module.exports = {
    get,
    post,
    getOne,
    updateOne,
    deleteOne
}