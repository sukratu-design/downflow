async function getFile(req, res) {
  console.log('getFile');
 res.status(200).send({
  message: 'hello worlds',
 });
}

export { getFile };
