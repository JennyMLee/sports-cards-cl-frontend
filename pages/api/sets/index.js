const {sets} = require('./data.json');

export default function handler(req, res) {
  res.status(200).json(sets)
}
