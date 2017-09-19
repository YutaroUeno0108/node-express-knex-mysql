

function sample (req, res) {
  const data = {
    title: 'sample'
  }
  res.render('sample', data)
}

module.exports = {
  sample
}
