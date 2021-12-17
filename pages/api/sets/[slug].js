const { sets } = require('./data.json');

export default function handler(req, res) {
    const set = sets.filter(st => st.slug === req.query.slug)
    res.status(200).json(set)
}
